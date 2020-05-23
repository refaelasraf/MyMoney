import {ElasticHelper} from "../../dbHelpers/elasticHelper";
import {ESBaseDAL} from "./esBaseDAL";
import {ITransaction} from "../../models/transaction";
import {IESDALConfig} from "../../configuration/IConfig";

export class TransactionDAL extends ESBaseDAL<ITransaction> {
    public constructor(elasticHelper: ElasticHelper, transactionConfig: IESDALConfig) {
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

}