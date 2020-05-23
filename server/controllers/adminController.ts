import { adminBL } from "../BL/adminBL";
import {Request,Response} from 'express'

export class adminController {

    constructor(private readonly _adminBL = new adminBL()) {}

    public async getUsers(req : Request, res : Response) {
        try {
            const users = await this._adminBL.getUsers();
            res.status(200).json(users);
        }
        catch (ex){
            res.json("couldn't get user list " + ex);
        }

    }
}