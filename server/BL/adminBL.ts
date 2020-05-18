import { UserDal } from "../DAL/userDAL";
import { IUser } from "../models/user";
export class adminBL {
    /**
     *
     */
    constructor(private readonly userDal: UserDal = new UserDal()) {
       
    }

    public getUserList = async () : Promise<IUser[]> => {
        return await this.userDal.getAll();
    }


}