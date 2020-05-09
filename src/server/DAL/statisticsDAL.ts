import { elasticHelper } from "../dbHelpers/elasticHelper";
import { purchesRecord } from "../models/purchesRecord";
export class statisticsDAL {
    
    private readonly indexName = "my_money";
    public constructor(){
        
    }
    
    public getUserStatistics = async (userId : string) : Promise<object> => {
        const aggsResult = await elasticHelper.elasticClient.search<purchesRecord>({
            size:0,
            index : this.indexName,
            body : {
                "query" : {
                    "match" :{
                        "userId" : userId
                    }
                },
                "aggs": {
                    "category" : {
                      "terms": {
                        "field": "category"
                      },
                      "aggs": {
                        "sum_money": {
                          "sum": {
                            "field": "ammount"
                          }
                        }
                      }
                    }
                  }  
                }
            });
        return null;
    }
}