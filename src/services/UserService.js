import axios from "axios"
import {config} from "../configuration/config";

export default class UserService {
    static #route = `${config.baseServerUrl}/api/user`;

    static async register(userName, password, dateOfBirth, email, city, DistenceFromWork, numOfPersonsToTakeCareOf) {
        try {
        let res = await axios.post(this.#route + '/register', {userName, password, dateOfBirth, email, city, DistenceFromWork, numOfPersonsToTakeCareOf});
        return res.data;
        } catch (ex) {
            return;
        }
    }

    static async login(userName, password) {
        let res = await axios.post(this.#route + '/login', {userName, password});
        return res.data;
    }
}