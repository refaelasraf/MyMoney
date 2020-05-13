import {IConfig} from "./IConfig";

export var config: IConfig = {
    DAL: {
        elasticsearch: {
            host: "http://localhost:9200"
        },
        transactionDal:{
            index: "transactions",
            type:"_doc"
        }
    }
}