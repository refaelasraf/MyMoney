import {Request, Response} from "express";
import {BankAccountBL} from "../BL/bankAccountBl";

export default class BankAccountController {
	constructor(private readonly bl: BankAccountBL = new BankAccountBL()) {
	}

	public async add(req: Request, res: Response) {
		try {
			const entity = await this.bl.add(req.body.userId, req.body.branchNumber, req.body.bankNumber, req.body.accountNumber);
			res.send(entity).status(200);
		} catch (e) {
			res.send('failed adding bank account').status(502);
		}
	}

	public async edit(req: Request, res: Response) {
		try {
			await this.bl.edit(req.body.id, req.body.branchNumber, req.body.bankNumber, req.body.accountNumber);
			res.send('success').status(200);
		} catch (e) {
			res.send('failed editing bank account').status(502);
		}
	}

	public async remove(req: Request, res: Response) {
		try {
			await this.bl.remove(req.body.id);
			res.send('success').status(200);
		} catch (e) {
			res.send('failed deleting bank account').status(502);
		}
	}

	public async getByUser(req: Request, res: Response) {
		try {
			const account = await this.bl.getByUser(req.body.id);
			res.send(account).status(200);
		} catch (e) {
			res.send('failed deleting bank account').status(502);
		}
	}
}