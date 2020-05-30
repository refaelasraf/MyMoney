import axios from "axios"
import {config} from "../configuration/config";

export default class UserService {
    static #route = `${config.baseServerUrl}/api/user`;

    static async register(userName, password, dateOfBirth, email) {
        let res = await axios.post(this.#route + '/register', {userName, password, dateOfBirth, email});
        return res.data;
    }

    static async login(userName, password) {
        let res = await axios.post(this.#route + '/login', {userName, password});
        return res.data;
    }
}