import {BankAccountDal} from "../DAL/bankAccountDal";

export class BankAccountBL {
	constructor(private readonly dal: BankAccountDal = new BankAccountDal()) {
	}

	public async add(userId: string, branchNumber: string, bankNumber: string, accountNumber: string) {
		return await this.dal.add({owner: userId, branchNumber, bankNumber, accountNumber});
	}

	public async edit(id: string, branchNumber: string, bankNumber: string, accountNumber: string) {
		await this.dal.edit(id, branchNumber, bankNumber, accountNumber);
	}

	public async remove(id: string) {
		await this.dal.remove(id);
	}

	public async getByUser(userId: string) {
		return await this.dal.getByUser(userId);
	}
}