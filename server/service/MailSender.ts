import * as nodeMailer from "nodemailer";
import  {config} from "../configuration/config";
import {IMailConfig} from "../configuration/IConfig";
import {SentMessageInfo} from "nodemailer";

export class MailSender{
    private transporter : nodeMailer.Transporter;

    public constructor(private mailConfig:IMailConfig = config.mail) {
        this.transporter = nodeMailer.createTransport({
            service: mailConfig.service,
            auth: mailConfig.auth
        });
    }

    public async sendMail(to: string,  subject: string, text: string): Promise<SentMessageInfo> {
        let mailOptions : nodeMailer.SendMailOptions = {
            from: this.mailConfig.auth.user,
            to,
            subject,
            text
        };

        return this.transporter.sendMail(mailOptions);
    }
}