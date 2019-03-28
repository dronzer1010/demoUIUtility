export class Config{
    baseUrl:string
    utilityapiUrl:string;
    constructor(){

        this.baseUrl = "http://aquapayfake.ap-south-1.elasticbeanstalk.com/api/"
        this.utilityapiUrl = "http://60fc97ea.ngrok.io/";
    }

    getBaseURL(){
        return this.baseUrl
    }
    getutilityBaseUrl(){
        return this.utilityapiUrl;
    }
}