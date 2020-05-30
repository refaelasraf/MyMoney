import {Schema, Document} from "mongoose";
import * as mongoose from "mongoose";
let maxDate = new Date(8640000000000000);
let minDate = new Date(-8640000000000000);

export interface IGoal {
    _id: string,
    title: string,
    owner: string,
    type: string,
    triggerValue: number,
    isActivated: boolean,
    lastTriggerDate: Date
}

const goalSchema: Schema = new Schema({
    title: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, required: true},
    type: {type: String, required: true},
    triggerValue: {type: Number, required: true},
    isActivated: {type: Boolean, required: true, default: true},
    lastTriggerDate: {type: Date, required : true, default: minDate}
});

export const GoalModel = mongoose.model<IGoal & Document>('Goal', goalSchema);