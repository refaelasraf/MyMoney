import {ElasticHelper} from "../../dbHelpers/elasticHelper";
import {ESBaseDAL} from "./esBaseDAL";
import {ITransaction} from "../../models/transaction";
import {IESDALConfig} from "../../configuration/IConfig";
import {config} from "../../configuration/config";

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

    public async getSumOfCurrentMonth(clientID: string): Promise<ITransaction[]> {
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
                                clientID: {
                                    value: clientID
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
                }
            }
        };

        return await this.elasticHelper.aggregate(this.DALConfig.index, this.DALConfig.type, query);
    }


    public async getCurrentMonthStatsOfAllUsers() {
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
                    term: {
                        field: "owner.keyword",
                        size: 5000
                    }
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
        const aggregateResult = await this.elasticHelper.aggregate(this.DALConfig.index, this.DALConfig.type, query);

        return aggregateResult;
    }
}