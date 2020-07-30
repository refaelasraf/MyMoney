import axios from "axios"
import {config} from "../configuration/config";
import { v4 as uuidv4 } from 'uuid';

export default class TransactionService {
    static #route = `${config.baseServerUrl}/api/transaction`;

    static async upsert(transaction) {
        transaction.docID = uuidv4();
        let res = await axios.post(this.#route + '/upsert', {transaction});
        return res.data;
    }

    static async getMonthByUser(date) {
        let res = await axios.post(this.#route + '/getByDateAndUser', {
            start: date,
            end: this.getNextMonth(date),
            clientID: localStorage.userId
        });

        return res.data;
    }

    static async getCurrentMonthSum() {
        let res = await axios.post(this.#route + "/getSumOfMonth", {clientID: localStorage.userId});
        return res.data;
    }

    static getNextMonth(date) {
        const clone = new Date(date.getTime());
        clone.setMonth(clone.getMonth() + 1);
        return clone;
    }
}