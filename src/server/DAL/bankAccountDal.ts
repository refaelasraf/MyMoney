import {BankAccountModel, IBankAccount} from "../models/bankAccout";

export class BankAccountDal {
	public async add(account: IBankAccount) {
		return await BankAccountModel.create(account);
	}

	public async edit(id: string, branchNumber: string, bankNumber: string, accountNumber: string) {
		BankAccountModel.findByIdAndUpdate(id, {branchNumber, bankNumber, accountNumber}).exec();
	}

	public async remove(id: string) {
		BankAccountModel.findByIdAndDelete(id).exec();
	}

	public async getByUser(userId: string) {
		return await BankAccountModel.find({ owner: userId }).exec();
	}
}