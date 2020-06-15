import {IUser} from "../models/user";

var nKmeans = require("node-kmeans");

export class UserGroupCalculator {

    private peopleGroups = [
        {
            groupId: 1,
            personInFamily: 4.08,
            providersNumber: 0.91,
            studyYears: 12.7,
            netoIncome: 7855,
            brutoIncome: 6873,
            socialCarePayment: 1805,
            taxesPayment: 78
        },
        {
            groupId: 2,
            personInFamily: 3.45,
            providersNumber: 1.44,
            studyYears: 13.2,
            netoIncome: 13300,
            brutoIncome: 12102,
            socialCarePayment: 1783,
            taxesPayment: 396
        },
        {
            groupId: 3,
            personInFamily: 3.22,
            providersNumber: 1.67,
            studyYears: 13.8,
            netoIncome: 18086,
            brutoIncome: 17143,
            socialCarePayment: 1618,
            taxesPayment: 989
        },
        {
            groupId: 4,
            personInFamily: 3.07,
            providersNumber: 1.76,
            studyYears: 14.5,
            netoIncome: 23744,
            brutoIncome: 25742,
            socialCarePayment: 1618,
            taxesPayment: 2270
        },
        {
            groupId: 5,
            personInFamily: 2.69,
            providersNumber: 1.74,
            studyYears: 15.6,
            netoIncome: 35589,
            brutoIncome: 40317,
            socialCarePayment: 1598,
            taxesPayment: 6903
        },
    ];

    private vectors: any[] = [];
    private clusters: any[];

    constructor() {
        for (let i = 0; i < this.peopleGroups.length; i++) {
            const currentGroup = this.peopleGroups[i];
            for (let j = 0; j < 50; j++) {
                this.vectors.push([currentGroup.personInFamily, currentGroup.providersNumber, currentGroup.studyYears, currentGroup.netoIncome,  currentGroup.socialCarePayment, currentGroup.taxesPayment, currentGroup.groupId]);
            }
        }

        nKmeans.clusterize(this.vectors, {k: 5}, (err: any, res: any) => {
            if(err) console.log(err);
            else this.clusters  = res;
        })
    }


    // bug here - when the order is Dsc.
    private personInFamaly = [4.08, 3.45, 3.22, 3.07, 2.69]
    private provivdersNumber = [0.91, 1.44, 1.67, 1.76, 1.74]
    private studyYears = [12.7, 13.2, 13.8, 14.5, 15.6]
    private netoIncome = [7855, 13300, 18086, 23744, 35589]
    private brutoIncome = [6873, 12102, 17143, 23742, 40317]
    private socialCarePayment = [1805, 1783, 1618, 1470, 1598]
    private taxesPayment = [78, 396, 989, 2270, 6903]
    public calculateUserGroup = (user: IUser): number => {

        let score = 0;
        score += this.calculateField(user.numOfPersonsToTakeCareOf, this.clusters.map(g => g.centroid[0]).sort((f:any,s:any)=> f-s))
            + this.calculateField(user.numOfProviders, this.clusters.map(g => g.centroid[1]).sort((f:any,s:any)=> f-s))
            + this.calculateField(user.studyYears, this.clusters.map(g => g.centroid[2]).sort((f:any,s:any)=> f-s))
            + this.calculateField(user.taxesPayment, this.clusters.map(g => g.centroid[5]).sort((f:any,s:any)=> f-s))
            + this.calculateField(user.netoIncome, this.clusters.map(g => g.centroid[3]).sort((f:any,s:any)=> f-s))
            + this.calculateField(user.socialCarePayment, this.clusters.map(g => g.centroid[4]).sort((f:any,s:any)=> f-s))
        return Math.round(score / 6);
    }

    private calculateField(userValue: number, populationCuts: number[]) {

        for (let groupNumber = 0; groupNumber < populationCuts.length; groupNumber++) {
            if (userValue <= populationCuts[groupNumber]) {
                return groupNumber + 1;
            }
        }

        return populationCuts.length
    }
}