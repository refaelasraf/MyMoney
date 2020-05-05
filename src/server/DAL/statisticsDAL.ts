import { elasticHelper } from "../dbHelpers/elasticHelper";
import { purchesRecord } from "../models/purchesRecord";
export class statisticsDAL {

    private readonly indexName = "myMoney";
    constructor(){

    }

    public getUserStatistics = async (userId : string) : Promise<object> => {
        var aggsResult = await elasticHelper.elasticClient.search<purchesRecord>({
            size:0,
            body : {
                "query" : {
                    "match" :{
                        "userId" : userId
                    }
                },
                "aggs" : {
                    "category":  {
                        "terms" : {
                            "field" : "category"
                        },
                        "aggs" : {
                            "sumEachCategory" : {"sum" : {"field" : "ammount"} }
                        }
                    }
                }
            }  
        })
        return aggsResult
    }
}