import {SubscriptionDAL} from "../DAL/subscriptionDAL";
import {ISubscription} from "../models/subscription";

export class SubscriptionBL {
    constructor(private readonly dal: SubscriptionDAL = new SubscriptionDAL()) {
    }

    public async add(subscription: ISubscription) {
        return await this.dal.add(subscription);
    }

    public async edit(id: string, subscription: ISubscription) {
        await this.dal.edit(id, subscription);
    }

    public async remove(id: string) {
        await this.dal.remove(id);
    }

    public async getByUser(userId: string) {
        return await this.dal.getByUser(userId);
    }
}