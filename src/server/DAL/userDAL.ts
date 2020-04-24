import { user } from "../models/user";
import {MongoHelper} from "../dbHelpers/mongoHelper"
export class userBL {
    
    public registerUser = async (user:user) => {
        await MongoHelper.client.db("myMoney").collection("user").insertOne(user);
    }
}

