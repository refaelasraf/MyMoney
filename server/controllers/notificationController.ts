import {Router} from "express";
import {SubscriptionBL} from "../BL/subscriptionBL";
import {ISubscription} from "../models/subscription";
import {NotificationBL} from "../BL/notificationBL";
import {UserBL} from "../BL/userBL";

export class NotificationController {
    private router = Router();
    constructor(private subscriptionBL: SubscriptionBL = new SubscriptionBL(), notificationBL: NotificationBL = new NotificationBL(),private userBL:UserBL = new UserBL()) {

        this.router.post('/subscribe', async (req, res) => {
            const webSubscription = req.body.subscription;
            const userId = req.body.userId;
            const user = await userBL.getById(req.body.userId)
            const subMessage: ISubscription = {
                owner : userId,
                subscription:webSubscription
            }

            await subscriptionBL.add(subMessage);

            res.status(201).json({});

            notificationBL.sendNotification(webSubscription, user.userName, "Wellcome ");
        });

    }

    // getRouter
    public getRouter(): Router {
        return this.router;
    }
}