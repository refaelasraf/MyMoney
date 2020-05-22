import {Router, Request, Response} from "express";
import {TransactionBL} from "../BL/transactionBL";

export class TransactionController {
    constructor(private readonly bl: TransactionBL) {
    }

    public getRouter(): Router {
        const router = Router();
        router.post("/upsert", (req, res) => this.upsert(req, res));
        router.post("/delete", (req, res) => this.delete(req, res));
        router.post('/getByDate', (req, res) => this.getByDate(req, res));
        router.post("/getSumOfMonth", (req, res) => this.getSumOfMonth(req, res));
        return router;
    }

    private async upsert(req: Request, res: Response) {
        try {
            const entity = await this.bl.upsert(req.body.transaction);
            res.send(entity).status(200);
        } catch (e) {
            res.send('failed upsert transaction').status(502);
        }
    }


    private async delete(req: Request, res: Response) {
        try {
            const entity = await this.bl.delete(req.body.transaction);
            res.send(entity).status(200);
        } catch (e) {
            res.send('failed delete transaction').status(502);
        }
    }

    private async getByDate(req: Request, res: Response) {
        try {
            const entities = await this.bl.getByDate(req.body.start, req.body.end);
            res.send(entities).status(200);
        } catch (e) {
            res.send('failed get by date transaction').status(502);
        }
    }

    private async getSumOfMonth(req: Request, res: Response) {
        try {
            const aggregate = await this.bl.getThisMonthTransactionSum(req.body.clientID);
            res.send(aggregate).status(200);
        } catch (e) {
            res.send('failed get by date transaction').status(502);
        }

    }
}