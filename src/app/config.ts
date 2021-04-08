export class Config{
    baseUrl:string
    utilityapiUrl:string;
    backurl:string;
    loginurl:string;
    gravitaorgid:number;
    gravitauserid:number;
    constructor(){

    //Billtree Java End Point
    //this.baseUrl="http://4239837fb792.ngrok.io/api/" //Ngrok
    this.baseUrl="https://backtest-billtree.aquapay.in/api/" //Test
    //this.baseUrl = "https://utility-rest.aquapay.in/api/" //Prod
    //this.baseUrl="http://localhost:8080/api/" //localhost

    //Billtree Node End Point
    //this.utilityapiUrl = "https://billtree.aquapay.in:3002/"; //prod
    this.utilityapiUrl="https://utility-test.aquapay.in:9999/" //Test
    //this.utilityapiUrl="http://baedaf71d248.ngrok.io/" //ngrok
    
    

    //Billtree Java End Point Back
    //this.backurl="http://71f2b37904bb.ngrok.io" //ngrok
    this.backurl="https://backtest-billtree.aquapay.in" //test
    //this.backurl="https://utility-rest.aquapay.in" //live
    //this.loginurl="http://9f96f8bcd809.ngrok.io/" //ngrok


    //Single Sign on End Point
    this.loginurl="https://test-login.aquapay.in:4000/"//test
    //this.loginurl="https://single-signon.aquapay.in:4000/"//live


    //this.gravitaorgid=339;//Test
    this.gravitaorgid=326;//production


    //this.gravitauserid=1759;//Test
    this.gravitauserid=1726;//production

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

    getGravitaOrgId(){
        return this.gravitaorgid;
    }
    getGravitaUserId(){
        return this.gravitauserid;
    }
}