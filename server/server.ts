process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
    });

import express from "express";
import {config} from "./configuration/config";
import {ElasticHelper} from "./dbHelpers/elasticHelper";
import {TransactionBL} from "./BL/transactionBL";
import {TransactionController} from "./controllers/transactionController";
import {TransactionDAL} from "./DAL/ElasticSearchDAL/transactionDAL";
import * as bodyParser from 'body-parser';
import {userController} from './controllers/userController'
import {statisticsController as StatisticsController} from "./controllers/statisticsController";
import creditCardController from "./controllers/creditCardController";
import BankAccountController from "./controllers/bankAccountController";
import mongoHelper from "./dbHelpers/mongoHelper";
import {adminController as AdminController} from "./controllers/adminController";
import {NotificationController} from "./controllers/notificationController";
import GoalController from "./controllers/goalController";
import Cors from "cors";
import SubscriptionController from "./controllers/subscriptionController";
import {GoalChecker} from "./service/GoalChecker";
import path from 'path';
import serveStatic from 'serve-static';
import {CategoriesController} from "./controllers/categoriesController";

const app = express();
const port = process.env.PORT || 3000;
app.use(Cors());
app.listen(port, () => console.log(`app is running on port ${port}`));

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
const goalController = new GoalController();
const subscriptionController = new SubscriptionController();
const categoriesController = new CategoriesController();

const subscriptionRouter = subscriptionController.getRouter();
const goalRouter = goalController.getRouter();
const notificationRouter = new NotificationController().getRouter();
const adminController = new AdminController();
const transactionRouter = createTransactionRouter();

app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, '..', '..', '/dist')));

app.use("/api/notification", notificationRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/goal", goalRouter);
app.use("/api/subscription", subscriptionRouter);


//user
app.post("/api/user/register", (req, res) => userC.register(req, res));
app.post("/api/user/login", (req, res) => userC.login(req, res));
app.get("/api/user/setUserAsAdmin/:id", (req, res) => userC.setUserAsAdmin(req, res));
app.get("/api/user/getById/:id", (req, res) => userC.getById(req, res));
app.get("/api/user/load", (req, res) => userC.loadUsers(req, res));
app.post("/api/user/edit", (req, res) => userC.edit(req, res));

//credit card
app.post("/api/creditCard/add", (req, res) => creditCardC.add(req, res));
app.post("/api/creditCard/edit", (req, res) => creditCardC.edit(req, res));
app.get("/api/creditCard/remove/:id", (req, res) => creditCardC.remove(req, res));
app.get("/api/creditCard/getByUser/:userId", (req, res) => creditCardC.getByUser(req, res));

//bank account
app.post("/api/bankAccount/add", (req, res) => bankAccountC.add(req, res));
app.post("/api/bankAccount/edit", (req, res) => bankAccountC.edit(req, res));
app.get("/api/bankAccount/remove/:id", (req, res) => bankAccountC.remove(req, res));
app.get("/api/bankAccount/getByUser/:userId", (req, res) => bankAccountC.getByUser(req, res));

//statistics
app.get("/api/statistics/getUserStats/:userId", statisticsController.getUserStatistics);
app.post("/api/statistics/getUserSimilarStats", statisticsController.getUserSimilarStatistics);


app.get("/api/admin/getStats");
app.get("/api/admin/getUsers", (req, res) => adminController.getUsers(req, res));

//category
app.get("/api/categories/getCategories", (req, res) => categoriesController.getCategoriesList(req, res))

function createTransactionRouter() {
    let elasticHelper = new ElasticHelper(config.DAL.elasticsearch);
    let transactionDAL = new TransactionDAL(elasticHelper, config.DAL.transactionDal);
    let transactionBL = new TransactionBL(transactionDAL);
    let transactionController = new TransactionController(transactionBL);
    return transactionController.getRouter();
}

new GoalChecker();