import axios from "axios"
import {config} from "../configuration/config";

export default class CreditCardService {
	static #route = `${config.baseServerUrl}/api/creditCard`;

	static async get(userId) {
		let res = await axios.get(this.#route + `/getByUser/${userId}`);
		return res.data;
	}

	static async add(userId, creditNumber, expiration, safetyNumber) {
		let res = await axios.post(this.#route + '/add', {userId, creditNumber, expiration, safetyNumber});
		return res.data;
	}

	static async edit(id, creditNumber, expiration, safetyNumber) {
		let res = await axios.post(this.#route + '/edit', {id, creditNumber, expiration, safetyNumber});
		return res.data;
	}

	static async remove(id) {
		let res = await axios.get(this.#route + `/remove/${id}`);
		return res.data;
	}
}