export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    constructor(){

        this.baseUrl = "https://utility-rest.aquapay.in/api/"
        this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       //this.utilityapiUrl=" http://ec849fd6.ngrok.io/"
        this.backurl="https://utility-rest.aquapay.in"
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