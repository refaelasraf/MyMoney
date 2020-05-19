import axios from "axios"

export default class StatisticsService {
	static #route = 'http://localhost:3000/api/statistics';

	static async getUserStats(userId) {
		let res = await axios.get(this.#route + `/getUserStats/${userId}`);
		return res.data;
	}

	static async getSimilarStats(userId, filters, year) {
		let res = await axios.post(this.#route + '/getSimilarStats', {userId, filters, year});
		return res.data;
	}
}