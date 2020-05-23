import {GoalBL} from "../BL/goalBL";
import {TransactionBL} from "../BL/transactionBL";
import {SubscriptionBL} from "../BL/subscriptionBL";
import {UserBL} from "../BL/userBL";
import * as _ from "lodash";
import {IUser} from "../models/user";
import {IGoal} from "../models/goal";
import {ISubscription} from "../models/subscription";

const goalBL = new GoalBL();
const subscriptionBL = new SubscriptionBL();
const usersBL = new UserBL();

interface IUsersFullDetails {
    user: IUser,
    subscriptions: ISubscription[],
    goals: IGoal[],
    monthStats: number
}

export class GoalChecker {

    private usersFullDetails: IUsersFullDetails[];

    public constructor(private transactionBL: TransactionBL = new TransactionBL(),
                       private goalBL: GoalBL = new GoalBL(),
                       private subscriptionBL: SubscriptionBL = new SubscriptionBL(),
                       private usersBL: UserBL = new UserBL()) {
    }

    public async init() {
        const users = await this.usersBL.getAllUsers();
        const goals = await this.goalBL.getAllGoals();
        const subscriptions = await this.subscriptionBL.getAll();

        const monthStatByUser = await this.transactionBL.getCurrentMonthStatsOfAllUsers();
        const goalsByUserID: _.Dictionary<IGoal[]> = _.chain(goals).groupBy((goal: IGoal) => goal.owner).value();
        const subscriptionByUserID: _.Dictionary<ISubscription[]> = _.chain(subscriptions).groupBy((subscription: ISubscription) => subscription.owner).value();

        this.usersFullDetails = _.chain(users).map<IUsersFullDetails>((user:IUser)=>({
            goals: goalsByUserID[user._id],
            subscriptions : subscriptionByUserID[user._id],
            monthStats: monthStatByUser[user._id] ? monthStatByUser[user._id] : 0,
            user:user
        })).value()

    }

}