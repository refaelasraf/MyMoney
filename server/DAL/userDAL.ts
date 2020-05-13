import { IUser, UserModel } from "../models/user";

export class UserDal {
    public async register(userName: string, password: string, dateOfBirth: Date, email: string) {
       const res = await UserModel.create({userName, password, dateOfBirth, email});
       return res._id;
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await UserModel.findOne({ userName, password }).exec();
    }
}

