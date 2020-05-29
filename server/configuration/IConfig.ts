export interface IConfig {
    DAL: {
        elasticsearch?: IElasticSearchConfig,
        transactionDal?: IESDALConfig
    },
    pushWeb: IPushWebConfig
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