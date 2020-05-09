import {Router,Request, Response} from "express";
import {TransactionBL} from "../BL/transactionBL";

export  class TransactionController {
    constructor(private readonly bl: TransactionBL) {
    }

    public getRouter(){
        var router =  Router();
        router.post("/upsert", this.upsert)

        return router
    }

    private async upsert(req: Request, res: Response) {
        try {
            const entity = await this.bl.upsert(req.body.transaction);
            res.send(entity).status(200);
        } catch (e) {
            res.send('failed adding credit card').status(502);
        }
    }
}