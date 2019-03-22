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
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
rolename:any;
  constructor() { }

  ngOnInit() {
    this.rolename=localStorage.getItem('rolename')
    this.payments=JSON.parse(localStorage.getItem('payments'));

    this.dropdownList = [
      { item_id: 1, item_text: 'Today' },
      { item_id: 2, item_text: 'This Week' },
      { item_id: 3, item_text: 'This Month' },
      { item_id: 4, item_text: 'This Year' }
    ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownCat = [
      { item_id: 1, item_text: 'Electricity' }
    ];
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.dropdownDownload = [
      { item_id: 1, item_text: 'Standard List' },
      { item_id: 2, item_text: 'Customise List' }
    ];
   
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
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
