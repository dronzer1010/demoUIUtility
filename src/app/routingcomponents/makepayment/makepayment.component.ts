import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import{CardserviceService} from '../../api/cardservice.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import {UserserviceService} from '../../api/userservice.service'
import{LoaderService} from '../../api/loader.service'
import { Router } from '@angular/router';
import {PaymentserviceService} from  '../../api/paymentservice.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css']
})
export class MakePaymentComponent implements OnInit {
  select=false;
  billertype:boolean=false;
  billdetails:boolean=true;
  conf:boolean=false;
  currenCard :number=-1;
  success:boolean=false;
  reviewCard:boolean=false;
  cardHolder:string=""
  cardNumber:string="";
  cardExpiry:string="";
  cardinitiatedby:string="";
  cardinitiatedon:string="";
  cardapprovedby:string="";
  cardapprovedon:string="";
  selectedcard:any={}
  public checkedValueArray: any = [];
  public additionaldetails: any = [];
  selectall:boolean=false;
  public temp: any;
  public cntChk: number=0;
  public flag: any;
  display='none'; 
  states:any;
  paymentData : any={};
  billers:any;
  billerlist:any=[];
  bills :any = [];
  payments:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  filename:string;
  sortOrder = "asc";
  activeElement :number;
  amountpay: number=0;
  totalamount: any=0;
  late_pay_charges:any;
  meter_reading:any;
  promt_pay_incentives:any;
  remarks:any;
  attachment_url:any;
  payment_id:any;
  cardid:any;
  public currentCard: any=0;
  pendingPayments:any=[]
  approvedcard:any=[]
  cardData:any=[];
  paymentdata:any={}
  constructor(private httpService: HttpClient,private cards:CardserviceService,private billservice: BillerserviceService, private loader: LoaderService, private users: UserserviceService,private router: Router,private paymentservice: PaymentserviceService,private toaster:ToastrService) { }

  ngOnInit() {
    this.billrdetails();
    this.loadApprovedCards();
  }

  getActivecard(id:any){
   
    this.activeElement = id;

    this.cards.getCardById(id).subscribe(resp=>{
      console.log("This Card List by Id")
      console.log(resp)
      this.cardHolder=resp['data'][0]['cardholder']
     this.cardNumber=resp['data'][0]['digits']
     this.cardExpiry=resp['data'][0]['expirydate']
     this.cardinitiatedby=resp['data'][0]['initiatedby']
     this.cardinitiatedon=resp['data'][0]['initiateddate']
     this.cardapprovedby=resp['data'][0]['approvedby']
     this.cardapprovedon=resp['data'][0]['aproveddate']
    })
    
    this.selectedcard=this.approvedcard[0]
    console.log(this.selectedcard)
    console.log(this.selectedcard['id'])
  }



  getBiller(stateid){  
    this.httpService.get('./assets/billers.json').subscribe(
      data=>{
        this.billers=data;
        for(var i=0;i<this.billers.length;i++){
          if(this.billers[i]['code']==stateid){
            this.billerlist=[];
            this.billerlist=this.billers[i]['billers']
          }
        }
        console.log(this.billerlist)       
      }
    )
  }

