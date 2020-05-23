import axios from "axios"

export default class GoalsService {
    static #route = `${config.baseServerUrl}/api/goal`;

    static async getUserGoals() {
        let res = await axios.get(this.#route + `/getByUser/${localStorage.userId}`);
        return res.data;
    }

    static async deleteGoal(id){
        let res = await axios.get(this.#route + `/remove/${id}`);
        return res.data;
    }

    static async editGoal(id, goal){
        let res = await axios.post(this.#route + `/edit`, {id, goal});
        return res.data;
    }

    static async addGoal(goal){
        let res = await axios.post(this.#route + `/add`, {goal});
        return res.data;
    }
}