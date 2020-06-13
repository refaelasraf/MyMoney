import axios from "axios"
import {config} from "../configuration/config";

export default class StatisticsService {
	static #route = `${config.baseServerUrl}/api/statistics`;

	static async getUserStats(userId) {
		let res = await axios.get(this.#route + `/getUserStats/${userId}`);
		return res.data;
	}

	static async getSimilarStats(userId, filters, year) {
		let res = await axios.post(this.#route + '/getSimilarStats', {userId, filters, year});
		return res.data;
	}
}