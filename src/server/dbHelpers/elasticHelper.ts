import { Client, ConfigOptions } from "elasticsearch";
export class elasticHelper {
    public static elasticClient : Client;

    constructor() {
        if (!elasticHelper.elasticClient)
            elasticHelper.elasticClient = new Client({
                host : "localhost:9200"
            });
    }
}