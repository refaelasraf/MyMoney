import mongoose from 'mongoose';

export default class MongoHelper {
  public static async connect(url: string = "mongodb://localhost/test") {
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
  }
 
  public static async disconnect() {
    await mongoose.disconnect();
  }
}