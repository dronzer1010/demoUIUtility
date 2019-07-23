export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    constructor(){
this.baseUrl="http://utilityrest.ap-south-1.elasticbeanstalk.com/api/"
      // this.baseUrl = "https://utility-rest.aquapay.in/api/"

      //Production URL
       // this.utilityapiUrl = "https://billtree.aquapay.in:3002/";
       
        // Test URL
  // this.utilityapiUrl="http://e8c96f23.ngrok.io/"

  //  NGrock URL
    this.utilityapiUrl="http://c0b6f3af.ngrok.io/"

      //this.backurl="https://utility-rest.aquapay.in"
     this.backurl="http://utilityrest.ap-south-1.elasticbeanstalk.com"
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