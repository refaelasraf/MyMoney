import {ITransaction} from "../models/transaction";
import {TransactionDAL} from "../DAL/ElasticSearchDAL/transactionDAL";

export class TransactionBL {
    constructor(private dal: TransactionDAL) {
    }

    public async upsert(document: ITransaction) {
        return await this.dal.upsert(document, document.docID);
    }

    public async delete(doc: ITransaction) {
        return await this.dal.delete(doc.docID);
    }

    public async getByDate(start: Date, end: Date) {
        return await this.dal.getByDate(start, end);
    }
}