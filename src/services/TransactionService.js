import axios from "axios"

export default class TransactionService {
	static #route = 'http://localhost:3000/api/transaction';

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