export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    constructor(){

        this.baseUrl = "http://utility-aquapay.ap-south-1.elasticbeanstalk.com/api/"
        this.utilityapiUrl = "http://0bab404c.ngrok.io/";
        this.backurl="http://33c1f409.ngrok.io"
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