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
}