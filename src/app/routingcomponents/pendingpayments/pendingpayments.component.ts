import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TooltipModule } from 'ng2-tooltip-directive';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import {PaymentserviceService} from '../../api/paymentservice.service'
import { ToastrService } from 'ngx-toastr'
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
  public cntChk: any=0;
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
  downloadArray:any=[];
  approverDetails:any=[];
selectedIndex = -1;
userdata:any={};
rolename:any;
  constructor(private router:Router , private aRouter : ActivatedRoute,private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserDetail();
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
  }else if(items['item_id']==1){
    for(let data of this.paymentData){
      var obj={
        Biller:data['biller_name'],
        Amount:data['amount'],
        Consumer_No:data['consumer_no'],
        Consumer_Name:data['consumer_name'],
        Status:data['transaction_status'],
        Payment_Status:data['payment_status'],
        Short_Name:data['short_name'],
        GL_Expense_Code:data['gl_expense_code'],
        Bill_Date:data['bill_date'],
        Due_Date:data['due_date'],
        State:data['state'],
        Bill_Number:String(data['bill_number']),
        Card_Number:data['card_last_digits'],
        Order_Id:data['order_id'],
        Contact:data['contact_no'],
        Bill_Address:data['contact_address'],
        Email:data['email'],
        CRN:data['transaction_ref_no'],
        Initiated_by:data['initiated_by'],
        Initiated_On:data['initiated_date']

      }
      this.downloadArray.push(obj)
    }
    this.excelservice.exportAsExcelFile( this.downloadArray, 'Payment List');
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


checkall(pendingbillerpage):void{
  console.log(this.checkedValueArray.length)
if(this.checkedValueArray.length==this.paymentData.length){
  this.selectall=false;
  this.select=false;
  this.checkedValueArray=[];
  this.amountpay=0
}else if(this.checkedValueArray.length>0 && this.checkedValueArray<this.paymentData){
  this.selectall=true;
  this.temp = true;
  this.amountpay=this.totalamount
 this.checkedValueArray=[];
 this.select=true;
    for (var i = 0; i < pendingbillerpage.length; i++) {
      this.checkedValueArray[i] = pendingbillerpage[i].id;
    }
  
}else if(this.checkedValueArray.length==0){
  this.selectall=true;
  this.temp = true;
  this.amountpay=this.totalamount
  this.select=true;
  for (var i = 0; i < pendingbillerpage.length; i++) {
    this.checkedValueArray[i] = pendingbillerpage[i].id;
  }
}
console.log(this.checkedValueArray)
}

changeAll(pendingbillerpage): void {
    console.log(this.cntChk)
    console.log(pendingbillerpage);
  if(this.checkedValueArray.length==this.paymentData.length){
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
    this.amountpay=this.totalamount;
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
  for(var i=0;i<this.paymentData.length;i++){
    if(this.paymentData[i]['id'] == id){
      if(this.flag==0){
        this.amountpay+=parseInt(this.paymentData[i]['amount'])
      }else{
        this.amountpay-=parseInt(this.paymentData[i]['amount'])
      }
    }
  }

  if (this.checkedValueArray.length > 0) {
    this.temp = true;
    if(this.checkedValueArray.length<this.paymentData.length){
      this.selectall=false
    }else{
      this.selectall=true;
      this.cntChk = 1;
    }
    console.log(this.selectall)
   
  }
  else {
    this.temp = false;
    if(this.checkedValueArray.length<this.paymentData.length){
      this.selectall=false
    }else{
      this.selectall=true;
    }
    console.log(this.selectall)
   
  }
  console.log(this.checkedValueArray)
}

private loadPayments(){
  this.loaderService.display(true)
  this.paymentservice.getPendingPayments().then(resp=>{
    console.log(resp)
    this.paymentData=resp['data'];
    this.loaderService.display(false)
    for(var total of this.paymentData){
      this.totalamount+=parseFloat(total['amount'])
    }
  },error=>{
    this.loaderService.display(false)
    console.log(error)
  })

 

console.log(this.totalamount)
}

getpaylogs(id,index){
  this.selectedIndex = index;
  this.paymentservice.paylogs(id).then(resp=>{
    console.log(resp)
    this.approverDetails=resp
  },error=>{
    console.log(error)
  })

}

private getUserDetail(){
  this.userservice.getUserDetails().subscribe(res=>{
    //console.log(res)
    this.userdata=res['Data'];
    console.log(this.userdata)
    this.rolename=this.userdata['dualrole']
   // this.username=this.userdata['firstname']+" "+this.userdata['lastname']
  },error=>{
    console.log(error)
  })
    }

    gotoOTP(): void {
      if (this.temp == true) {
    
        this.router.navigate(['/main/otp-approve-payment', JSON.stringify(this.checkedValueArray)]);
      } else {
        this.toastr.warning("Please select atleast one Payment!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    
    }
}
