import {IElasticSearchConfig} from "../configuration/IConfig";
import {Client as ESClient} from "@elastic/elasticsearch";
import {userController} from "../controllers/userController";

export class ElasticHelper {
    private esClient:ESClient;

    public constructor(private elasticSearchConfig:IElasticSearchConfig) {
        this.esClient = new ESClient({node : elasticSearchConfig.host});
    }

    public async search<T>(index: string|Array<string>, type:string|Array<string>, body: any):Promise<Array<T>>{
        return this.esClient.search({
            index:index,
            type: type,
            body : body
        }).then((a)=>{
            return a.body.hits.map((hit: any)=>{
                return hit._source as T;
            })
        });
    }

    public async aggregate(index: string|Array<string>, type:string|Array<string>, body: any):Promise<any>{
        return this.esClient.search({
            index:index,
            type: type,
            body : body
        }).then((a)=>{
            return a.body.aggregations;
        });
    }

    public async upsert<T>(index :string, type: string, document: T, documentId: string):Promise<boolean>
    {
        return this.esClient.index({
            index:index,
            id:documentId,
            type: type,
            body:document
        }).then((result)=> result.body.acknowledged)
    }

    public async delete<T>(index:string, type:string, documentId:string):Promise<string> {
        return this.esClient.delete({index: index, type: type, id: documentId}).then((result => result.body.result));
    }
}