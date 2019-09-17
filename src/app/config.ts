export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    constructor(){

      //  this.baseUrl="http://dfda21e4.ngrok.io/api/"
//this.baseUrl="http://utilityrest.ap-south-1.elasticbeanstalk.com/api/"
     this.baseUrl = "https://utility-rest.aquapay.in/api/"

      //Production URL
       this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       
        // Test URL
 // this.utilityapiUrl="https://13.233.114.106:9999/"

  //  NGrock URL
  //  this.utilityapiUrl="http://999644d0.ngrok.io/"

    this.backurl="https://utility-rest.aquapay.in"
 //this.backurl="http://utilityrest.ap-south-1.elasticbeanstalk.com"
 //this.backurl="http://dfda21e4.ngrok.io"
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