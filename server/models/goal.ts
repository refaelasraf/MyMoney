import {Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface IGoal {
    id: string,
    title: string,
    owner: string,
    type: string,
    triggerValue: number,
    isActivated: boolean
}

const goalSchema: Schema = new Schema({
    title: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, required: true},
    type: {type: String, required: true},
    triggerValue: {type: Number, required: true},
    isActivated: {type: Boolean, required: true, default: true}
});

export const GoalModel = mongoose.model<IGoal & Document>('Goal', goalSchema);