import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import {PaymentserviceService} from '../../api/paymentservice.service'
import { DatePipe } from '@angular/common'
import {RmservicesService} from '../../api/rmservices.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-rmpayments',
  templateUrl: './rmpayments.component.html',
  styleUrls: ['./rmpayments.component.css']
})
export class RmpaymentsComponent implements OnInit {
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
  selectedItems3 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  dropdownSettings3 = {};
  tsdropdownsettings = {};
  psdropdownsettings = {};
  tsdddata = [];
  psdddata = [];
  tsselected = [];
  psselected = [];
  apprrejpay:any=[];
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'MM-yyyy',
    defaultOpen: false
  }
  todate:Date = new Date();
  fromdate:Date = new Date();
rolename:any;
key: string = 'status'; //set default
reverse: boolean = true;
totalamount:any=0;
downloadArray:any=[];
approverDetails:any=[];
selectedIndex = -1;
userdata:any={};
latecharges:string;
remarks:string;
incentives:string;
meterreading:string;
carddebittime:string;
carddebitdate:string;
paysuccessdate:string;
paysuccesstime:string;
payfaildate:string;
payfailtime:string;
rejectreason:string;
organisationlist:any=[];
orglist:any=[];
orglistsetting:any={};
payparams:any={};
organisationid:any=[];
filterorgid:any=[];
filterinterval:any="0";
filtercategory:any="6f6af57a-5c48-442e-b5b8-8b3559b10cd9";
filterts:any="0";
filterps:any="0";
arrayorgid:any=[];
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,public datepipe: DatePipe,private rmservice:RmservicesService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllOrg()
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'OrgId',
      textField: 'CompanyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll:true
    };
    this.dropdownList = [
      { item_id: 0, item_text: 'All' },
      { item_id: 1, item_text: 'Today' },
      { item_id: 2, item_text: 'This Week' },
      { item_id: 3, item_text: 'This Month' },
      { item_id: 4, item_text: 'This Year' }
    ];
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };
    this.dropdownCat = [
      { item_id: "6f6af57a-5c48-442e-b5b8-8b3559b10cd9", item_text: 'Electricity' }
    ];
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      enableCheckAll:false
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

    this.tsdropdownsettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.tsdddata = [
      { item_id: 1, item_text: 'All' },
      { item_id: 2, item_text: 'Approved' },
      { item_id: 3, item_text: 'Rejected' },
      { item_id: 4, item_text: 'Pending' }
    ];

    this.psdropdownsettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.psdddata = [
      { item_id: 1, item_text: 'All' },
      { item_id: 2, item_text: 'Card Debited' },
      { item_id: 3, item_text: 'Pending' },
      { item_id: 4, item_text: 'Payment Success' },
      { item_id: 5, item_text: 'Payment Failed' },
      { item_id: 6, item_text: 'Rejected' },
      { item_id: 7, item_text: 'Insufficient funds' },
    ];

    
  }

  private getAllOrg(){
    this.rmservice.getAllOrganizations().then(resp => {
      this.organisationlist = resp.data;
      console.log(this.organisationlist);
      for(var data of this.organisationlist){
        var obj={
          OrgId:data['OrgId'],
          CompanyName:data['CompanyName']
        }
        this.orglist.push(obj)
      }
      for(var data of this.organisationlist){
        var obj1={
          OrgId:data['OrgId']
        
        }
        this.organisationid.push(obj1)
      }
      this.loadPayments();
      console.log(this.organisationid)
     
    });
    console.log(this.orglist)
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
          Initiated_On:data['initiated_date'],
       
  
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'Payment List');
    }
  }

  onIntervalSelect(interval:any){
    console.log(interval)
  this.filterinterval=interval['item_id']
    console.log(this.filterinterval)
  }

  onCatSelect(cat:any){
    console.log(cat);
    // this.filtercategory = cat.map(function(val) {
    //   return val.item_id;
    // }).join(',');
    this.filtercategory=cat['item_id']
    console.log(this.filtercategory)
  }

  onOrgSelect(org:any){

  
console.log(this.selectedItems3)
    this.filterorgid = this.selectedItems3.map(function(val) {
      return val.OrgId;
    })

  
    console.log(this.filterorgid)
  }

  onItemDeSelect(org:any){
    this.filterorgid.pop(org)
    console.log(this.filterorgid)
  }

  onSelectAllOrg(org:any){
   
    console.log(org)
    this.filterorgid = org.map(function(val) {
      return val.OrgId;
    })
    console.log(this.filterorgid)
  }

  onSelectAllCat(cat:any){
    console.log(cat)
    // this.filtercategory = cat.map(function(val) {
    //   return val.item_id;
    // }).join(',');
    this.filtercategory=cat['item_id']
    console.log(this.filtercategory)
  }

  onSelectAllDown(items:any){
    console.log(items);
  }

  ontsselect(ts:any){
    console.log(ts)
    // this.filterts = ts.map(function(val) {
    //   return val.item_text;
    // }).join(',');
    this.filterts=ts['item_text']
    console.log(this.filterts)
  }

  ontsselectall(ts:any){
    console.log(ts)
    this.filterts=ts['item_text']
    console.log(this.filterts)
  }

  onpsSelect(ps:any){
    console.log(ps)
    this.filterps=ps['item_text']
    console.log(this.filterps)
  }

  onpsselectall(ps:any){
    console.log(ps)
    this.filterps=ps['item_text']
    console.log(this.filterps)
  }

  getapproverdetails(id,index){
    this.selectedIndex = index;
    this.paymentservice.paylogs(id).then(resp=>{
      console.log(resp)
      this.approverDetails=resp['data']
      console.log(this.approverDetails)
    },error=>{
      console.log(error)
    })

  }

  getextradetails(latepaycharge,incentives,remarks,meterreading){
    this.displayBillDetails='block';
    if(latepaycharge!=null)
    this.latecharges=latepaycharge;
    else
    this.latecharges="--";
    if(incentives!=null)
    this.incentives=incentives;
    else
    this.incentives="--"
    if(remarks!=null)
    this.remarks=remarks
    else
    this.remarks="--"
    if(meterreading)
    this.meterreading=meterreading;
    else
    this.meterreading="--"
}

