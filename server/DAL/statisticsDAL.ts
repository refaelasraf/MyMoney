import {ElasticHelper} from "../dbHelpers/elasticHelper";
import {ESBaseDAL} from "./ElasticSearchDAL/esBaseDAL";
import {ITransaction} from "../models/transaction";
import {IESDALConfig} from "../configuration/IConfig";
import {IUserStatistic} from "../models/userStatistic";

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

    public getUserSimilarStatistics = async (userId:string, otherIds : string[], year: number) 
      : Promise<{'user' : IUserStatistic[], 'other' : IUserStatistic[]}> => {
      
      const fromYear = year + "-01-01"; 
      const toYear = (year + 1) + "-01-01";

      const aggs : any = { 
        "date" : {
          "date_histogram" :{
            "field" : "eventTime",
            "interval" : "month"
          },
          "aggs" : {
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
        },
      } 
      const query : any = { 
        "bool" : {
          "must" : [
            {
            "terms" : {
              "clientId" : otherIds
              }
            },
            {
            "range" : {
              "eventTime" : {
                "gte" : fromYear,
                "lte" : toYear
                }
              }
            }
          ]
        }
      }
      const otherAggs = await this.elasticHelper.aggregate(this.esConfig.index, this.esConfig.type, {
        query,
        aggs
      });

      query.bool.must[0].terms = {"clientId" : [userId]};
      const userAggs = await this.elasticHelper.aggregate(this.esConfig.index, this.esConfig.type , {
        query,
        aggs
      })
      
      const userStats  = userAggs.date.buckets.map((bucket:any)=> {
        const date  = bucket.key_as_string;
        const expense = bucket.category.buckets.map((bucket : any) => {
          return {
            category :bucket.key,
            ammount : bucket.sum_money.value
          }
        });
        return {
          "month" : date,
          "expense" : expense

        }
      })
     
      const otherStats = otherAggs.date.buckets.map((bucket:any)=> {
        const date  = bucket.key_as_string;
        const expense = bucket.category.buckets.map((bucket : any) => {
          return {
            category :bucket.key,
            ammount : bucket.sum_money.value
          }
        });
        return {
          "month" : date,
          "expense" : expense

        }
      });
      return {'user' : userStats, 'other' : otherStats};
    }

}