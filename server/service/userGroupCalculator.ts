import { IUser } from "../models/user";

export class UserGroupCalculator {
    // bug here - when the order is Dsc.
    private personInFamaly = [4.08,3.45,3.22,3.07,2.69]
    private provivdersNumber = [0.91,1.44,1.67,1.76,1.74]
    private studyYears = [12.7,13.2,13.8,14.5,15.6]
    private netoIncome = [7855,13300,18086,23744,35589]
    private brutoIncome = [6873,12102,17143,23742,40317]
    private socialCarePayment = [1805,1783,1618,1470,1598]
    private taxesPayment = [78,396,989,2270,6903]
    public calculateUserGroup = (user:IUser) : number => {
        let score = 0;
        score += this.calculateField(user.numOfPersonsToTakeCareOf , this.personInFamaly)
         + this.calculateField(user.numOfProviders, this.provivdersNumber)
         + this.calculateField(user.studyYears, this.studyYears)
         + this.calculateField(user.taxesPayment, this.taxesPayment)
         + this.calculateField(user.netoIncome, this.netoIncome)
         + this.calculateField(user.socialCarePayment, this.socialCarePayment)
        return Math.round(score / 6);
    }

    private calculateField(userValue : number, populationCuts : number[]) {

        for (let groupNumber = 0; groupNumber < populationCuts.length; groupNumber++) {
            if (userValue <= populationCuts[groupNumber]){
                return groupNumber + 1;
            }
        }

        return populationCuts.length
    }
}