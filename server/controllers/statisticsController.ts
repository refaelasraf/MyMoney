import {statisticsBL as StatisticsBL} from "../BL/statisticsBL";
import {Request, Response} from 'express'

export class statisticsController {
    public constructor(private readonly statisticsBL: StatisticsBL = new StatisticsBL()) {}

    public getUserStatistics = async (req: Request, res : Response) => {
        const clientId = req.params.userId;
        try {
            const userStatistics =  await this.statisticsBL.getUserStatistics(clientId);
            res.json(userStatistics).status(200);
        }
        catch (exp){
            res.json("sorry got an exception" + exp).status(500)
        }
    }

    public getUserSimilarStatistics = async (req: Request, res: Response) => {
        const filters : string[] = req.body.filters;
        const userId : string = req.body.userId;
        const year : number = req.body.year;
        const categories = req.body.categories;
        const statistics = await this.statisticsBL.getUserSimilarStatistics(userId,filters,categories,year);
        res.json(statistics).status(200);
    }
}