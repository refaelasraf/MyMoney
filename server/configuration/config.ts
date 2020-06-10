import {IConfig} from "./IConfig";

export var config: IConfig = {
    DAL: {
        elasticsearch: {
            host: "http://193.106.55.123:9200"
        },
        transactionDal: {
            index: "transactions",
            type: "_doc"
        }
    },
    pushWeb: {
        publicKey: "BFxVLNQ0jH3Zm9tJjiREpWs344wKZ3SOesnKycXW5v6n0m88l7AxlAps2A05HmGVzI0QXrr6_BPObAPGH-6mNYA",
        privateKey: "k-a0F5dx6-IoQPiXZUUGxgsWLb7fdJqiQ86HP6fJ5r8"
    },
    mail: {
        service: "gmail",
        auth: {
            pass: "myMoney123",
            user: "mymoneycolman@gmail.com"
        }

    }
}