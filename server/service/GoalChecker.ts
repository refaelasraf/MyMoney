import {GoalBL} from "../BL/goalBL";
import {TransactionBL} from "../BL/transactionBL";
import {SubscriptionBL} from "../BL/subscriptionBL";
import {UserBL} from "../BL/userBL";
import * as _ from "lodash";
import {IUser} from "../models/user";
import {IGoal} from "../models/goal";
import {ISubscription} from "../models/subscription";
import {NotificationBL} from "../BL/notificationBL";
import {MailSender} from "./MailSender";

interface IUsersFullDetails {
    user: IUser,
    subscriptions: ISubscription[],
    goals: IGoal[],
    monthStats: _.Dictionary<number>
}

export class GoalChecker {
    private count = 0;
    private usersFullDetails: IUsersFullDetails[];

    public constructor(private transactionBL: TransactionBL = new TransactionBL(),
                       private goalBL: GoalBL = new GoalBL(),
                       private subscriptionBL: SubscriptionBL = new SubscriptionBL(),
                       private usersBL: UserBL = new UserBL(),
                       private notificationBL: NotificationBL = new NotificationBL(),
                       private mailSender: MailSender = new MailSender()) {
        this.init().then(() => {
            this.run();
        })
    }

    private async init() {
        const users = await this.usersBL.getAllUsers();
        const goals = await this.goalBL.getAllGoals();
        const subscriptions = await this.subscriptionBL.getAll();

        const monthStatByUser = await this.transactionBL.getCurrentMonthStatsOfAllUsers();
        const goalsByUserID: _.Dictionary<IGoal[]> = _.chain(goals).groupBy((goal: IGoal) => goal.owner).value();
        const subscriptionByUserID: _.Dictionary<ISubscription[]> = _.chain(subscriptions).groupBy((subscription: ISubscription) => subscription.owner).value();

        this.usersFullDetails = _.chain(users).map<IUsersFullDetails>((user: IUser) => ({
            goals: goalsByUserID[user._id],
            subscriptions: subscriptionByUserID[user._id],
            monthStats: monthStatByUser[user._id] ? monthStatByUser[user._id] : null,
            user: user
        })).value()
    }

    private run() {
        for (var i = 0; i < this.usersFullDetails.length; i++) {
            const user: IUser = this.usersFullDetails[i].user;
            const monthStat: _.Dictionary<number> = this.usersFullDetails[i].monthStats;
            const subscriptions: ISubscription[] = this.usersFullDetails[i].subscriptions;
            const goals: IGoal[] = this.usersFullDetails[i].goals;


            const relevantGoals: IGoal[] = this.checkGoals(goals, monthStat ? monthStat.all: 0);
            if (relevantGoals.length != 0 && subscriptions.length != 0) {
                this.sendNotifications(relevantGoals, subscriptions, user);
                this.updateGoals(relevantGoals);
            }
        }


        setTimeout(() => this.run(), 20000);

        this.count++;
        if (this.count % 5 == 0)
            this.init().then();
    }

    private checkGoals(goals: IGoal[], monthStat: number): IGoal[] {
        let nowDate =   new Date(Date.now());
        return _.filter(goals, (goal: IGoal) => goal.triggerValue <= monthStat && goal.isActivated &&
            (goal.lastTriggerDate.getMonth() != nowDate.getMonth() || goal.lastTriggerDate.getFullYear() != nowDate.getFullYear()));
    }

    private sendNotifications(relevantGoals: IGoal[], subscriptions: ISubscription[], user: IUser): void {
        _.forEach(relevantGoals, (relevantGoal : IGoal) => {
            _.forEach(subscriptions, (subscription: ISubscription) => {
                this.notificationBL.sendNotification(subscription.subscription, user.userName, `Goal ${relevantGoal.title} has been activated pleas give attention`)
                this.mailSender.sendMail(user.email, `Goal ${relevantGoal.title} has been activated pleas give attention`, "hi please keep attention").then()
            })
        })
    }

    

    private updateGoals(goals:IGoal[]){
        _.forEach(goals, (goal : IGoal)=>{
            goal.lastTriggerDate = new Date(Date.now());
            this.goalBL.edit(goal._id, goal).then();
        })
    }
}