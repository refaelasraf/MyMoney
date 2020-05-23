import {Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface ISubscription {
    owner: string;
    subscription: object
}

const SubscriptionSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, required: true},
    subscription: {
        type: String, get: (data: string) => {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        },
        set: (data: object) => {
            return JSON.stringify(data);
        }
    }
});

export const SubscriptionModel = mongoose.model<ISubscription & Document>('Subscription', SubscriptionSchema);