import { ElasticHelper } from "../dbHelpers/elasticHelper";
import { ESBaseDAL } from "./ElasticSearchDAL/esBaseDAL";
import { ITransaction } from "../models/transaction";
import { IESDALConfig } from "../configuration/IConfig";
import { IUserStatistic } from "../models/userStatistic";
import { IUser } from "../models/user";

export class statisticsDAL extends ESBaseDAL<ITransaction> {
    private readonly esConfig : IESDALConfig = {
      index : "my_money",
      type : "_doc"      
    }
    public constructor ( elasticHelper = new ElasticHelper({host:'http://localhost:9200'})){
        super(elasticHelper, {
          index : "my_money",
          type : "_doc"      
        });
    }
    
    public getUserStatistics = async (clientId : string) : Promise<Array<IUserStatistic>> => {
       const aggsResult = await this.elasticHelper.aggregate(this.esConfig.index, this.esConfig.type, {
          "query" : {
            "match" : {
              "clientId" : clientId
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
        })
        const ress = aggsResult.category.buckets.map((bucket : any) => {
          return {
            category :bucket.key,
            ammount : bucket.sum_money.value
          }
        })
        return ress;
    }

    public getUserSimilarStatistics = async (userId:string, otherIds : string[]) 
      : Promise<{'user' : IUserStatistic[], 'other' : IUserStatistic[]}> => {
      
      const aggs : any = { 
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
      const query : any = { 
      "query" : {
        "terms" : {
          "clientId" : otherIds
        }
      }
     }
      const otherAggs = await this.elasticHelper.aggregate(this.esConfig.index, this.esConfig.type, {
        query,
        aggs
      });

      query.terms = {"clientId" : userId};
      const userAggs = await this.elasticHelper.aggregate(this.esConfig.index, this.esConfig.type , {
        query,
        aggs
      })
      
      const userStats = userAggs.category.buckets.map((bucket : any) => {
        return {
          category :bucket.key,
          ammount : bucket.sum_money.value
        }
      });
      const otherStats = otherAggs.category.buckets.map((bucket : any) => {
        return {
          category :bucket.key,
          ammount : bucket.sum_money.value
        }
      })
      return {'user' : userStats, 'other' : otherStats};
    }

}