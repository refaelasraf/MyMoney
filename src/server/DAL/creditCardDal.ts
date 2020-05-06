import {CreditCardModel, ICreditCard} from "../models/creditCard";

export class CreditCardDal {
	public async add(card: ICreditCard) {
		return await CreditCardModel.create(card);
	}

	public async edit(id: string, creditNumber: string, expiration: string, safetyNumber: string) {
		await CreditCardModel.findByIdAndUpdate(id, {creditNumber, expiration, safetyNumber}).exec();
	}

	public async remove(id: string) {
		await CreditCardModel.findByIdAndDelete(id).exec();
	}

	public async getByUser(userId: string) {
		return await CreditCardModel.find({ owner: userId }).exec();
	}
}