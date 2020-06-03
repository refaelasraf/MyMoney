import {Request, Response} from 'express'
import {UserBL} from "../BL/userBL";

export class userController {
    constructor(private readonly userBl: UserBL = new UserBL()) {
    }

    public async register(req: Request, res: Response) {
        try {
            const id = await this.userBl.register(req.body.userName, req.body.password, req.body.dateOfBirth, req.body.email, req.body.city, req.body.DistenceFromWork, req.body.numOfPersonsToTakeCareOf);
            res.status(200).send(id);
        } catch (e) {
            res.send('registration failed' + e).status(500);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const user = await this.userBl.login(req.body.userName, req.body.password);
            res.status(200).send(user);
        } catch (e) {
            res.status(500).send('login failed');
        }
    }

    public async setUserAsAdmin(req: Request, res: Response) {
        try {
            await this.userBl.setUserAsAdmin(req.params.id);
            res.status(200).send('success');
        } catch (e) {
            res.status(500).send('admin insertion failed')
        }
    }
}