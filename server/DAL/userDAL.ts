import { IUser, UserModel } from "../models/user";

export class UserDal {
    public async register(userName: string, password: string, dateOfBirth: Date, email: string) {
       const res = await UserModel.create({userName, password, dateOfBirth, email});
       return res._id;
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await UserModel.findOne({ userName, password }).exec();
    }

    public async getById(userId: string) : Promise<IUser> {
        return await UserModel.findById(userId).exec();
    }

    public async findSimilarUsers(user : IUser, filters : string[]) : Promise<string[]> {
        const filterObject : any = {};
        for(const filter in filters){
            const fieldName :string = filters[filter]
            filterObject[fieldName] = (user as any)[fieldName];
        }
        const otherIds = await UserModel.find(filterObject, {"_id" : 1});

        return otherIds.map(user=> user.id).filter(id=> id != user.id );
    }

    public async getAll() : Promise<IUser[]> {
        return await UserModel.find({});
    }
}

 