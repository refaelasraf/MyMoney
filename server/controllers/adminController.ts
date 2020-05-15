import { adminBL } from "../BL/adminBL";
import { IUser } from "../models/user";
export class adminController {

    constructor(private readonly _adminBL = new adminBL()) {
        
    }

    public getUserList() : Promise<IUser[]> {
        return this._adminBL.getUserList()
    }
}