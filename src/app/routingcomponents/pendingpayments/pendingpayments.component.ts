import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TooltipModule } from 'ng2-tooltip-directive';

@Component({
  selector: 'app-pendingpayments',
  templateUrl: './pendingpayments.component.html',
  styleUrls: ['./pendingpayments.component.css']
})
export class PendingPaymentsComponent implements OnInit {
  pendingList:boolean=true;
  approve:boolean=false;
  reject:boolean=false;
  display:string='none'
  searchText:string
  displaypopup='none';
  displayreason='none';
  displaypaydetails='none';
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  billerlength:number=0;
  noofrole="No billers available"
  payments:any=[]
  pendingPayments:any = []
  paymentData:any=[];
  public checkedValueArray: any = [];
  selectall:boolean=false;
  public temp: any;
  public cntChk: any;
  public flag: any;
  select=false;
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  amountpay:any=0;
  totalamount:any=0
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  todate:Date = new Date();
  fromdate:Date = new Date();
  constructor(private router:Router , private aRouter : ActivatedRoute) { }

  ngOnInit() {
    this.loadPayments()

    this.aRouter.queryParams
      .filter(params => params.otp)
      .subscribe(params => {
        console.log(params);
        if(params.otp && params.otp == 'success'){
          this.pendingList=false;
          this.approve=true;
          this.reject=false;
        }
      });

 

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
  openModalDialog1(){
    this.displaypopup='';  //Set block css
 }
 openModalDialog2(){
  this.displayreason='';
 }
 openModalDialog3(){     
  this.displaypaydetails='';
 }
 closeModalDialog1(){
  this.displaypopup='block';//set none css after close dialog
 }
 closeModalDialog2(){
  this.displayreason='block';
 }
 closeModalDialog3(){
  this.displaypaydetails='block'; 
}

closeModalDialog(){
  this.display=''; //set none css after close dialog

 }
 openModalDialog(){
  this.display='block'; //Set block css
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
 approveBtn(){
  this.pendingList=false;
  this.approve=false;
  this.reject=false;
  
  localStorage.setItem('selectedPayments' , JSON.stringify(this.checkedValueArray));
  this.router.navigate(['main/otp-approve-payment'])

  // for(var i=0;i<this.checkedValueArray.length;i++){
  //   for(var j=0;j<this.payments.length;j++){
  //     if(this.checkedValueArray[i] ==  this.payments[j].id){
  //       this.payments[j].status ="Approved"
  //     }
  //   }

  //   localStorage.setItem('payments' , JSON.stringify(this.payments));
  // }
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





changeAll(pendingbillerpage): void {
    
  if(this.checkedValueArray.length==this.payments.length){
  this.cntChk=1
  this.amountpay=0
  }else{
  this.checkedValueArray = [];
  this.cntChk=0
  this.amountpay=this.totalamount;
  }
  console.log(this.selectall)
  if (this.cntChk == 0) {
    this.cntChk = 1;
    this.temp = true;
    this.selectall=true;
    this.select=true;
    for (var i = 0; i < pendingbillerpage.length; i++) {
      this.checkedValueArray[i] = pendingbillerpage[i].id;
    }
    this.cntChk = 0;
  }
 
  else {
    this.cntChk = 0;
    this.temp = false;
    this.checkedValueArray = [];
    this.select=false;
  }
  console.log(this.checkedValueArray)
  
}

change(id): void {
  this.flag = 0;
  for (var i = 0; i < this.checkedValueArray.length; i++) {
    if (this.checkedValueArray[i] == id) {
      this.checkedValueArray.splice(i, 1);
      this.flag = 1;
    }
  }
  if (this.flag == 0) {
    this.checkedValueArray.push(id);
   
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
}

private loadPayments(){
  this.payments=JSON.parse(localStorage.getItem('payments'));
  this.pendingPayments = this.payments.filter((payment)=>{
    return (payment.status == "Pending")
  })

  for(let data of this.pendingPayments){
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
for(var total of this.paymentData){
  this.totalamount+=parseFloat(total['amount'])
}
}
}
