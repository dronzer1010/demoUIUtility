export class Config{
    baseUrl:string
    utilityapiUrl:string;
    constructor(){

        this.baseUrl = "https://turpe.serveo.net/api/"
        this.utilityapiUrl = "http://35.154.109.72:9999/";
    }

    getBaseURL(){
        return this.baseUrl
    }
    getutilityBaseUrl(){
        return this.utilityapiUrl;
    }
}