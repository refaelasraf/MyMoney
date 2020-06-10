import {MailSender} from "./service/MailSender";

var mailSender = new MailSender();
mailSender.sendMail("etsionohad@gmail.com", "אוהד יזבל שלחתי מייל", "קבל זבביר שלחתי לך מייל ")
    .then((r) => console.log(JSON.stringify(r)))
    .catch((e) => console.trace(e));