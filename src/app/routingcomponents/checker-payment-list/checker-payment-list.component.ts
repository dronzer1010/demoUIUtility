import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checker-payment-list',
  templateUrl: './checker-payment-list.component.html',
  styleUrls: ['./checker-payment-list.component.css']
})
export class CheckerPaymentListComponent implements OnInit {
  display='none';
  displayBillDetails='none';
  constructor() { }

  ngOnInit() {
  }
  openModalDialog(){
    this.display=''; //Set block css
  }
  openModalDialog1(){
    this.displayBillDetails=''; //Set block css
  }

  closeModalDialog(){
    this.display='block'; //set none css after close dialog
  }
  closeModalDialog1(){
    this.displayBillDetails='block'; //set none css after close dialog
  }
}
