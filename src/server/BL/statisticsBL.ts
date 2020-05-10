import { statisticsDAL as StatisticsDAL } from "../DAL/statisticsDAL";

export class statisticsBL {
   
    constructor(private readonly statisticsDAL: StatisticsDAL  = new StatisticsDAL()) {}

    public getUserStatistics = async (clientId:string) => {
        return await this.statisticsDAL.getUserStatistics(clientId);
    }
}