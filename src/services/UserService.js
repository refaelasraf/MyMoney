import axios from "axios"
import {config} from "../configuration/config";

export default class UserService {
    static #route = `${config.baseServerUrl}/api/user`;

    static async register(userName, password, dateOfBirth, email, city, DistenceFromWork, numOfPersonsToTakeCareOf, numOfProviders, studyYears, netoIncome, taxesPayment, socialCarePayment) {
        try {
        let res = await axios.post(this.#route + '/register', {userName, password, dateOfBirth, email, city, DistenceFromWork, numOfPersonsToTakeCareOf, numOfProviders, studyYears, netoIncome, taxesPayment, socialCarePayment});
        return res.data;
        } catch (ex) {
            return;
        }
    }

    static async login(userName, password) {
        let res = await axios.post(this.#route + '/login', {userName, password});
        return res.data;
    }

    static async getById(userId) {
        let res = await axios.get(this.#route + `/getById/${userId}`);
        return res.data;
    }

    static async edit(id, userName, email, city, DistenceFromWork, numOfPersonsToTakeCareOf, numOfProviders, netoIncome, taxesPayment)
    {
        let res = await axios.post(this.#route + '/edit', {id, userName, email, city, DistenceFromWork, numOfPersonsToTakeCareOf, numOfProviders, netoIncome, taxesPayment});
        return res.data;
    }
}