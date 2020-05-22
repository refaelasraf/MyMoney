import axios from "axios"

export default class GoalsService {
    static #route = 'http://localhost:3000/api/goal';

    static async getUserGoals() {
        let res = await axios.get(this.#route + `/getByUser/${localStorage.userId}`);
        return res.data;
    }
}