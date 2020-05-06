import {Schema, Document} from "mongoose";
import * as mongoose from "mongoose";

export interface ICreditCard {
	owner: string;
	creditNumber: string;
	expiration: string;
	safetyNumber: string;
}

const creditCardSchema: Schema = new Schema({
	creditNumber: { type: String, required: true },
	safetyNumber: { type: String, required: true },
	expiration: { type: String, required: true },
	owner: { type: Schema.Types.ObjectId, required: true },
});

export const CreditCardModel = mongoose.model<ICreditCard & Document>('CreditCard', creditCardSchema);