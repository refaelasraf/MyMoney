import {Router} from 'express'
import {Request,Response} from 'express'

export class userController {
    public register = (req: Request, res : Response) => {
        const body = req.body;
        const userName = body.userName;
        const email = body.emil;
        const dateOfBirth = body.dateOfBirth;
        const password = body.password;
        const creditCardNumber = body.creditNumber;
        const bankAccount = body.bankAccount;
        console.warn("here comes a user")
        res.send("there you go").status(200);
    }
    
    public  login = (req: Request, res : Response) => {
        console.warn("user login")
        res.send("there you go").status(200);
    }

}

