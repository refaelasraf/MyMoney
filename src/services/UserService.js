import axios from "axios"

export default class UserService {
	static #route = 'http://localhost:3000/api/user';

	static async register(userName, password, dateOfBirth, email) {
		let res = await axios.post(this.#route + '/register', {userName, password, dateOfBirth, email});
		return res.data === 'success';
	}

	static async login(userName, password) {
		let res = await axios.post(this.#route + '/login', {userName, password});
		return res.data;
	}
}