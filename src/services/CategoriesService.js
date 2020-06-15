import axios from "axios"
import {config} from "../configuration/config";

export default class CategoriesService {
    static #route = `${config.baseServerUrl}/api/categories`;

    static async getCategories() {
        let res = await axios.get(this.#route + `/getCategories`);
        return res.data;
    }
}