import { adminBL } from "../BL/adminBL";
import { IUser } from "../models/user";
import {Request,Response} from 'express'

export class adminController {

    constructor(private readonly _adminBL = new adminBL()) {
        
    }

    public getUserList = async (req : Request, res : Response)  => {
        try {
        const userList = await this._adminBL.getUserList();
        res.json(userList).status(200);
        }
        catch (ex){
            res.json("couldnt get user list " + ex);
        }

    }
}