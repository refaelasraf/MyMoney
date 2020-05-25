import {Router, Request, Response} from "express";
import {config} from "../configuration/config"
import * as webPush from "web-push";
import {SubscriptionBL} from "../BL/subscriptionBL";
import {ISubscription} from "../models/subscription";


export class NotificationController {
    private router = Router();
    constructor(private subscriptionBL: SubscriptionBL = new SubscriptionBL()) {
        const publicKey = config.pushWeb.publicKey;
        const privateKey = config.pushWeb.privateKey;

        webPush.setVapidDetails("mailto:refaelasraf@gmail.com", publicKey, privateKey);

        this.router.post('/subscribe', (req, res) => {
            const webSubscription = req.body.subscription;
            const userId = req.body.userId;

            const subMessage: ISubscription = {
                owner : userId,
                subscription:webSubscription
            }

            subscriptionBL.add(subMessage);

            res.status(201).json({});

            const payload = JSON.stringify({
                title: 'welcome user : ' + userId,
            });

            webPush.sendNotification(webSubscription, payload)
                .catch(error => console.error(error));
        });

    }

    // getRouter
    public getRouter(): Router {
        return this.router;
    }
}