getfilterdata(){
  this.loaderService.display(true);

  if(this.filterps=='All')
  this.filterps="0"
  if(this.filterts=='All')
  this.filterts="0"
  this.payparams={
    "org_ids":this.filterorgid,
    "interval":this.filterinterval,
    "payment_status":this.filterps,
    "transaction_status":this.filterts,
    "category":this.filtercategory
  }
  this.rmservice.getAllPayments(this.payparams).then(resp=>{
   
    console.log(resp)
    this.paymentData=resp['data']
    this.loaderService.display(false);
  },error=>{
    console.log(error)
    this.loaderService.display(false);
    if(error['error']['msg']=='Payment not found'){
      this.toastr.error("Payment not found!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  })
}

getpaymentlogs(carddebittime,paystatustime,rejectreason){
  console.log(paystatustime)
  this.displayLogs='block';
  if(carddebittime!=null){
    carddebittime=this.datepipe.transform(carddebittime, 'M/d/yy, h:mm a');
    console.log(carddebittime)
 var crddate = carddebittime.split(", ")[0];
 var crdtime= carddebittime.split(", ")[1];
   // var crddate1 = crddate
    this.carddebitdate=crddate;
    //this.carddebittime=this.datepipe.transform(crdtime, 'h:mm a');;
    this.carddebittime=crdtime
    console.log(this.carddebittime)
    
  }else{
    this.carddebitdate="--"
    this.carddebittime="--"
  }
  if(paystatustime!=null){
    paystatustime=this.datepipe.transform(paystatustime, 'M/d/yy, h:mm a');
    var psdate = paystatustime.split(", ")[0];
    var pstime= paystatustime.split(", ")[1];
    this.paysuccessdate=psdate;
    //this.carddebittime=this.datepipe.transform(crdtime, 'h:mm a');;
    this.paysuccesstime=pstime
     }else{
       this.paysuccessdate="--"
       this.paysuccesstime="--"
     }
     if(rejectreason!=null || rejectreason!=undefined){
       this.rejectreason=rejectreason;
     }else{
       this.rejectreason="--"
     }
}

private loadPayments(){
  this.loaderService.display(true);
  console.log(this.organisationid)
  this.filterorgid = this.organisationid.map(function(val) {
    return val.OrgId;
  })
  console.log(this.filterorgid)
  this.payparams={
    "org_ids":this.filterorgid,
    "interval":"0",
    "payment_status":"0",
    "transaction_status":"0",
    "category":"6f6af57a-5c48-442e-b5b8-8b3559b10cd9"
  }
  this.rmservice.getAllPayments(this.payparams).then(resp=>{
    console.log(resp)
    this.paymentData=resp['data']
    if(this.paymentData!=null){
      for(var total of this.paymentData){
        this.totalamount+=parseFloat(total['amount'])
      }
    }
    this.loaderService.display(false);
  },error=>{
    console.log(error)
    this.loaderService.display(false);
  })
}





}
