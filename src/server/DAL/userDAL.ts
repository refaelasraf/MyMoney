import { IUser, UserModel } from "../models/user";

export class UserDal {
    public async register(userName: string, password: string, dateOfBirth: Date, email: string) {
       await UserModel.create({userName, password, dateOfBirth, email});
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await UserModel.findOne({ userName, password }).exec();
    }
}

