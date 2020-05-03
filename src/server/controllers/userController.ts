import {Router} from 'express'
import {Request,Response} from 'express'
import {userBL} from '../BL/userBL'
export class userController {

    private userBL: userBL;
    constructor() {
        this.userBL = new userBL();
    }

    public register = async (req: Request, res : Response) => {
        const body = req.body;
        const userName = body.userName;
        const email = body.email;
        const dateOfBirth = body.dateOfBirth;
        const password = body.password;
        const creditCardNumber = body.creditCardNumber;
        const bankAccount = body.bankAccount;
        try {
        const isSucceed = await this.userBL.registerUser(userName,email,password,dateOfBirth,bankAccount,creditCardNumber)
        if (isSucceed)
            res.send("userRegisterd seccessfuly").status(200);
            return;
        }
        catch (err){
            res.send(err).status(500)
        }
            res.send("couldont insert user").status(500);
        
    }
    
    public  login = (req: Request, res : Response) => {
        console.warn("user login")
        res.send("there you go").status(200);
    }

}

