import {bankAccount} from '../models/bankAccout'
import { user } from '../models/user';
export class userBL {
    /**
     *
     */
    private userDAL : {
        insertUser : (user : object) => boolean
    };
    constructor() {
        
    }


    public registerUser = (name: string, password: string, dateOfBirth: Date, bankAccount : bankAccount) => {
        const user : user  = {
            name : name,
            creditCard : {},
            bankAccoutn : bankAccount,
            dateOfBirth:  dateOfBirth
        }

        this.userDAL.insertUser(user);
    }

}