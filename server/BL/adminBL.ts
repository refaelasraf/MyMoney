import { UserDal } from "../DAL/userDAL";
import { IUser } from "../models/user";
export class adminBL {
    /**
     * Admin BL
     */
    constructor(private readonly userDal: UserDal = new UserDal()) {
       
    }
    // Get user list function 
    public getUserList = async () : Promise<IUser[]> => {
        return await this.userDal.getAll();
    }


}