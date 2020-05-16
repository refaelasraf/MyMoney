import {Request, Response} from "express";
import {GoalBL} from "../BL/goalBL";

export default class GoalController {
    constructor(private readonly bl: GoalBL = new GoalBL()) {
    }

    public async add(req: Request, res: Response) {
        try {
            const entity = await this.bl.add(req.body.goal);
            res.send(entity).status(200);
        } catch (e) {
            res.send('failed adding goal').status(502);
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            await this.bl.edit(req.body.id, req.body.goal);
            res.send('success').status(200);
        } catch (e) {
            res.send('failed editing goal').status(502);
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            await this.bl.remove(req.params.id);
            res.send('success').status(200);
        } catch (e) {
            res.send('failed deleting goal').status(502);
        }
    }

    public async getByUser(req: Request, res: Response) {
        try {
            const goal = await this.bl.getByUser(req.params.userId);
            res.send(goal).status(200);
        } catch (e) {
            res.send('failed deleting goal').status(502);
        }
    }
}