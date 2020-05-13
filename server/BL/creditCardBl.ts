import {CreditCardDal} from "../DAL/creditCardDal";

export class CreditCardBL {
	constructor(private readonly dal: CreditCardDal = new CreditCardDal()) {
	}

	public async add(userId: string, creditNumber: string, expiration: string, safetyNumber: string) {
		return await this.dal.add({owner: userId, creditNumber, expiration, safetyNumber});
	}

	public async edit(id: string, creditNumber: string, expiration: string, safetyNumber: string) {
		await this.dal.edit(id, creditNumber, expiration, safetyNumber);
	}

	public async remove(id: string) {
		await this.dal.remove(id);
	}

	public async getByUser(userId: string) {
		return await this.dal.getByUser(userId);
	}
}