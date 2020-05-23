import {Router, Request, Response} from "express";
import {config} from "../configuration/config"
import * as webPush from "web-push";

export class NotificationController {
    private router = Router();
    constructor() {
        const publicKey = config.pushWeb.publicKey;
        const privateKey = config.pushWeb.privateKey;

        webPush.setVapidDetails("mailto:refaelasraf@gmail.com", publicKey, privateKey);

        this.router.post('/subscribe', (req, res) => {
            const subscription = req.body.subscription;
            const userId = req.body.userId;

            res.status(201).json({});

            const payload = JSON.stringify({
                title: 'welcome user : ' + userId,
            });

            webPush.sendNotification(subscription, payload)
                .catch(error => console.error(error));
        });

    }

    public getRouter(): Router {
        return this.router;
    }
}