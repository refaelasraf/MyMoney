import {IConfig} from "./IConfig";

export var config: IConfig = {
    DAL: {
        elasticsearch: {
            host: "http://193.106.55.123:9200"
        },
        transactionDal:{
            index: "transactions",
            type:"_doc"
        }
    }
}