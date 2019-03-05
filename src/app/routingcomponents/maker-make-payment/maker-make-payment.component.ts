import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-maker-make-payment',
  templateUrl: './maker-make-payment.component.html',
  styleUrls: ['./maker-make-payment.component.css']
})
export class MakerMakePaymentComponent implements OnInit {
  billertype:boolean=true;
  billdetails:boolean=false;
  conf:boolean=false;
  success:boolean=false;
  reviewCard:boolean=false;
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
  sortOrder = "asc";
  billDates=['12/03/2019' ,'17/03/2019' , '07/03/2019' , '06/03/2019' ,'20/03/2019','11/03/2019','15/03/2019']
  dueDates=['21/03/2019' ,'23/03/2019' , '24/03/2019' , '28/03/2019' ,'25/03/2019','26/03/2019','30/03/2019']
  fetchingBill=false;
  public currentCard: any=0;
  approvedcard:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019",
    aprovedtime: "12:10:52",
    cardholder: "Test card",
    digits: "4859 xxxx xxxx 0005",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "12:09:38",
    orgid: 73,
    regcmt: "",
    status: 1},
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019",
  aprovedtime: "19:17:24",
  cardholder: "Test Card 1",
  digits: "4859 xxxx xxxx 0047",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "17:30:29",
  orgid: 73,
  regcmt: "",
  status: 1
    }
  ]
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('./assets/states.json').subscribe(
      data=>{
        this.states=data;
      }
    )
  }

  goToNextCard() {
    if (this.approvedcard.length - 1 == this.currentCard) {
      this.currentCard = 0;
    }
    else {
      this.currentCard++;
    }
  
  }
  
  goToPrevCard() {
    if (this.currentCard == 0) {
      this.currentCard = this.approvedcard.length - 1;
    }
    else {
      this.currentCard--;
    }
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
 closeModalDialog(){
  this.display='block'; //set none css after close dialog
 }
  billrdetails(){
    this.billertype=false;
    this.billdetails=true;
    this.reviewCard=false;

    var allBills = JSON.parse(localStorage.getItem('billdetails'));

    this.bills = allBills.filter((bill)=>{
      return (bill['status']=="Approved" && bill['biller']==this.paymentData['biller'] && bill['state']==this.paymentData['state'])
    })

    console.log(this.bills);
    this.payments = this.bills.map((bill)=>{
      var payment={};
      payment['id'] = bill.id;
      payment['amount']=null;
      payment['duedate']=null;
      payment['billnumber']=null;
      payment['bill']=bill;
      payment['status']=null;
      payment['initiatedby']=null;
      payment['initiatedon']=null;
      payment['approvedby']=null;
      payment['approvedon']=null;



      return payment;
    })

    console.log(this.payments);

  
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  fetchAllBills(){
    for(var i=0;i<this.payments.length;i++){
    
        var d =new Date();
        this.payments[i].amount = (Math.random()*(3000-1000)).toFixed(2);
        this.payments[i].duedate = this.dueDates[this.getRandomInt(7)];
        this.payments[i].billdate = this.billDates[this.getRandomInt(7)];
        this.payments[i].billnumber = d.getTime();
      
    }
  }


  fetchBill(id){
    console.log("hello")
    this.fetchingBill = true;
    for(var i=0;i<this.payments.length;i++){
      if(this.payments[i].id == id){
        var d =new Date();
        this.payments[i].amount = (Math.random()*(3000-1000)).toFixed(2);
        this.payments[i].duedate = this.dueDates[this.getRandomInt(7)];
        this.payments[i].billdate = this.billDates[this.getRandomInt(7)];
        this.payments[i].billnumber = d.getTime();
      }
    }
    this.fetchingBill = false;




    
  }

  cnfsend(){
    this.billdetails=false;
    this.conf=true;
    this.billertype=false;
   
    this.reviewCard=true;
  }

  succesadd(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    this.success=true;
    this.reviewCard=false;
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
}
