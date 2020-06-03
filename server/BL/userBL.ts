import {UserDal} from "../DAL/userDAL";
import {IUser} from "../models/user";

export class UserBL {
    constructor(private readonly userDal: UserDal = new UserDal()) {
    }

    public async register(userName: string, password: string, dateOfBirth: Date, email: string, city: string, DistenceFromWork: number, numOfPersonsToTakeCareOf: number) {
        return await this.userDal.register(userName, password, dateOfBirth, email, city, DistenceFromWork, numOfPersonsToTakeCareOf);
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await this.userDal.login(userName, password);
    }

    public async getAllUsers():Promise<IUser[]>{
        return await this.userDal.getAll();
    }

    public async setUserAsAdmin(id: string) {
        return await this.userDal.setUserAsAdmin(id);
    }
}