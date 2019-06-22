export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    constructor(){

        this.baseUrl = "http://utility-aquapay.ap-south-1.elasticbeanstalk.com/api/"
      //  this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       this.utilityapiUrl=" http://ec849fd6.ngrok.io/"
        this.backurl="http://utility-aquapay.ap-south-1.elasticbeanstalk.com"
    }

    getBaseURL(){
        return this.baseUrl
    }
    getutilityBaseUrl(){
        return this.utilityapiUrl;
    }
    getBackURL(){
        return this.backurl
    }
}