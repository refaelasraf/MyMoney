import { IUser, UserModel } from "../models/user";

export class UserDal {
    public async register(userName: string, password: string, dateOfBirth: Date, email: string) {
       await UserModel.create({userName, password, dateOfBirth, email});
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await UserModel.findOne({ userName, password }).exec();
    }

    public async getById(clientId: string) : Promise<IUser> {
        return await UserModel.findOne({clientId}).exec();
    }

    public async findSimilarUsers(user : IUser, filters : string[]) : Promise<string[]> {
        const filterObject : any = {};
        for(const filter in filters){
            filterObject[filter] = (user as any).filter;
        }
        const otherIds = await UserModel.find(filterObject, {"_id" : 1});

        return otherIds.map(user=> user._id).filter(id=> id != user._id );
    }
}

 