export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    loginurl:string;
    constructor(){

      // this.baseUrl="http://ddf5b6a032c3.ngrok.io/api/"
   this.baseUrl="http://utilityrest.ap-south-1.elasticbeanstalk.com/api/"
 //  this.baseUrl = "https://utility-rest.aquapay.in/api/"

      //Production URL
   //   this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       
        // Test URL
 this.utilityapiUrl="http://13.233.114.106:9999/"

  //  NGrock URL
 // this.utilityapiUrl="http://0c55bf5c6a4c.ngrok.io/"

   // this.backurl="http://ddf5b6a032c3.ngrok.io" //ngrok
 this.backurl="http://utilityrest.ap-south-1.elasticbeanstalk.com" //test
//this.backurl="https://utility-rest.aquapay.in" //live
     //   this.loginurl="http://6d473a2cff48.ngrok.io/" //ngrok

   this.loginurl="http://13.233.114.106:4000/"//test
  // this.loginurl="https://single-signon.aquapay.in:4000/"//live

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

    getLoginUrl(){
        return this.loginurl;
    }
}