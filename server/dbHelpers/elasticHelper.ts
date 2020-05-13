import {IElasticSearchConfig} from "../configuration/IConfig";
import {Client as ESClient} from "@elastic/elasticsearch";

export class ElasticHelper {
    private esClient:ESClient;

    public constructor(private elasticSearchConfig:IElasticSearchConfig) {
        this.esClient = new ESClient({node : elasticSearchConfig.host});
    }

    public async search<T>(index: string|Array<string>, type:string|Array<string>, body: any):Promise<Array<T>>{
        const res = await this.esClient.search({
            index:index,
            type: type,
            body : body
        });

        return res.body.hits.hits.map((hit: any)=> hit._source as T);
    }

    public async aggregate(index: string|Array<string>, type:string|Array<string>, body: any):Promise<any>{
        const res = await this.esClient.search({
            index:index,
            type: type,
            body : body
        });

        return res.body.aggregations;
    }

    public async upsert<T>(index :string, type: string, document: T, documentId: string):Promise<boolean>
    {
        const res = await this.esClient.index({
            index:index,
            id:documentId,
            type: type,
            body:document
        });

        return res.body.acknowledged;
    }

    public async delete<T>(index:string, type:string, documentId:string):Promise<string> {
        const res = await this.esClient.delete({index: index, type: type, id: documentId});
        return res.body.result;
    }
}