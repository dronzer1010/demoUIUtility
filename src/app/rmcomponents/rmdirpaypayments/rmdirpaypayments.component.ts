import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import {PaymentserviceService} from '../../api/paymentservice.service'
import { DatePipe } from '@angular/common'
import {RmservicesService} from '../../api/rmservices.service'
import { ToastrService } from 'ngx-toastr'
import {saveAs as importedSaveAs} from "file-saver";
import { e } from '@angular/core/src/render3';
import {Observable} from 'rxjs/Rx';
import { Http, ResponseContentType , Headers,RequestOptions} from '@angular/http';
import {Config} from '../../config'
const path = new Config().getutilityBaseUrl();

@Component({
  selector: 'app-rmdirpaypayments',
  templateUrl: './rmdirpaypayments.component.html',
  styleUrls: ['./rmdirpaypayments.component.css']
})
export class RmdirpaypaymentsComponent implements OnInit {
  display='none';
  displayBillDetails='none';
  displayLogs='none';
  noofrole="No billers available"
  filterQuery = "";
  rowsOnPage = 2000;
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
  batchdropdownsettings = {};
  tsdddata = [];
  psdddata = [];
  batchdddata = [];
  tsselected = [];
  psselected = [];
  batchselected = [];
  apprrejpay:any=[];
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  }
  todate:Date = new Date();
  fromdate:Date = new Date();
  tofilter:Date = new Date();
  fromfilter: Date = new Date('2019-07-10 06:40:03');
  fromfilterstring:any;
  tofilterstring:any;
  filterfromdate:any;
  filtertodate:any
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
filterts:any=10;
filterps:any=10;
filterbatch:any=10;
arrayorgid:any=[];
paymentstatus:any;
selectallpara:boolean=false;
custbill_name: boolean=false;
custconsumer_name: boolean=false;
custconsumer_no: boolean=false;
custamount:  boolean=false;
custreference_no:  boolean=false;
custstatus:  boolean=false;
custpayment_status: boolean=false;
custbill_consumer_no: boolean=false;
custbill_date:  boolean=false;
custdue_date:  boolean=false;
custlocation:  boolean=false;
custbill_no:  boolean=false;
custcard_no:  boolean=false;
custmobile_no: boolean=false;
custemail:  boolean=false;
custaddress: boolean=false;
custcrn:  boolean=false;
custinitiated_by:  boolean=false;
custinitiated_at: boolean=false;
custapproved_on: boolean=false;
custcomment:  boolean=false;
custorderid:  boolean=false;
custshort_name:boolean=false;
filter:any;
totalPages:number;
startIndex:number;
endIndex:number;
pages:any;
last:number;
start:number;
paymentlist: any = [];
pageNumber:number=1;
pageSize:number=300;
totalinvoice:number=0;
currentUser :any;
rmid:number;
filtertrue:boolean=false;
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,public datepipe: DatePipe,private rmservice:RmservicesService,private toastr: ToastrService,private http: Http) { }

  ngOnInit() {
    this.getAllOrg()
    this.filterfromdate=this.fromdate
    this.filtertodate=this.todate;
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
      { item_id: 10, item_text: 'All' },
      { item_id: 1, item_text: 'Approved' },
      { item_id: 2, item_text: 'Rejected' },
      { item_id: 3, item_text: 'Pending' }
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
      { item_id: 10, item_text: 'All' },
      { item_id: 1, item_text: 'Card Debited' },
      { item_id: 2, item_text: 'Pending' },
      { item_id: 3, item_text: 'Payment Returned' },
      { item_id: 4, item_text: 'Insufficient Funds' },
      { item_id: 5, item_text: 'Card Declined' },
    ];

    this.batchdropdownsettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.batchdddata = [
      { item_id: 10, item_text: 'All' },
      { item_id: 1, item_text: 'Batch 1' },
      { item_id: 2, item_text: 'Batch 2' },
      { item_id: 3, item_text: 'Batch 3' },
      { item_id: 4, item_text: 'Batch 4' },
    
    ];

    // this.rmservice.getUserDetails().then(res => {
    //   this.currentUser = res.Data;
    //   this.rmid=this.currentUser['id']
    //   this.loadDefaultPayments(this.rmid,this.pageNumber,this.pageSize)
    //   },error=>{
    //   console.log(error)
    //   });

      this.loadFilterPayments(1300,1,300,'2020-05-01','2020-09-05','ALL',10,10,10,'DEFAULT',"0");

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
     // this.loadPayments();
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
    this.downloadArray=[];
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

  onbatchSelect(batch:any){
    console.log(batch)
    this.filterbatch=batch['item_text']
    console.log(this.filterbatch)
  }

  onpsselectall(ps:any){
    console.log(ps)
    this.filterps=ps['item_text']
    console.log(this.filterps)
  }

  getpaymentlogs(carddebittime,paystatustime,rejectreason,paymentstat){
    this.paymentstatus=paymentstat
      console.log(this.paymentstatus)
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

    loadDefaultPayments(rmid,pagenumber,pagesize){
      this.pageNumber= pagenumber
      console.log("Default Load")
     // this.spinner.show()
      //console.log(rmid+" "+pagenumber+" "+pagesize)
      this.rmservice.getdefrmpaynew(rmid,pagenumber,pagesize).then(resp=>{
      // console.log(resp['data'][0]['data'])
      this.totalinvoice=resp['data'][0]['data']['TotalCount']['TotalCount']
      //console.log(this.totalinvoice)
      // calculate total pages
      let totalPages = Math.ceil(this.totalinvoice / this.pageSize);
      // console.log(totalPages)
      // ensure current page isn't out of range
      if (this.pageNumber < 1) {
      this.pageNumber = 1;
     // this.spinner.hide()
      return;
      } else if (this.pageNumber > totalPages) {
      this.pageNumber = totalPages;
     // this.spinner.hide()
      return;
      }
      
      let startPage: number, endPage: number;
      if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
      } else {
      // more than 10 total pages so calculate start and end pages
      if (this.pageNumber <= 6) {
      startPage = 1;
      endPage = 10;
      } else if (this.pageNumber + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
      } else {
      startPage = this.pageNumber - 5;
      endPage = this.pageNumber + 4;
      }
      }
      
      // calculate start and end item indexes
      let startIndex = (this.pageNumber - 1) * this.pageSize;
      let endIndex = Math.min(startIndex + this.pageSize - 1, this.totalinvoice - 1);
      
       // create an array of pages to ng-repeat in the pager control
      let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
      this.totalPages=totalPages;
      this.start=startPage;
      this.last=endPage;
      this.startIndex=startIndex;
      this.endIndex=endIndex;
      this.pages=pages;
      //console.log(this.totalPages+" "+this.start+" "+this.last+" "+this.startIndex+" "+this.endIndex+" "+this.pages);
      // console.log(data['data']);
      this.paymentlist = resp['data'][0]['data']['PaymentData']
      //this.spinner.hide()
      // this.loaderService.display(false);
      },error=>{
      //this.spinner.hide()
      console.log("Error in fetching")
      console.log(error);
      // this.loaderService.display(false);
      })
      }

      loadFilterPayments(rmid,pagenumber,pagesize,fromdate,todate,orgid,status,paystatus,batch,utrno,amount){
        if(pagenumber==0){
        pagenumber=1;
        }
        this.pageNumber= pagenumber
        this.paymentlist= null;
        this.filtertrue=true
        if(orgid==undefined || orgid==null){
        orgid='ALL'
        }else if(orgid.includes(undefined)){
        orgid=this.removeValue(orgid,undefined)
        }
        else{
        orgid=this.removeValue(orgid,undefined)
        }
        
        if(utrno==undefined ||utrno.length<1 || utrno==null){
        utrno='DEFAULT'
        }else{
        utrno=utrno
        }
        if(amount==undefined ||amount.length<1 || amount==null){
        amount=0
        }else{
        amount=amount
        }
        console.log(orgid)
        console.log("filter true")
        
        console.log(rmid+" "+pagenumber+" "+pagesize+" "+fromdate+" "+todate+" "+orgid+" "+status+" "+paystatus+" "+batch+" "+utrno+" "+amount)
        fromdate=this.datepipe.transform(fromdate, 'yyyy-MM-dd');
        todate=this.datepipe.transform(todate, 'yyyy-MM-dd');
       // this.spinner.show()
        //console.log(rmid+" "+pagenumber+" "+pagesize)
        this.rmservice.getfilrmpaynew(rmid,pagenumber,pagesize,fromdate,todate,orgid,status,paystatus,batch,utrno,amount).then(resp=>{
        //console.log(resp['data'][0]['data']['TotalCount']['TotalCount'])
        for(let i=0;i<resp['data'].length; i++){
        this.totalinvoice=resp['data'][i]['data']['TotalCount']['TotalCount']
        }
        //console.log(this.totalinvoice)
        // calculate total pages
        let totalPages = Math.ceil(this.totalinvoice / this.pageSize);
        // console.log(totalPages)
        // ensure current page isn't out of range
        if (this.pageNumber < 1) {
        this.pageNumber = 1;
       // this.spinner.hide()
        return;
        } else if (this.pageNumber > totalPages) {
        this.pageNumber = totalPages;
        //this.spinner.hide()
        return;
        }
        
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
        } else {
        // more than 10 total pages so calculate start and end pages
        if (this.pageNumber <= 6) {
        startPage = 1;
        endPage = 10;
        } else if (this.pageNumber + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
        } else {
        startPage = this.pageNumber - 5;
        endPage = this.pageNumber + 4;
        }
        }
        
        // calculate start and end item indexes
        let startIndex = (this.pageNumber - 1) * this.pageSize;
        let endIndex = Math.min(startIndex + this.pageSize - 1, this.totalinvoice - 1);
        
         // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        this.totalPages=totalPages;
        this.start=startPage;
        this.last=endPage;
        this.startIndex=startIndex;
        this.endIndex=endIndex;
        this.pages=pages;
        //console.log(this.totalPages+" "+this.start+" "+this.last+" "+this.startIndex+" "+this.endIndex+" "+this.pages);
        console.log(resp['data']);
        this.paymentlist = resp['data'][0]['data']['PaymentData']
        //this.spinner.hide()
        // this.loaderService.display(false);
        },error=>{
        //this.spinner.hide()
        console.log("Error in fetching")
        console.log(error);
        // this.loaderService.display(false);
        })
        }

        removeValue(list, value) {
          return list.replace(new RegExp(value + ',?'), '')
        }

}
