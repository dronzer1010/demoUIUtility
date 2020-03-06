export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    loginurl:string;
    constructor(){

       this.baseUrl="http://e9319399.ngrok.io/api/"
  // this.baseUrl="http://utilityrest.ap-south-1.elasticbeanstalk.com/api/"
   //this.baseUrl = "https://utility-rest.aquapay.in/api/"

      //Production URL
    //  this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       
        // Test URL
 // this.utilityapiUrl="http://13.233.114.106:9999/"

  //  NGrock URL
  this.utilityapiUrl="http://fcecb274.ngrok.io/"

    this.backurl="http://e9319399.ngrok.io"
 //this.backurl="http://utilityrest.ap-south-1.elasticbeanstalk.com"
//this.backurl="https://utility-rest.aquapay.in"
        this.loginurl="http://04691cd0.ngrok.io/"

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