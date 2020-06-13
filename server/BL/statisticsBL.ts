import {statisticsDAL as StatisticsDAL} from "../DAL/statisticsDAL";
import {UserDal} from "../DAL/userDAL";

export class statisticsBL {
   
    constructor(private readonly statisticsDAL: StatisticsDAL  = new StatisticsDAL(),
                private readonly userDAL: UserDal = new UserDal()) {}

    public getUserSimilarStatistics = async (clientId: string, filters : string[], categories : string[], year: number) => {
        let statistics = null;
        try {
        const user  = await this.userDAL.getById(clientId);
        if (!filters || filters.length == 0)
            filters = ["groupId"];
       
            const otherIds = await this.userDAL.findSimilarUsers(user,filters);
            statistics = await this.statisticsDAL.getUserSimilarStatistics(user.id, otherIds,year, categories);
        }
        catch (ex) {
            console.log(ex);
        }
        
        return statistics;
    }

    public getUserStatistics = async (clientId:string) => {
      //  const user  = await this.userDAL.getById(clientId);
        return await this.statisticsDAL.getUserStatistics(clientId);
    }
}