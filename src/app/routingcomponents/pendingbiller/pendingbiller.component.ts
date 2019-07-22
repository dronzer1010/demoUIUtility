import { Component, OnInit,Inject } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-pendingbiller',
  templateUrl: './pendingbiller.component.html',
  styleUrls: ['./pendingbiller.component.css']
})
export class PendingBillerComponent implements OnInit {
  select=false;
  display='none';
  pendingList:boolean=true;
  approve:boolean=false;
  reject:boolean=false; 
  displaydownloadlist='none';
  displayreason='none';
  displaypaydetails='none';
  billdata:any=[];
  pendingbillers:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  billerlength:number=0;
  public checkedValueArray: any = [];
  public temp: any;
  public cntChk: any;
  public flag: any;
  selectall:boolean=false;
  selectallbiller:boolean=false;
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  todate:Date = new Date();
fromdate:Date = new Date();
  noofrole="No bills available"
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'MM-yyyy',
    defaultOpen: false,
    enableCheckAll:false
  }
  public searchText : string;
  downloadArray:any=[];
  checkbills:any;
  rejectcomnt:any;
  constructor(private router : Router , private aRouter : ActivatedRoute,private excelservice : ExcelService,private billservice:BillerserviceService,private loaderService: LoaderService,private toastr: ToastrService) { }

  
  ngOnInit() {
    this.loadPendingbills()
    // this.aRouter.queryParams
    // .filter(params => params.otp)
    // .subscribe(params => {
    //   console.log(params);
    //   if(params.otp && params.otp == 'success'){
    //     this.pendingList=false;
    //     this.approve=true;
    //     this.reject=false;
    //   }
    // });
    //this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    //console.log(this.billdata)

    //this.pendingbillers = this.billdata.filter((data)=>data['status']=='Pending with checker');
    if(this.pendingbillers==null){
      this.billerlength=0
      this.noofrole="No bills available"
    }else{
      this.billerlength=this.pendingbillers.length;
      if(this.billerlength>1){
        this.noofrole="No of Bills:"
      }else{
        this.noofrole="No of Bill:"
      }
    }

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

  changeAll(pendingbillerpage): void {
    
    if(this.checkedValueArray.length==this.pendingbillers.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.cntChk=0
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
      if(this.checkedValueArray.length<this.pendingbillers.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)
     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.pendingbillers.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)
     
    }
    console.log(this.checkedValueArray)
  }
  onItemSelectDown(items:any){
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.pendingbillers){
        var obj={
          Biller:data['biller_name'],
          Consumer_No:data['consumer_no'],
          Status:data['status'],
          Short_Name:data['short_name'],
          GL_Expense_Code:data['gl_expense_code'],
          Bill_Date:data['bill_date'],
          Due_Date:data['due_date'],
          State:data['state'],
          Contact:data['contact_no'],
          Bill_Address:data['contact_address'],
          Email:data['email'],
          Initiated_by:data['created_by'],
          Initiated_On:data['created_on'],
         
  
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'Biller List');
    }
  }

  onSelectAllDown(items:any){
    console.log(items);
  }

  openModalDialog(){
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display=''; //set none css after close dialog
 }
 closeModalDialog2(){
  this.displayreason='block';
 }
openModalDialog2(){
this.displayreason='';
}
 approveBtn(){
  
  var bills =JSON.parse(localStorage.getItem('billdetails'));

  // for(var i=0;i<this.checkedValueArray.length;i++){
  //   for(var j=0;j<bills.length;j++){


  //     if(this.checkedValueArray[i]==parseInt(bills[j]['id'])){
       
  //       bills[j]['status']="Approved"
  //       bills[j]['approvedby']="Ms. Deepali Patekar"
  //       var d =new Date();
  //       bills[j]["approvedon"] = d.toLocaleString();
  //     }
  //   }
  // }
  // this.billdata=bills;
  // console.log(this.billdata)
  // localStorage.setItem('billdetails', JSON.stringify(this.billdata));
  this.pendingList=false;
  this.approve=false;
  this.reject=false;
  console.log(this.checkedValueArray)
  localStorage.setItem('selectedBillers' , JSON.stringify(this.checkedValueArray));
  this.router.navigate(['main/otp-approve-biller']);

}
rejectBtn(){

  var rejectdata={
    "bill_id":this.checkedValueArray,
    "comment":this.rejectcomnt,
    "count":this.checkedValueArray.length
  }
  //console.log(rejectdata)
  console.log(JSON.stringify(rejectdata))
  this.billservice.rejectbills(rejectdata).then(resp=>{
    console.log(resp)
    this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'billreject'}});
  },error=>{
    console.log(error)

  })
  
}

private loadPendingbills(){
  this.loaderService.display(true)
this.billservice.getPendingbillers().then(resp=>{
  console.log(JSON.stringify( resp['bills']));
  this.pendingbillers=resp;
  if(this.pendingbillers==null){
    this.billerlength=0
    this.noofrole="No bills available"
    this.loaderService.display(false)
  }else{
    this.billerlength=this.pendingbillers.length;
    if(this.billerlength>1){
      this.noofrole="No of Bills:"
    }else{
      this.noofrole="No of Bill:"
    }
  }
  this.loaderService.display(false)
},error=>{
  console.log(error)
  this.loaderService.display(false)
})
}

gotoOTP(): void {
  if (this.temp == true) {

    this.router.navigate(['/main/otp-approve-biller', JSON.stringify(this.checkedValueArray)]);
  } else {
    this.toastr.warning("Please select atleast one bill!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }

}
  

}

