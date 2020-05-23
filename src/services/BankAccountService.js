import axios from "axios"
import {config} from "../configuration/config";

export default class BankAccountService {
	static #route = `${config.baseServerUrl}/api/bankAccount`;

	static async get(userId) {
		let res = await axios.get(this.#route + `/getByUser/${userId}`);
		return res.data;
	}

	static async add(userId, bankNumber, branchNumber, accountNumber) {
		let res = await axios.post(this.#route + '/add', {userId, bankNumber, branchNumber, accountNumber});
		return res.data;
	}

	static async edit(id, bankNumber, branchNumber, accountNumber) {
		let res = await axios.post(this.#route + '/edit', {id, bankNumber, branchNumber, accountNumber});
		return res.data;
	}

	static async remove(id) {
		let res = await axios.get(this.#route + `/remove/${id}`);
		return res.data;
	}
}