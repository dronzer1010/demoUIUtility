export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    constructor(){

     //   this.baseUrl="http://705c2781.ngrok.io/api/"
    this.baseUrl="http://utilityrest.ap-south-1.elasticbeanstalk.com/api/"
 //  this.baseUrl = "https://utility-rest.aquapay.in/api/"

      //Production URL
     // this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       
        // Test URL
  this.utilityapiUrl="http://13.233.114.106:9999/"

  //  NGrock URL
  //this.utilityapiUrl="http://0be802f0.ngrok.io/"

 //   this.backurl="http://705c2781.ngrok.io"
 this.backurl="http://utilityrest.ap-south-1.elasticbeanstalk.com"
 //this.backurl="https://utility-rest.aquapay.in"
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