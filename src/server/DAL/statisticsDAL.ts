import { ElasticHelper } from "../dbHelpers/elasticHelper";
import { purchesRecord } from "../models/purchesRecord";
import { ESBaseDAL } from "./ElasticSearchDAL/esBaseDAL";
import { ITransaction } from "../models/transaction";
import { IESDALConfig } from "../configuration/IConfig";

export class statisticsDAL extends ESBaseDAL<ITransaction> {
    private readonly esConfig : IESDALConfig = {
      index : "transaction",
      type : "_doc"      
    }
    private readonly indexName = "my_money";
    public constructor ( elasticHelper = new ElasticHelper({host:'localhost:9200'})){
        super(elasticHelper, {
          index : "transaction",
          type : "_doc"      
        });
    }
    
    public getUserStatistics = async (userId : string) : Promise<object> => {
        // const aggsResult = await elasticHelper.elasticClient.search<purchesRecord>({
        //     size:0,
        //     index : this.indexName,
        //     body : {
        //         "query" : {
        //             "match" :{
        //                 "userId" : userId
        //             }
        //         },
        //         "aggs": {
        //             "category" : {
        //               "terms": {
        //                 "field": "category"
        //               },
        //               "aggs": {
        //                 "sum_money": {
        //                   "sum": {
        //                     "field": "ammount"
        //                   }
        //                 }
        //               }
        //             }
        //           }  
        //         }
        //     });
        return null;
    }
}