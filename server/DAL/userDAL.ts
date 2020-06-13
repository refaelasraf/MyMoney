import {IUser, UserModel} from "../models/user";

export class UserDal {
    public async register(user:IUser) {
        let res;
        try {
            delete user._id;
            delete user.id;
            res = await UserModel.create(user);
        }
        catch (ex) {
            console.log(ex)
        }
        return res._id;
    }

    public async login(userName: string, password: string): Promise<IUser> {
        return await UserModel.findOne({userName, password}).exec();
    }

    public async getById(userId: string): Promise<IUser> {
        return await UserModel.findById(userId).exec();
    }

    public async findSimilarUsers(user: IUser, filters: string[]): Promise<string[]> {
        const filterObject: any = {};
        for (const filter in filters) {
            const fieldName: string = filters[filter];
            filterObject[fieldName] = (user as any)[fieldName];
        }
        const otherIds = await UserModel.find(filterObject, {"_id": 1});

        return otherIds.map(user => user.id).filter(id => id != user.id);
    }
    
    public async setUserAsAdmin(id: string) {
        return UserModel.findByIdAndUpdate(id, {isAdmin: true}).exec();
    }

    public async getAll(): Promise<IUser[]> {
        return await UserModel.find({}).exec();
    }
}

 