import mongoose, {Document, Schema} from 'mongoose';

export interface IUser {
    id:string
    _id : string;
    userName : string;
    dateOfBirth : Date;
    password: string;
    email: string;
    groupId: number;
    isAdmin: boolean;
    city: string;
    DistenceFromWork: number;
    numOfPersonsToTakeCareOf: number;
    numOfProviders : number;
    studyYears : number;
    netoIncome : number;
    taxesPayment : number;
    socialCarePayment : number;
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    groupId : {type: Number, required : false},
    isAdmin: {type: Boolean, required: false},
    city : {type: String, required : true},
    DistenceFromWork : {type: Number, required : true},
    numOfPersonsToTakeCareOf : {type: Number, required : true},
    numOfProviders : {type : Number, required: true},
    studyYears : {type : Number, required: true},
    netoIncome : {type : Number, required: true},
    taxesPayment : {type : Number, required: true},
    socialCarePayment :{type : Number, required: true},
});

export const UserModel = mongoose.model<IUser & Document>('User', UserSchema);