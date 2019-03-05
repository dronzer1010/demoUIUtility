import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checker-payments',
  templateUrl: './checker-payments.component.html',
  styleUrls: ['./checker-payments.component.css']
})
export class CheckerPaymentsComponent implements OnInit {

  payments:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  billerlength:number=0;
  noofrole="No billers available"
  
  constructor() { }

  ngOnInit() {
    this.payments=JSON.parse(localStorage.getItem('payments'));
    console.log(this.payments)
  }

}
