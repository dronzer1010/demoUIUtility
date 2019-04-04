export class Config{
    baseUrl:string
    utilityapiUrl:string;
    constructor(){

        this.baseUrl = "http://aquapayfake.ap-south-1.elasticbeanstalk.com/api/"
        this.utilityapiUrl = "http://bd19b452.ngrok.io/";
    }

    getBaseURL(){
        return this.baseUrl
    }
    getutilityBaseUrl(){
        return this.utilityapiUrl;
    }
}