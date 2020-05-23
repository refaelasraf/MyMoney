import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    id : string;
    userName : string;
    dateOfBirth : Date;
    password: string;
    email: string;
    groupId: string;
    isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    groupId : {type: String, required : false},
    isAdmin: {type: Boolean, required: false},
});

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);