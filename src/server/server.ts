import express from "express";
import * as bodyParser from 'body-parser';
import {userController} from './controllers/userController'
import creditCardController from "./controllers/creditCardController";
import BankAccountController from "./controllers/bankAccountController";
import mongoHelper from "./dbHelpers/mongoHelper";

const app = express();
const port = 3000;
app.listen(port, ()=> {
    console.log("app is running on port " + port);
});
mongoHelper.connect();
const userC = new userController();
const creditCardC = new creditCardController();
const bankAccountC = new BankAccountController();

app.use(bodyParser.json());

app.post("/api/user/register", (req, res) => userC.register(req, res));
app.post("/api/user/login", (req, res) =>userC.login(req, res));
app.post("/api/creditCard/add", (req, res) =>creditCardC.add(req, res));
app.post("/api/creditCard/edit", (req, res) =>creditCardC.edit(req, res));
app.post("/api/creditCard/remove", (req, res) =>creditCardC.remove(req, res));
app.post("/api/creditCard/getByUser", (req, res) =>creditCardC.getByUser(req, res));
app.post("/api/bankAccount/add", (req, res) =>bankAccountC.add(req, res));
app.post("/api/bankAccount/edit", (req, res) =>bankAccountC.edit(req, res));
app.post("/api/bankAccount/remove", (req, res) =>bankAccountC.remove(req, res));
app.post("/api/bankAccount/getByUser", (req, res) =>bankAccountC.getByUser(req, res));
