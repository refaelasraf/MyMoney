import {ElasticHelper} from "../../dbHelpers/elasticHelper";
import {IESDALConfig} from "../../configuration/IConfig";

export abstract class ESBaseDAL<T> {

    protected constructor(
        protected elasticHelper: ElasticHelper,
        protected DALConfig: IESDALConfig) {
    }

    public async upsert(document: T, documentId: string): Promise<boolean> {
        return this.elasticHelper.upsert(this.DALConfig.index, this.DALConfig.type, document, documentId);
    }

    public async delete(documentId: string): Promise<string> {
        return this.elasticHelper.delete(this.DALConfig.index, this.DALConfig.type, documentId);
    }
}