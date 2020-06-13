export interface IConfig {
    DAL: {
        elasticsearch?: IElasticSearchConfig,
        transactionDal?: IESDALConfig
    },
    pushWeb: IPushWebConfig,
    mail: IMailConfig
}


export interface IMailConfig {
    auth: {
        user: string,
        pass: string
    },
    service: string
}

export interface IPushWebConfig {
    publicKey: string,
    privateKey: string
}

export interface IElasticSearchConfig {
    host: string
}

export interface IESDALConfig {
    index: string,
    type: "_doc"
}