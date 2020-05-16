import express from "express";
import {config} from "./configuration/config";
import {ElasticHelper} from "./dbHelpers/elasticHelper";
import {TransactionBL} from "./BL/transactionBL";
import {TransactionController} from "./controllers/transactionController";
import {TransactionDAL} from "./DAL/ElasticSearchDAL/transactionDAL";
import * as bodyParser from 'body-parser';
import {userController} from './controllers/userController'
import { statisticsController as StatisticsController } from "./controllers/statisticsController";
import creditCardController from "./controllers/creditCardController";
import BankAccountController from "./controllers/bankAccountController";
import mongoHelper from "./dbHelpers/mongoHelper";
import {NotificationController} from "./controllers/NotificationController";
import Cors from "cors";

const app = express();
const port = 3000;
app.use(Cors());
app.listen(port, ()=> {

    console.log("app is running on port " + port);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoHelper.connect();
const userC = new userController();
const creditCardC = new creditCardController();
const bankAccountC = new BankAccountController();
const statisticsController = new StatisticsController();
const notificationRouter = new NotificationController().getRouter();
const transactionRouter = createTransactionRouter();
app.use(bodyParser.json());

app.use("/api/notification", notificationRouter);
app.use("/api/transaction", transactionRouter);
app.post("/api/user/register", (req, res) => userC.register(req, res));
app.post("/api/user/login", (req, res) =>userC.login(req, res));
app.post("/api/user/register" , userC.register);
app.post("/api/creditCard/add", (req, res) =>creditCardC.add(req, res));
app.post("/api/creditCard/edit", (req, res) =>creditCardC.edit(req, res));
app.get("/api/creditCard/remove/:id", (req, res) =>creditCardC.remove(req, res));
app.get("/api/creditCard/getByUser/:userId", (req, res) =>creditCardC.getByUser(req, res));
app.post("/api/bankAccount/add", (req, res) =>bankAccountC.add(req, res));
app.post("/api/bankAccount/edit", (req, res) =>bankAccountC.edit(req, res));
app.get("/api/bankAccount/remove/:id", (req, res) =>bankAccountC.remove(req, res));
app.get("/api/bankAccount/getByUser/:userId", (req, res) =>bankAccountC.getByUser(req, res));
app.get("/api/statistics/getUserStats/:userId", statisticsController.getUserStatistics);
app.post("/api/statistics/getUserSimilarStats", statisticsController.getUserSimilarStatistics)

function  createTransactionRouter() {
    let elasticHelper = new ElasticHelper(config.DAL.elasticsearch);
    let transactionDAL = new TransactionDAL(elasticHelper, config.DAL.transactionDal);
    let transactionBL = new TransactionBL(transactionDAL);
    let transactionController = new TransactionController(transactionBL);
    return transactionController.getRouter();
}