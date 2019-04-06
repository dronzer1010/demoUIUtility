import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentListComponent implements OnInit {
  display='none';
  displayBillDetails='none';
  displayLogs='none';
  noofrole="No billers available"
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  public searchText : string;
  sortOrder = "asc";
  payments : any =[]
  paymentData: any =[];
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  todate:Date = new Date();
  fromdate:Date = new Date();
rolename:any;
key: string = 'status'; //set default
reverse: boolean = true;
  constructor() { }

  ngOnInit() {
    this.rolename=localStorage.getItem('rolename')
    this.laodpayments();

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
      allowSearchFilter: false,
      enableCheckAll:false
    };
  }
  openModalDialog(){
    this.display='block'; //Set block css
 }
  openModalDialog1(){
    this.displayBillDetails='';  //Set block css
  }
  openModalDialog2(){
    this.displayLogs='';  //Set block css
  }
  closeModalDialog(){
    this.display=''; //set none css after close dialog
  
   }
   closeModalDialog1(){
    this.displayBillDetails='block';//set none css after close dialog
  }
  closeModalDialog2(){
    this.displayLogs='block';//set none css after close dialog
  }

  onItemSelectDown(items:any){
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else{
      this.display='none';
    }
  }

  onSelectAllDown(items:any){
    console.log(items);
  }


  private laodpayments(){
    this.payments=JSON.parse(localStorage.getItem('payments'));
    for(let data of this.payments){
      var obj={
        biller:data['bill']['biller'],
        amount:data['amount'],
        consumerno:data['bill']['consumerno'],
        consumername:data['bill']['consumername'],
        status:data['status'],
        paymentstatus:data['paymentstatus'],
        shortname:data['bill']['shortname'],
        expensecode:data['bill']['expensecode'],
        billdate:data['billdate'],
        duedate:data['duedate'],
        state:data['bill']['state'],
        billnumber:data['billnumber'],
        digits:data['card']['digits'],
        contact:data['bill']['contact'],
        billaddress:data['bill']['billaddress'],
        email:data['bill']['email'],
        initiatedby:data['bill']['initiatedby'],
        initiatedon:data['bill']['initiatedon'],
        approvedby:data['approvedby'],
        approvedon:data['approvedon']

      }
      this.paymentData.push(obj)
    }
  }
}
