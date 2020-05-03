import { user } from "../models/user";
import {MongoHelper} from "../dbHelpers/mongoHelper"
import { InsertOneWriteOpResult } from "mongodb";
export class userDAL {
    
    private mongoHelper : MongoHelper
    constructor() {
        this.mongoHelper = new MongoHelper()
        
    }
    public registerUser = async (user:user) : Promise<InsertOneWriteOpResult<any>> => {
        return await MongoHelper.client.db("myMoney").collection("user").insertOne(user);
    }
}

