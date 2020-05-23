import axios from "axios"
import {config} from "../configuration/config";

export default class AdminService {
	static #route = `${config.baseServerUrl}/api/admin`;

	static async getStats(userName) {
		let res = await axios.get(this.#route + '/getStats', {userName});
		return res.data;
	}
}