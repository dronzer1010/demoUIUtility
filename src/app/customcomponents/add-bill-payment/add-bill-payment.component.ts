import { Component, OnInit , ViewChild, Output, EventEmitter } from '@angular/core';
import {  HttpClient ,HttpEventType } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'
import {BillerserviceService} from  '../../api/billerservice.service'
import {PaymentserviceService} from '../../api/paymentservice.service'
import{LoaderService} from '../../api/loader.service'
import{CardserviceService} from '../../api/cardservice.service'
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { DatePipe } from '@angular/common'
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-yyyy',
  },
  display: {
    dateInput: 'DD-MM-yyyy',
    monthYearLabel: 'DD-MM-yyyy',
    dateA11yLabel: 'DD-MM-yyyy',
    monthYearA11yLabel: 'DD-MM-yyyy',
  },
};

/** @title Datepicker with custom formats */
 

@Component({
  selector: 'app-add-bill-payment',
  templateUrl: './add-bill-payment.component.html',
  styleUrls: ['./add-bill-payment.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddBillPaymentComponent implements OnInit {
  billerList: any = [];
  paymentData:any = {};
  recentBiller:any= [];
  cardData:any=[];
  billduedate:string;
  billbilldate:string;
  billerAcc:string;
  consumerNo:string;
  billerName:string;
  billerState:string;
  billerbucode:string;
  billercircle:string;
  billerpara1:string;
  billerpara2:string;
  billerpara3:string;
  billerIfsc:string;
  billerBankName:string;
  billerBranchName:string;
  cardHolder:string=""
  cardNumber:string="";
  fullCardNumber:string="";
  cardExpiry:string="";
  billerId:number;
  cardId:number;
  activecard:string="activeCard"
  charArray:any=[];
  sIndex: number = null;
  /**filtered Supplier based on character */
  filteredBillers:any[];
  currenCard :number=-1;
  cardSelect:boolean=false;
  selectedItem:number;
  activeElement :number;
  activeSupEle:number;
  approvedcards:any=[];
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  tick2:boolean=false;
  tick3:boolean=false;
  tick4:boolean=false;
  selectbiller:boolean=false;
  due_date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false,
    closeOnSelect: true
}

  constructor(private toastr: ToastrService,private payservice:PaymentserviceService,private billservice: BillerserviceService,private cardservice: CardserviceService,private loader:LoaderService,private route:Router,private auth: AuthService,public datepipe: DatePipe) { }

  ngOnInit() {
    console.log(this.due_date)
    this.setCharArray()
    this.loadApprovedCards()
    this.recentBiller=[
      {
         "id":123,
         "name":"Maharashtra State Electricity",
         "consumer_no":"3425436436",
      },
     
   ]

//    this.billerList=[
//     {
//       "consumer_no":"3425436436",
//       "biller_name":"Maharashtra State Electricity",
//       "state":"Maharashtra",
//       "parameter1":"Consumer No",
//       "parameter2":"BU Code Name",
//       "bu_code_bu_name":"4323 Sn/Dn.",
//       "account_no":"34546645756",
//       "bank":"State Bank of India",
//       "branch_name":"Panki",
//       "ifsc":"SBIN0011607",
//       "id":123


//     }
//  ]
 this.loadBillers()
  }

    /**
   * onchange of alphabet
   */

  gotostep2(){
    if(this.selectbiller==true){
      this.step1=false;
      this.step2=true;
      this.step3=false;
    }else{
      this.toastr.warning("Please Select Supplier first!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  
  }
  gotostep1(){
    this.step1=true;
    this.step2=false;
    this.step3=false;
  }

  gotostep3(){
  
      if(this.paymentData['amount'].includes(',')){
        this.toastr.warning("Comma Separated Amount is not allowed!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.step1=false;
        this.step2=false;
        this.step3=true;
      }
 
   
  }

  private loadBillers(){
    this.loader.display(true)
       this.billservice.getAllbillersNew(0,1,2000).then(resp=>{
       // this.billerList=resp['data']
        if(resp['data']!=null || resp['data']!=undefined){
          this.billerList=resp['data'].filter((bills)=>{
            return (bills['status']=='Approved')
          })
        }
        console.log(this.billerList)
        this.filteredBillers=this.billerList
        this.loader.display(false)
       },error=>{
         console.log(error)
         this.loader.display(false)
         if(error['status']==401){
          this.auth.expiresession();
        }
       })
  }  

  filterBillerByChar(character:string){
    this.filteredBillers=[];
    this.filteredBillers = this.billerList.filter(biller =>{

       return (biller['name'][0].toUpperCase() == character)
     })
    
     console.log("here comes filtered suppliers")
     console.log(this.filteredBillers)
  }

  nextChar(c) {
   return String.fromCharCode(c.charCodeAt(0) + 1);
 }

 setCharArray(){
   this.charArray.push('A');
   var tempNextChar='A'
   for(var i=0;i<25;i++){
     tempNextChar= this.nextChar(tempNextChar)
     this.charArray.push(tempNextChar)
   }


   console.log('Here is char array')
 }

 listClick(event, newValue) {
   console.log(newValue);
   this.selectedItem = newValue;  // don't forget to update the model here
   // ... do other stuff here ...
}

changeSupColor(id:number){
  this.activeSupEle = id;
}

private loadApprovedCards(){

  this.currenCard=-1;
 this.cardservice.getAll().subscribe(data=>{
    console.log(data["data"])
   this.cardData=data["data"]
    
  //   for(let i = 0; i < this.cardData.length; i++){
  //     if(this.cardData[i].status == 1){
  //         this.approvedcards.push(this.cardData[i]);
  //     }
  // }

  if(this.cardData!=null){
    this.approvedcards=this.cardData.filter((card)=>{
      return (card['status']=='Approved')
    })
  }
 

  console.log(this.approvedcards)

    if(this.currenCard ==-1){
      this.activeElement=this.approvedcards[0]["id"]
      this.cardById(this.approvedcards[0]["id"]);
    }
  },error=>{
    console.log(error)
  })
}

cardById(id:number){

 // this.paymentservice.getCardById(id).subscribe(data=>{
    console.log("This Card List by Id")
   // console.log(data)
  //   var data={
  //     "msg":"succes",
  //     "code":"OK",
  //     "data":[
  //        {
  //           "expirydate":"03/22",
  //           "aprovedtime":"02:42 PM",
  //           "approvedby":"Mr. Parth Vaishanav",
  //           "cardholder":"Sample Card",
  //           "orgid":262,
  //           "initiatedtime":"02:40 PM",
  //           "aproveddate":"31-05-2020",
  //           "digits":"1323 XXXX XXXX 3653",
  //           "id":186,
  //           "initiateddate":"31-05-2020",
  //           "initiatedby":"Mr. Rajesh Gohil",
  //           "regcmt":"",
  //           "status":1
  //        }
  //     ]
  //  }

  for(var data of this.approvedcards){
    if(data['id']==id){
      this.cardNumber=data['digits']
    this.cardHolder=data['cardholder']
    this.cardExpiry=data['expirymonth']+'/'+data['expiryyear']
    this.cardId=data['id']
    this.fullCardNumber=data['fullcardnumber']
    }
  }

    // this.cardNumber=data['data'][0]['digits']
    // this.cardHolder=data['data'][0]['cardholder']
    // this.cardExpiry=data['data'][0]['expirydate']
    // this.cardId=data['data'][0]['id']
    console.log(this.cardNumber+" "+this.cardHolder+" "+this.cardExpiry+" "+this.cardId)
    this.activeElement = id;
  // },error=>{
  //   console.log(error)
  // })
}

billerById(id:number){
  this.selectbiller=true;
      //this.paymentservice.getSupplierById(id).subscribe(data=>{
      
       
        for(var resp of this.filteredBillers){
          if(resp['id']==id){
            this.billerName=resp['name']
            this.consumerNo=resp['consumerno']
            this.billerAcc=resp['accno']
            this.billerBankName=resp['bank']
            this.billerBranchName=resp['branch']
            this.billerIfsc=resp['ifsc']
            this.billerId=resp['id']
            this.billerState=resp['location']
            this.billerbucode=resp['bucode'],
            this.billercircle=resp['circle'],
            this.billerpara1=resp['parameter1']
            this.billerpara2=resp['displaynamebu']
            this.billerpara3=resp['displaynamecircle']
          }
        }
        
       
      // },error=>{
      //   console.log(error)
      // })
    }

    submitpayment(){
      this.loader.display(true)
      this.paymentData['duedate']=this.billduedate
      if(this.billbilldate!=undefined || this.billbilldate!=null)
      this.paymentData['billdate']=this.billbilldate
      else
      this.paymentData['billdate']=""
    
      this.paymentData['ccno']=this.fullCardNumber
      this.paymentData['billerid']=this.billerId
      this.paymentData['cardno']=this.cardId

      this.payservice.makepaymentNew(this.paymentData).then(resp=>{
        console.log(resp)
        if(resp['msg']=='Unitary Payment Added Successfully'){
          this.loader.display(false)
          this.route.navigate(['/main/successmsg'],{queryParams:{msg:'paymentnewsuccess'}});
        }else{
          this.loader.display(false)
          this.toastr.error("Something Went wrong!",'Alert',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
        
      },error=>{
        console.log(error)
        this.loader.display(false)
      })
    }

    getbilldueDate(event){
      this.billduedate=event._d
      this.billduedate=this.datepipe.transform(this.billduedate, 'dd-MM-yyyy')
      console.log(this.billduedate)
    }

    getbillBillDate(event){
      this.billbilldate=event._d
      this.billbilldate=this.datepipe.transform(this.billbilldate, 'dd-MM-yyyy')
      console.log(this.billbilldate)
    }
  

}
