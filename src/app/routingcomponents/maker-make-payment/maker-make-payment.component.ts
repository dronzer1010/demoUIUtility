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
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('./assets/states.json').subscribe(
      data=>{
        this.states=data;
      }
    )
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


      return payment;
    })

    console.log(this.payments);

  
  }

  cnfsend(){
    this.billdetails=false;
    this.conf=false;
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
