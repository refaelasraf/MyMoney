import {Request, Response, Router} from "express";
import {SubscriptionBL} from "../BL/SubscriptionBL";

export default class SubscriptionController {
    private readonly router: Router;

    constructor(private readonly bl: SubscriptionBL = new SubscriptionBL()) {
        this.router = Router();
        this.router.post("/add", (req, res) => this.add(req, res));
        this.router.post("/edit", (req, res) => this.edit(req, res));
        this.router.get("/remove/:id", (req, res) => this.remove(req, res));
        this.router.get("/getByUser/:userId", (req, res) => this.getByUser(req, res));
    }

    public getRouter() {
        return this.router;
    }

    public async add(req: Request, res: Response) {
        try {
            const entity = await this.bl.add(req.body.subscription);
            res.send(entity).status(200);
        } catch (e) {
            res.send('failed adding subscription').status(502);
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            await this.bl.edit(req.body.id, req.body.subscription);
            res.send('success').status(200);
        } catch (e) {
            res.send('failed editing subscription').status(502);
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            await this.bl.remove(req.params.id);
            res.send('success').status(200);
        } catch (e) {
            res.send('failed deleting subscription').status(502);
        }
    }

    public async getByUser(req: Request, res: Response) {
        try {
            const subscription = await this.bl.getByUser(req.params.userId);
            res.send(subscription).status(200);
        } catch (e) {
            res.send('failed deleting subscription').status(502);
        }
    }
}