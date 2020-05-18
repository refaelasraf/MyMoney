import {GoalDAL} from "../DAL/goalDAL";
import {IGoal} from "../models/goal";

export class GoalBL {
    constructor(private readonly dal: GoalDAL = new GoalDAL()) {
    }

    public async add(goal: IGoal) {
        return await this.dal.add(goal);
    }

    public async edit(id: string, goal: IGoal) {
        await this.dal.edit(id, goal);
    }

    public async remove(id: string) {
        await this.dal.remove(id);
    }

    public async getByUser(userId: string) {
        return await this.dal.getByUser(userId);
    }
}