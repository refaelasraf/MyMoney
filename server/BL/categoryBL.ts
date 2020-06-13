import { TransactionDAL } from "../DAL/ElasticSearchDAL/transactionDAL";

export class CategoryBL {
    /**
     *
     */
    constructor(private readonly transactionDAL = new TransactionDAL()) {

    }

    public async getCategoriesList() {
        const categoriesList = await this.transactionDAL.getCategoriesList();
        return categoriesList;
    }
}