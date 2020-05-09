import {ITransaction} from "../models/transaction";
import {TransactionDAL} from "../DAL/ElasticSearchDAL/transactionDAL";

export class TransactionBL {
    constructor(private dal: TransactionDAL) {
    }

    public async upsert(document: ITransaction) {
        return this.dal.upsert(document, document.docID);
    }

    public async delete(docID: string) {
        return this.dal.delete(docID);
    }
}