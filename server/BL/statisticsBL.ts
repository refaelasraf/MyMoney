import { statisticsDAL as StatisticsDAL } from "../DAL/statisticsDAL";
import { UserDal } from "../DAL/userDAL";
import { IUser } from "../models/user";
import { IUserStatistic } from "../models/userStatistic";

export class statisticsBL {
   
    constructor(private readonly statisticsDAL: StatisticsDAL  = new StatisticsDAL(),
                private readonly userDAL: UserDal = new UserDal()) {}

    public getUserSimilarStatistics = async (clientId: string, filters : string[]) => {
        const user  = await this.userDAL.getById(clientId);
        let statistics = null;
        if (!filters || filters.length == 0)
            filters = ["groupId"];
        try {
            const otherIds = await this.userDAL.findSimilarUsers(user,filters);
            statistics = await this.statisticsDAL.getUserSimilarStatistics(user.id, otherIds);
        }
        catch (ex) {
            console.log(ex);
        }
        
        return statistics;
    }

    public getUserStatistics = async (clientId:string) => {
        const user  = await this.userDAL.getById(clientId);
        return await this.statisticsDAL.getUserStatistics(clientId);
    }
}