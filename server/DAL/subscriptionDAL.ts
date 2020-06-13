import { SubscriptionModel, ISubscription} from "../models/subscription";

export class SubscriptionDAL {
    public async add(subscription: ISubscription) {
        return await SubscriptionModel.create(subscription);
    }

    public async edit(id: string, subscription: ISubscription) {
        await SubscriptionModel.findByIdAndUpdate(id, subscription).exec();
    }

    public async remove(id: string) {
        await SubscriptionModel.findByIdAndDelete(id).exec();
    }

    public async getByUser(userId: string) {
        return await SubscriptionModel.find({owner: userId}).exec();
    }

    public async getAll(){
        return await SubscriptionModel.find({}).exec()
    }
}