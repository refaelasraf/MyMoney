export interface IConfig {
    DAL:{
        elasticsearch?: IElasticSearchConfig,
        transactionDal?: IESDALConfig
    }
}

export interface IElasticSearchConfig {
    host:string
}

export interface IESDALConfig{
    index:string,
    type : "_doc"
}