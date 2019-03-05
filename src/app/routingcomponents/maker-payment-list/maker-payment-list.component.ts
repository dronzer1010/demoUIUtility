import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maker-payment-list',
  templateUrl: './maker-payment-list.component.html',
  styleUrls: ['./maker-payment-list.component.css']
})
export class MakerPaymentListComponent implements OnInit {
  display='none';
  displayBillDetails='none';
  noofrole="No billers available"
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  payments : any =[]
  constructor() { }

  ngOnInit() {
    this.payments=JSON.parse(localStorage.getItem('payments'));
  }
  openModalDialog(){
    this.display='';  //Set block css
  }
  openModalDialog1(){
    this.displayBillDetails='';  //Set block css
  }
  closeModalDialog(){
    this.display='block';//set none css after close dialog
  }
   closeModalDialog1(){
    this.displayBillDetails='block';//set none css after close dialog
  }
}
