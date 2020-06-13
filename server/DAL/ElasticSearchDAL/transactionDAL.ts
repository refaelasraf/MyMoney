import { ElasticHelper } from "../../dbHelpers/elasticHelper";
import { ESBaseDAL } from "./esBaseDAL";
import { ITransaction } from "../../models/transaction";
import { IESDALConfig } from "../../configuration/IConfig";
import { config } from "../../configuration/config";
import * as _ from "lodash";

export class TransactionDAL extends ESBaseDAL<ITransaction> {
    public constructor(elasticHelper: ElasticHelper = new ElasticHelper(), transactionConfig: IESDALConfig = config.DAL.transactionDal) {
        super(elasticHelper, transactionConfig);
    }

    public async getByDate(start: Date, end: Date): Promise<ITransaction[]> {
        const query = {
            query: {
                range: {
                    eventTime: {
                        gte: start,
                        lte: end
                    }
                }
            }
        };

        return await this.elasticHelper.search(this.DALConfig.index, this.DALConfig.type, query);
    }

    public async getSumOfCurrentMonth(clientID: string): Promise<_.Dictionary<number>> {
        const query = {
            size: 0,
            query: {
                bool: {
                    must: [{
                        range: {
                            eventTime: {
                                gte: "now/M",
                                lte: "now+M/M"
                            }
                        }
                    },
                        {
                            term: {
                                clientId: {
                                    value: clientID
                                }
                            }
                        }
                    }
                    ]
                }
            },
            aggs: {
                amountSum: {
                    sum: {
                        field: "amount"
                    }
                },
                categorySum: {
                    terms: {
                        field: "categoryId",
                        size: 100
                    },
                    aggs: {
                        sum: {
                            sum: {
                                field: "amount"
                            }
                        }
                    }
                }
            }
        };

        return this.mapToCategoryDicForUser(await this.elasticHelper.aggregate(this.DALConfig.index, this.DALConfig.type, query));
    }


    public async getCurrentMonthStatsOfAllUsers(): Promise<_.Dictionary<_.Dictionary<number>>> {
        const query = {
            size: 0,
            query: {
                range: {
                    eventTime: {
                        gte: "now/M",
                        lte: "now+M/M"
                    }
                }
            },
            aggs: {
                users: {
                    terms: {
                        field: "clientId",
                        size: 5000
                    },
                    aggs: {
                        sum: {
                            sum: {
                                field: "amount"
                            }
                        },
                        category: {
                            terms: {
                                field: "categoryId",
                                size: 50
                            },
                            aggs: {
                                sum: {
                                    sum: {
                                        field: "amount"
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }

        const aggregateResult = await this.elasticHelper.aggregate(this.DALConfig.index, this.DALConfig.type, query);
        const result = _.chain(aggregateResult.users.buckets).map(this.mapToUsersDic).fromPairs().value() as _.Dictionary<_.Dictionary<number>>;

        return result;
    }

    public async getCategoriesList(): Promise<string[]> {
        const query = {
            "aggs": {
                "categories": {
                    "terms": {
                        "field": "categoryId"
                    }
                }
            }
        }
        const aggsResult = await this.elasticHelper.aggregate(this.DALConfig.index, this.DALConfig.type, query);
        return aggsResult.categories.buckets.map((bucket : any) => bucket.key);
    }

    private mapToUsersDic(stat: any) {
        let userStatByCategory: _.Dictionary<number> = {
            all: stat.sum.value
        };

        _.forEach(stat.category.buckets, (category) => {
            userStatByCategory[category.key] = category.sum.value
        });

        return [stat.key, userStatByCategory]
    }

    private mapToCategoryDicForUser(stat: any): _.Dictionary<number> {
        const dic : _.Dictionary<number> = {
            all : stat.amountSum.value
        }

        _.forEach(stat.categorySum.buckets, (stat)=>{
            dic[stat.key] =  stat.sum.value;
        })

        return dic;
    }
}