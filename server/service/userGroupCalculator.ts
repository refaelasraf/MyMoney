import { IUser } from "../models/user";

export class UserGroupCalculator {
    private personInFamaly = [4.08,3.45,3.22,3.07,2.69]
    private provivdersNumber = [0.91,1.44,1.67,1.76,1.74]
    private studyYears = [12.7,13.2,13.8,14.5,15.6]
    private netoIncome = [7855,13300,18086,23744,35589]
    private brutoIncome = [6873,12102,17143,23742,40317]
    private socialCarePayment = [1598,1470,1618,1783,1805]

    public calculateUserGroup = (user:IUser) : number => {
        let score = 0;
        score += this.calculateField(user.numOfPersonsToTakeCareOf , this.personInFamaly)
         + this.calculateField(user.numOfProviders, this.provivdersNumber)
         + this.calculateField(user.studyYears, this.studyYears)
         + this.calculateField(user.taxesPayment, [])
         + this.calculateField(user.netoIncome, this.netoIncome)
         + this.calculateField(user.socialCarePayment, this.socialCarePayment)
        return score / 6;
    }

    private calculateField(userVale : number, populationCuts : number[]) {
        for (let groupNumber = 0; groupNumber < populationCuts.length; groupNumber++) {
            if (userVale <= populationCuts[groupNumber]){
                return groupNumber + 1;
            }
        }

        return populationCuts.length
    }
}