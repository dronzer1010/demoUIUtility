export class Config{
    baseUrl:string
    utilityapiUrl:string;
    constructor(){

        this.baseUrl = "http://aquapayfake.ap-south-1.elasticbeanstalk.com/api/"
        this.utilityapiUrl = "";
    }

    getBaseURL(){
        return this.baseUrl
    }
    getutilityBaseUrl(){
        return this.utilityapiUrl;
    }
}