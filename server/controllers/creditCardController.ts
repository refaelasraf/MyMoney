import {Request, Response} from "express";
import {CreditCardBL} from "../BL/creditCardBl";

export default class CreditCardController {
	constructor(private readonly bl: CreditCardBL = new CreditCardBL()) {
	}

	public async add(req: Request, res: Response) {
		try {
			const entity = await this.bl.add(req.body.userId, req.body.creditNumber, req.body.expiration, req.body.safetyNumber);
			res.send(entity).status(200);
		} catch (e) {
			res.send('failed adding credit card').status(502);
		}
	}

	public async edit(req: Request, res: Response) {
		try {
			await this.bl.edit(req.body.id, req.body.creditNumber, req.body.expiration, req.body.safetyNumber);
			res.send('success').status(200);
		} catch (e) {
			res.send('failed editing credit card').status(502);
		}
	}

	public async remove(req: Request, res: Response) {
		try {
			await this.bl.remove(req.body.id);
			res.send('success').status(200);
		} catch (e) {
			res.send('failed deleting credit card').status(502);
		}
	}

	public async getByUser(req: Request, res: Response) {
		try {
			const card = await this.bl.getByUser(req.body.id);
			res.send(card).status(200);
		} catch (e) {
			res.send('failed deleting bank account').status(502);
		}
	}
}