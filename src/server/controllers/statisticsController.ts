import { statisticsBL as StatisticsBL } from "../BL/statisticsBL";
import {Request,Response} from 'express'
export class statisticsController {


    constructor(private readonly statisticsBL: StatisticsBL = new StatisticsBL()) {}

    public getUserStatistics = async (req: Request, res : Response) => {
        const userId = req.body.userId;
        try {
            const userStatistics =  await this.statisticsBL.getUserStatistics(userId);
            res.json(userStatistics).status(200);
        }
        catch (exp){
            res.json("sorry got an exption" + exp).status(500)
        }
        
    }
}