import express from "express";
import * as bodyParser from 'body-parser';
import {userController} from './controllers/userController'

const app = express();
const port = 3000
app.listen(port, ()=> {
    console.log("app is runnig on port" + port);
})
const userC = new userController()
app.use(bodyParser.json());

app.post("/api/user/register" , userC.register)