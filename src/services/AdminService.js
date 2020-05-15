import axios from "axios"

export default class AdminService {
	static #route = 'http://localhost:3000/api/admin';

	static async getStats(userName) {
		let res = await axios.get(this.#route + '/getStats', {userName});
		return res.data;
	}

	static async getUserList() {
		let res = await axios.get(this.#route + '/getUserList', {});
		return res.data;
	}
}