import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";

export interface IBankAccount {
    owner: string;
    branchNumber : string;
    bankNumber : string;
    accountNumber: string;
}

const bankAccountSchema: Schema = new Schema({
    bankNumber: { type: String, required: true },
    branchNumber: { type: String, required: true },
    accountNumber: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true },
});

export const BankAccountModel = mongoose.model<IBankAccount & Document>('BankAccount', bankAccountSchema);