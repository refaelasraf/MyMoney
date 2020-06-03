import mongoose, {Document, Schema} from 'mongoose';

export interface IUser {
    id:string
    _id : string;
    userName : string;
    dateOfBirth : Date;
    password: string;
    email: string;
    groupId: string;
    isAdmin: boolean;
    city: string;
    DistenceFromWork: number;
    numOfPersonsToTakeCareOf: number;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    groupId : {type: String, required : false},
    isAdmin: {type: Boolean, required: false},
    city : {type: String, required : true},
    DistenceFromWork : {type: Number, required : true},
    numOfPersonsToTakeCareOf : {type: Number, required : true},
});

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);