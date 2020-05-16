import {GoalModel, IGoal} from "../models/goal";

export class GoalDAL {
    public async add(goal: IGoal) {
        return await GoalModel.create(goal);
    }

    public async edit(id: string, goal: IGoal) {
        await GoalModel.findByIdAndUpdate(id, goal).exec();
    }

    public async remove(id: string) {
        await GoalModel.findByIdAndDelete(id).exec();
    }

    public async getByUser(userId: string) {
        return await GoalModel.find({owner: userId}).exec();
    }
}