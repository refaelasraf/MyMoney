import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
    userName : string;
    dateOfBirth : Date;
    password: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);