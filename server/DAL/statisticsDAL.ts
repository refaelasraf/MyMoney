import {ElasticHelper} from "../dbHelpers/elasticHelper";
import {ESBaseDAL} from "./ElasticSearchDAL/esBaseDAL";
import {ITransaction} from "../models/transaction";
import {IESDALConfig} from "../configuration/IConfig";
import {IUserStatistic} from "../models/userStatistic";
import {config} from "../configuration/config";

export class statisticsDAL extends ESBaseDAL<ITransaction> {
    
    public constructor ( elasticHelper = new ElasticHelper(), private readonly transactionConfig: IESDALConfig = config.DAL.transactionDal){
        super(elasticHelper, transactionConfig);
    }
    
    public getUserStatistics = async (clientId : string) : Promise<Array<IUserStatistic>> => {
       const aggsResult = await this.elasticHelper.aggregate(this.transactionConfig.index, this.transactionConfig.type, {
          "query" : {
            "match" : {
              "client" : clientId
            }
          },
          "aggs": {
            "categoryId" : {
              "terms": {
                "field": "categoryId"
              },
              "aggs": {
                "sum_money": {
                  "sum": {
                    "field": "amount"
                  }
                }
              }
            }
          }
        })
        const ress = aggsResult.categoryId.buckets.map((bucket : any) => {
          return {
            categoryId :bucket.key,
            amount : bucket.sum_money.value
          }
        })
        return ress;
    }

    public getUserSimilarStatistics = async (userId:string, otherIds : string[], year: number, categories : string[]) 
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
            "categoryId" : {
              "terms": {
                "field": "categoryId"
              },
              "aggs": {
                "sum_money": {
                  "sum": {
                    "field": "amount"
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
              "client" : otherIds
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

      if (categories && categories.length > 0) {
        query.bool.must.push({"terms" : {
          "categoryId" : categories
        }});
      }

      const otherAggs = await this.elasticHelper.aggregate(this.transactionConfig.index, this.transactionConfig.type, {
        query,
        aggs
      });

      query.bool.must[0].terms = {"client" : [userId]};
      const userAggs = await this.elasticHelper.aggregate(this.transactionConfig.index, this.transactionConfig.type , {
        query,
        aggs
      })
      
      const userStats  = userAggs.date.buckets.map((bucket:any)=> {
        const date  = new Date(bucket.key_as_string).getMonth();
        const expense = bucket.categoryId.buckets.map((bucket : any) => {
          return {
            categoryId :bucket.key,
            amount : bucket.sum_money.value
          }
        });
        return {
          "month" : date,
          "expense" : expense

        }
      })
     
      const otherStats = otherAggs.date.buckets.map((bucket:any)=> {
        const date  = bucket.key_as_string;
        const expense = bucket.categoryId.buckets.map((bucket : any) => {
          return {
            categoryId :bucket.key,
            amount : bucket.sum_money.value
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