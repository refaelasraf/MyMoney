import axios from "axios"
import {config} from "../configuration/config";

export default class TransactionService {
	static #route = `${config.baseServerUrl}/api/transaction`;

	static async getMonth(date) {
		let res = await axios.post(this.#route + '/getByDate', {start: date, end: this.getNextMonth(date)});
		return res.data;
	}

	static async getCurrentMonthSum(){
		let res = await axios.post(this.#route +  "/getSumOfMonth", {clientID: "666"});
		return res;
	}

	static getNextMonth(date) {
		const clone = new Date(date.getTime());
		clone.setMonth(clone.getMonth() + 1);
		return clone;
	}
}