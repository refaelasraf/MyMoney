import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    _id : string;
    userName : string;
    dateOfBirth : Date;
    password: string;
    email: string;
    groupId: string;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    groupId : {type: String, required : true}
});

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);