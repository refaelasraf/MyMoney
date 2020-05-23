import {ITransaction} from "../models/transaction";
import {TransactionDAL} from "../DAL/ElasticSearchDAL/transactionDAL";
import * as _ from "lodash";

export class TransactionBL {
    constructor(private dal: TransactionDAL =  new TransactionDAL()) {
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

    public async getThisMonthTransactionSum(clientID: string){
        return await this.dal.getSumOfCurrentMonth(clientID);
    }

    public async getCurrentMonthStatsOfAllUsers(): Promise<_.Dictionary<number>>{
        return await this.dal.getCurrentMonthStatsOfAllUsers();
    }
}