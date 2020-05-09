export class ITransaction {
    public docID: string;
    public clientId: string;
    public groupId: string;
    public amount: number;
    public eventTime: Date;
    public storeName: string;
    public categoryId: string;
}

export class Transaction implements ITransaction {
    public constructor(
        public docID: string,
        public clientId: string,
        public groupId: string,
        public amount: number,
        public eventTime: Date,
        public storeName: string,
        public categoryId: string) {
    }
}