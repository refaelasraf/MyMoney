import * as mongo from 'mongodb';
 
export class MongoHelper {
  public static client: mongo.MongoClient;
 
  constructor() {
    if (!MongoHelper.client) {
      MongoHelper.connect();
    }
  }
 
  public static connect(url: string = "mongodb://localhost:27017"): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if (this.client){
            resolve(this.client)
        }
      mongo.MongoClient.connect(url, {useNewUrlParser: true}, (err, client: mongo.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          MongoHelper.client = client;
          resolve(client);
        }
      });
    });
  }
 
  public disconnect(): void {
    MongoHelper.client.close();
  }
}