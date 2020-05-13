import {UserDal} from "../DAL/userDAL";
import {IUser} from "../models/user";

export class UserBL {
    constructor(private readonly userDal: UserDal = new UserDal()) {
    }

    public async register(userName: string, password: string, dateOfBirth: Date, email: string) {
        return await this.userDal.register(userName, password, dateOfBirth, email);
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await this.userDal.login(userName, password);
    }
}