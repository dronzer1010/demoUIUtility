import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checker-approve-payments',
  templateUrl: './checker-approve-payments.component.html',
  styleUrls: ['./checker-approve-payments.component.css']
})
export class CheckerApprovePaymentsComponent implements OnInit {
  pendingList:boolean=true;
  approve:boolean=false;
  reject:boolean=false;
  displaydownloadlist='none';
  displayreason='none';
  displaypaydetails='none';
  constructor() { }

  ngOnInit() {
  }
  openModalDialog1(){
    this.displaydownloadlist='';  //Set block css
 }
 openModalDialog2(){
  this.displayreason='';
 }
 openModalDialog3(){     
  this.displaypaydetails='';
 }
 closeModalDialog1(){
  this.displaydownloadlist='block';//set none css after close dialog
 }
 closeModalDialog2(){
  this.displayreason='block';
 }
 closeModalDialog3(){
  this.displaypaydetails='block'; 
}
 approveBtn(){
  this.pendingList=false;
  this.approve=true;
  this.reject=false;
}
rejectBtn(){
  this.pendingList=false;
  this.approve=false;
  this.reject=true;
}
viewBtn(){
  this.pendingList=true;
  this.approve=false;
  this.reject=false;
}
}
