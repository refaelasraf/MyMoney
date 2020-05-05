import {bankAccount} from '../models/bankAccout'
import { user } from '../models/user';
import { userDAL } from '../DAL/userDAL'
import { InsertOneWriteOpResult } from 'mongodb';
export  class userBL {
    
    private userDAL : userDAL;
    constructor() {
        this.userDAL = new userDAL()
    }
    
    
    public registerUser = async (name: string,
        email:string,
        password: string,
        dateOfBirth: Date, 
        bankAccount : bankAccount,
        creditCard : Array<number>) : Promise<boolean> => {
            const user : user  = {
                userName : name,
                email : email,
                pasword : password,
                creditCard : creditCard,
                bankAccoutn : bankAccount,
                dateOfBirth:  dateOfBirth
            }
            
            const registerResult = await this.userDAL.registerUser(user);
            if (registerResult.insertedCount == 1)
                return true
            else    
                return false
        }
        
    }