  openModalDialog(){
    this.display=''; //Set block css
  }
  closeModalDialog(id){
    this.display='block'; //set none css after close dialog
    this.payment_id=id;
  }
  billrdetails(){
    this.loader.display(true)
    this.billertype=false;
    this.billdetails=true;
    this.reviewCard=false;
    
   this.billservice.getAllbillers().then(resp=>{
    this.payments=resp
    var allBills = this.payments
    if(allBills!=null){
      this.bills = allBills.filter((bill)=>{
        return (bill['status']=="Registered")
      })
    }
    console.log(this.bills)
    for(var i=0;i<this.bills.length;i++){
      this.totalamount+=parseInt(this.bills[i]['amount'])
    }
    this.loader.display(false)
   },error=>{
     console.log(error)
     this.loader.display(false)
   })
  


  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getCardDetails(card:any){
    this.selectedcard=card;
    //this.approvedcard[this.currentCard]=card
    console.log(this.selectedcard)
    this.cardHolder=card['cardholder']
    this.cardNumber=card['digits']
    this.cardExpiry=card['expirydate']
    this.cardinitiatedby=card['initiatedby']
    this.cardinitiatedon=card['initiateddate']
    this.cardapprovedby=card['approvedby']
    this.cardapprovedon=card['aproveddate']
    
  }

  private loadApprovedCards(){

    this.currenCard=-1;
    this.cards.getAll().subscribe(data=>{
      //console.log(data["data"])
     this.cardData=data["data"]
      console.log(this.cardData)
      for(let i = 0; i < this.cardData.length; i++){
        if(this.cardData[i].status == "Approved"){
            this.approvedcard.push(this.cardData[i]);
        }
    }

    console.log(this.approvedcard)
    console.log(this.approvedcard[0])
      if(this.currenCard ==-1){
        this.activeElement=this.approvedcard[0]["id"]
        this.getActivecard(this.approvedcard[0]["id"]);
      }
    },error=>{
      console.log(error)
    })
  }

  changeAll(pendingbillerpage): void {    
    if(this.checkedValueArray.length==this.payments.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.amountpay=0
    this.cntChk=0
    }
    console.log(this.selectall)
    if (this.cntChk == 0) {
      this.cntChk = 1;
      this.temp = true;
      this.selectall=true;
      this.select=true;
      this.amountpay=0
      for (var i = 0; i < pendingbillerpage.length; i++) {
        var obj ={
          bill_id:pendingbillerpage[i]['id'],
          amount:pendingbillerpage[i]['amount'],
          billdate:pendingbillerpage[i]['fetch_bill_date'],
          duedate:pendingbillerpage[i]['fetch_due_date'],
          billnumber:pendingbillerpage[i]['fetch_bill_no']
        }
        this.checkedValueArray.push(obj);
        this.amountpay+=parseInt(pendingbillerpage[i]['amount'])
      }
      this.cntChk = 0;
    }
   
    else {
      this.cntChk = 0;
      this.temp = false;
      this.checkedValueArray = [];
      this.select=false;
      this.amountpay=0
    }
    console.log(this.checkedValueArray)
   // console.log(pendingbillerpage)
    
  }

  change(payment): void {
    this.flag = 0;
    for (var i = 0; i < this.checkedValueArray.length; i++) {

      if (this.checkedValueArray[i]["bill_id"] == payment["id"]) {
        this.checkedValueArray.splice(i, 1);
        this.flag = 1;
      }
    }
    if (this.flag == 0) {
      var obj={
        bill_id:payment['id'],
        amount:payment['amount'],
        billdate:payment['fetch_bill_date'],
        duedate:payment['fetch_due_date'],
        billnumber:payment['fetch_bill_no']
      }
      this.checkedValueArray.push(obj);     
    }
    for(var i=0;i<this.payments.length;i++){
      if(this.payments[i]['id'] == payment["id"]){
        if(this.flag==0){
          this.amountpay+=parseInt(this.payments[i]['amount'])
        }else{
          this.amountpay-=parseInt(this.payments[i]['amount'])
        }
      }
    }
    if (this.checkedValueArray.length > 0) {
      this.temp = true;
      if(this.checkedValueArray.length<this.payments.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.payments.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)     
    }
    console.log(this.checkedValueArray)
    //console.log(this.payments)
  }  

  UploadFile(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }

  cnfsend(){
    this.billdetails=false;
    this.conf=true;
    this.billertype=false;   
    this.reviewCard=true;

    for(var i=0;i<this.payments.length;i++){
      for(var j=0;j<this.checkedValueArray.length;j++){
        if(this.payments[i].id == this.checkedValueArray[j]){
          this.pendingPayments.push(this.payments[i]);
        }
      }
    }
  }

  succesadd(){
    // this.billdetails=false;
    // this.billertype=false;
    // this.conf=false;
    // this.success=true;
    // this.reviewCard=false;
    this.loader.display(true);
    this.paymentData={
      "card_id":this.selectedcard['id'],
      "bills":this.checkedValueArray,
      "count":this.checkedValueArray.length,
      "totalamount":this.amountpay
    }
    console.log(this.paymentData)
    this.paymentservice.makepayment(this.paymentData).then(resp=>{
      console.log(resp)
      this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentsuccess'}});
      this.loader.display(false);
    },error=>{
      this.toaster.error("Failed to register bill payment!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
      console.log(error)
      this.loader.display(false);
    })
    
   
   
    // var tempPendingPayments = this.pendingPayments.map((payment)=>{
    //   var card = this.selectedcard
    //   console.log(card)
    //   payment['status']='Pending';
    //   payment['paymentstatus']='Pending';
    //   payment['card']=card;
    //   return payment;
    // });
    // localStorage.setItem('payments' , JSON.stringify(tempPendingPayments));
  }

  backbilltype(){
    this.billdetails=false;
    this.billertype=true;
    this.conf=false;
    this.success=false;
    this.reviewCard=false;
  }

  backbilldetails(){
    this.billdetails=true;
    this.billertype=false;
    this.conf=false;
    this.success=false;
    this.reviewCard=false;
  }
  review(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    this.success=false;
    this.reviewCard=true;
  }
  submitextradetails(){
    this.display=''; 

  }

  
}
