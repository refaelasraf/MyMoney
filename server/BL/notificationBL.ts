import * as webPush from "web-push";
import {config} from "../configuration/config";
import {IPushWebConfig} from "../configuration/IConfig";

// Notification BL
export class NotificationBL {
    constructor(webPushConfig: IPushWebConfig = config.pushWeb) {
        webPush.setVapidDetails("mailto:refaelasraf@gmail.com", webPushConfig.publicKey, webPushConfig.privateKey);
    }

    public sendNotification(webSubscription: any, userName: string , title:string) {
        const payload = JSON.stringify({
            title: title + userName,
        });

        webPush.sendNotification(webSubscription, payload)
            .catch(error => console.error(error));
    }
}