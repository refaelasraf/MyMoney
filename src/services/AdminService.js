import axios from "axios"
import {config} from "../configuration/config";

export default class AdminService {
	static #route = `${config.baseServerUrl}/api/admin`;

	static async getStats(userName) {
		const res = await axios.get( `${this.#route}/getStats`, {userName});
		return res.data;
	}

	static async getUsers() {
		const res = await axios.get(`${this.#route}/getUsers`);
		return res.data;
	}
}