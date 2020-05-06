import {Request,Response} from 'express'
import {UserBL} from "../BL/userBL";

export class userController {
    constructor(private readonly userBl: UserBL = new UserBL()) {
    }

    public async register(req: Request, res: Response) {
        try {
            await this.userBl.register(req.body.userName, req.body.password, req.body.dateOfBirth, req.body.email);
            res.send('success').status(200);
        } catch (e) {
            res.send('registration failed').status(500);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const user = await this.userBl.login(req.body.userName, req.body.password);
            res.send(user).status(200);
        } catch (e) {
            res.send('login failed').status(500);
        }
    }
}