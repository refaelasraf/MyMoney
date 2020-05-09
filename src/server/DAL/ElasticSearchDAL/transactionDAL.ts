import {ElasticHelper} from "../../dbHelpers/elasticHelper";
import {ESBaseDAL} from "./esBaseDAL";
import {ITransaction} from "../../models/transaction";
import {IESDALConfig} from "../../configuration/IConfig";

export class TransactionDAL extends ESBaseDAL<ITransaction>{
    public constructor(elasticHelper: ElasticHelper, transactionConfig: IESDALConfig) {
        super(elasticHelper, transactionConfig);
    }
}