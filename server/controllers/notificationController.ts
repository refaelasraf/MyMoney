import {Router} from "express";
import {SubscriptionBL} from "../BL/subscriptionBL";
import {ISubscription} from "../models/subscription";
import {NotificationBL} from "../BL/notificationBL";

export class NotificationController {
    private router = Router();
    constructor(private subscriptionBL: SubscriptionBL = new SubscriptionBL(), notificationBL: NotificationBL = new NotificationBL()) {

        this.router.post('/subscribe', (req, res) => {
            const webSubscription = req.body.subscription;
            const userId = req.body.userId;

            const subMessage: ISubscription = {
                owner : userId,
                subscription:webSubscription
            }

            subscriptionBL.add(subMessage);

            res.status(201).json({});

            notificationBL.sendNotification(webSubscription, userId, "Wellcome user");
        });

    }

    // getRouter
    public getRouter(): Router {
        return this.router;
    }
}