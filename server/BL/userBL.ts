import {UserDal} from "../DAL/userDAL";
import {IUser} from "../models/user";
import { UserGroupCalculator } from "../service/userGroupCalculator";
import { TransactionGenerator } from "../service/TransactionGenerator";

export class UserBL {
    constructor(private readonly userDal: UserDal = new UserDal(),
     private readonly userGropCalc = new UserGroupCalculator(),
     private transactionGenerator = new TransactionGenerator()) {
    }

    public async register(user:IUser) {
        user.groupId = this.userGropCalc.calculateUserGroup(user)

        const userId =  (await this.userDal.register(user)).toHexString();
        try {
        this.transactionGenerator.insertTransactions(userId);
        }
        catch(ex){
            console.log(ex);
        }
        return userId;
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

    public async getById(userId: string) {
        return await this.userDal.getById(userId);
    }

    public async edit(id: string, userName: string, email: string, city: string, DistenceFromWork: number, numOfPersonsToTakeCareOf: number,
                        numOfProviders: number, netoIncome: number, taxesPayment: number)
    {
		await this.userDal.edit(id, userName, email, city, DistenceFromWork, numOfPersonsToTakeCareOf, numOfProviders, netoIncome, taxesPayment);
	}
}