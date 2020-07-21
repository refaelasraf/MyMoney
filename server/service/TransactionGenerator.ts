import { TransactionDAL } from "../DAL/ElasticSearchDAL/transactionDAL";
import {  ITransaction } from "../models/transaction";
var axios = require("axios");

export class TransactionGenerator {
    
    constructor(private readonly dal :TransactionDAL = new TransactionDAL()) {}

    public insertTransactions = async (userId : string) => {
        this.indexData(0,userId);
    }

    private indexData  = async (i : number, userId : string) =>  {
        const id = userId;
        if (i > 3000)
         return;
        const response = await axios.default.get("https://next.json-generator.com/api/json/get/E1GvqTK2O")
        const transactions : ITransaction[] = response.data
            
        for (let transaction in transactions)
        {
            transactions[transaction].docID = ((parseInt(transaction) + 1) + i * 30 + 5000).toString();
            transactions[transaction].clientId = userId;

            try 
            {
                this.dal.upsert(transactions[transaction], transactions[transaction].docID);
            }
            catch (ex)
            {
                console.log(ex)
            }
        }
        i++;
        await this.delay(1000);
        this.indexData(i,id);
    }

    private delay = async (ms: number) => {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}



    
