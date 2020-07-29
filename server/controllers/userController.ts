import {Request, Response} from 'express'
import {UserBL} from "../BL/userBL";
import {IUser} from '../models/user';
import {users} from "../users/users";

export class userController {
    constructor(private readonly userBl: UserBL = new UserBL()) {
    }

    public async register(req: Request, res: Response) {
        try {
            const user: IUser = {
                userName: req.body.userName,
                password: req.body.password,
                dateOfBirth: req.body.dateOfBirth,
                email: req.body.email,
                city: req.body.city,
                DistenceFromWork: req.body.DistenceFromWork,
                numOfPersonsToTakeCareOf: req.body.numOfPersonsToTakeCareOf,
                netoIncome: req.body.netoIncome,
                numOfProviders: req.body.numOfProviders,
                socialCarePayment: req.body.socialCarePayment,
                studyYears: req.body.studyYears,
                taxesPayment: req.body.taxesPayment,
                _id: null,
                groupId: -1,
                id: null,
                isAdmin: false,
            }
            const id = await this.userBl.register(user);
            res.status(200).send(id);
        } catch (e) {
            res.send('registration failed' + e).status(500);
        }
    }

    public async loadUsers(req: Request, res: Response) {
        let ids = " your ids : ";
        try {
            for (let i = 0; i < users.length; i++) {
                const id = await this.userBl.register(users[i] as IUser);
                console.log(id);
                ids += ` ${id} `;
            }
            res.status(200).send(ids);

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

    public async getById(req: Request, res: Response) {
        try {
            const user = await this.userBl.getById(req.params.id);
            res.status(200).send(user);
        } catch (e) {
            res.status(500).send('getById failed')
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            await this.userBl.edit(req.body.id, req.body.userName, req.body.email, req.body.city,
                req.body.DistenceFromWork, req.body.numOfPersonsToTakeCareOf, req.body.numOfProviders, req.body.netoIncome, req.body.taxesPayment);
            res.send('success').status(200);
        } catch (e) {
            res.send('failed editing credit card').status(502);
        }
    }
}