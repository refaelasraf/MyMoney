import { UserDal } from "../DAL/userDAL";
import { IUser } from "../models/user";
export class adminBL {
    /**
     * Admin BL
     */
    constructor(private readonly userDal: UserDal = new UserDal()) {
       
    }
}