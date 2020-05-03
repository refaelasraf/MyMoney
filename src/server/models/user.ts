import { bankAccount } from "./bankAccout";

export type user = {
    userName : string,
    email: string,
    pasword: string,
    dateOfBirth : Date,
    creditCard : {},
    bankAccoutn : bankAccount
}