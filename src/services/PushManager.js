import axios from "axios"
import {config} from "../configuration/config";

const registerUrl = config.baseServerUrl + config.paths.pushSub;
const publicKey = config.publicKey;

export default class PushManager {
    static #route = registerUrl;

    static publicKey = publicKey;

    static async subscriptionToNotification(userId) {
        if ('serviceWorker' in navigator) {
            const register = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });

            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(this.publicKey),
            });

            await axios.post(this.#route, {subscription, userId}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        } else {
            console.error('Service workers are not supported in this browser');
        }
    }


    static urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}