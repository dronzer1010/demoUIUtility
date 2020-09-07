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
import { repeat } from 'rxjs/operators';
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
  fromfilter: Date = new Date('2020-04-01 00:00:00');
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
pageSize:number=1000;
totalinvoice:number=0;
currentUser :any;
rmid:number;
filtertrue:boolean=false;
grouplength:number;
orgpara:string='ALL'
tstatuspara:number=10
pstatuspara:number=10
batchpara:number=10
utrpara:string='DEFAULT'
amountpara:string='0'
fromdatepara:string;
todatepara:string;
Organisation: any = [];
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,public datepipe: DatePipe,private rmservice:RmservicesService,private toastr: ToastrService,private http: Http) { }

  ngOnInit() {
    this.getAllOrg()
    this.filterfromdate=this.fromdate
    this.filtertodate=this.todate;
    this.fromdatepara=this.datepipe.transform(this.fromfilter, 'yyyy-MM-dd');
    this.todatepara=this.datepipe.transform(this.tofilter, 'yyyy-MM-dd');
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

    this.rmservice.getUserDetails().then(res => {
      this.currentUser = res.Data;
      this.rmid=this.currentUser['id']
      this.loadDefaultPayments(this.rmid,this.pageNumber,this.pageSize)
      },error=>{
      console.log(error)
      });

    //  this.loadFilterPayments(1300,1,300,'2020-05-01','2020-09-05','ALL',10,10,10,'DEFAULT',"0");

  }

  

  private getAllOrg(){
    this.rmservice.getAllOrganizations().then(resp => {
      this.organisationlist = resp.data;
     // console.log(this.organisationlist);
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
     // console.log(this.organisationid)
     
    });
   // console.log(this.orglist)
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
      for(let data of this.paymentlist){
        var obj={
          UtilityName:data['utilityname'],
          Biller:data['billername'],
          Amount:data['amount'],
          Consumer_No:data['consumerno'],
          Consumer_Name:data['orgname'],
          CRN:data['crn'],
          Status:data['transstatus'],
          Payment_Status:data['paymentstatus'],
          CardDebiteddate:data['carddebiteddate'],
          CardDebitedtime:data['carddebitedtime'],
          CuttOffdate:data['cutoffdate'],
          CutOffTime:data['cutofftime'],
          // GL_Expense_Code:data['gl_expense_code'],
          Bill_Date:data['billdate'],
          Due_Date:data['duedate'],
          Bill_Number:data['billnumber'],
          State:data['statename'],
          Card_Number:data['cardno'],
          // Contact:data['contact_no'],
          // Email:data['email'],
          Account_No:data['accountno'],
          Bank_Name:data['bankname'],
          Branch_Name:data['branchname'],
          IFSC:data['ifsc'],
          UTR:data['utr'],
          UTRDate:data['utrdate'],
          UTRTime:data['utrtime'],
          RefundReason:data['refundreason'],
          Reference_No_1:data['bucode_buname'],
          Reference_No_2:data['circle'],
          //Comment:data['']
          // Initiated_by:data['initiated_by'],
          Initiated_On:`${data['initiateddate']}|${data['initiatedtime']}`,
          UploadFileName:data['uploadfilename']
       
  
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'Direct Payment List');
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
//console.log(this.selectedItems3)
    this.filterorgid = this.selectedItems3.map(function(val) {
      return val.OrgId;
    })
    this.orgpara=this.filterorgid.toString()
   // console.log(this.orgpara)
  }

  onItemDeSelect(org:any){
    this.filterorgid.pop(org) 
    this.orgpara=this.filterorgid.toString()
   // console.log(this.orgpara)
  }

  onSelectAllOrg(org:any){
    //console.log(org)
    this.filterorgid = org.map(function(val) {
      return val.OrgId;
    })
   
    this.orgpara=this.filterorgid.toString()
   // console.log(this.orgpara)
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
    if(this.filterts=='Approved'){
      this.tstatuspara=1
    }else if(this.filterts=='Pending'){
      this.tstatuspara=2
    }else if(this.filterts=='Rejected'){
      this.tstatuspara=0
    }else{
      this.tstatuspara=10
    }
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
    if(this.filterps=='Card Debited'){
      this.tstatuspara=1
    }else if(this.filterps=='Pending'){
      this.tstatuspara=2
    }else if(this.filterps=='Payment Returned'){
      this.tstatuspara=3
    }else if(this.filterps=='Insufficient Funds'){
      this.tstatuspara=4
    }else if(this.filterps=='Card Declined'){
      this.tstatuspara=5
    }else{
      this.tstatuspara=10
    }
  }

  onbatchSelect(batch:any){
    console.log(batch)
    this.filterbatch=batch['item_text']
    console.log(this.filterbatch)
    if(this.filterbatch=='Batch 1'){
      this.tstatuspara=1
    }else if(this.filterbatch=='Batch 2'){
      this.tstatuspara=2
    }else if(this.filterbatch=='Batch 3'){
      this.tstatuspara=3
    }else if(this.filterbatch=='Batch 4'){
      this.tstatuspara=4
    }else{
      this.tstatuspara=10
    }
  }

  onpsselectall(ps:any){
    console.log(ps)
    this.filterps=ps['item_text']
    console.log(this.filterps)
  }

  sendPaymentStatus(debiteddate: string, debitedtime: string, paystatus: string, dateutr: string, timeutr: string, utrno: string,refundreason:string) {
    this.displayLogs='block';
   
    if (paystatus == 'Insufficient Funds' || paystatus == 'Card Declined' || paystatus == 'Pending' || paystatus == 'E009-Invalid Cardnumber' || paystatus == 'ERROR' || paystatus == 'REJECT') {
      this.carddebitdate = "--";
      this.carddebittime = "--";
    } else {
      this.carddebitdate = debiteddate;
      this.carddebittime = debitedtime;
    }
    if (utrno != 'NA' && paystatus != 'Payment Returned') {
      this.paysuccessdate = dateutr;
      this.paysuccesstime = timeutr;
    } else {
      this.paysuccessdate = "--";
      this.paysuccesstime = "--";
    }
    if (paystatus == 'Payment Returned') {
      this.payfaildate = dateutr;
      this.payfailtime = timeutr;
      this.rejectreason = refundreason
    } else {
      this.payfaildate = "--";
      this.payfailtime = "--";
      this.rejectreason = "--"
    }
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
      // console.log(this.paymentlist);
      this.paymentlist = resp['data'][0]['data']['PaymentData']
       console.log(this.paymentlist);
       if(this.paymentlist!=null){
        for(var total of this.paymentlist){
          this.totalamount+=parseFloat(total['amount'])
        }
      }
      //this.spinner.hide()
      // this.loaderService.display(false);
      },error=>{
      //this.spinner.hide()
      console.log("Error in fetching")
      console.log(error);
      // this.loaderService.display(false);
      })
      }

      loadFilterPayments(rmid,pagenumber,pagesize){
        if(pagenumber==0){
        pagenumber=1;
        }
        this.pageNumber= pagenumber
        this.paymentlist= [];
        this.totalamount=0;
        this.filtertrue=true
        if(this.orgpara.length<=0){
        this.orgpara='ALL'
        }else{
          this.orgpara=this.orgpara
        }
        
        if(this.utrpara.length<=0){
          this.utrpara='DEFAULT'
        }else{
          this.utrpara=this.utrpara
        }
        if(this.amountpara.length<=0){
          this.amountpara='0'
        }else{
          this.amountpara='0'
        }
       // console.log("filter true")
        
        
        this.fromdatepara=this.datepipe.transform(this.fromfilter, 'yyyy-MM-dd');
        this.todatepara=this.datepipe.transform(this.tofilter, 'yyyy-MM-dd');
       // this.spinner.show()
        //console.log(rmid+" "+pagenumber+" "+pagesize)
       // console.log(rmid+" "+pagenumber+" "+pagesize+" "+this.fromdatepara+" "+this.todatepara+" "+this.orgpara+" "+this.tstatuspara+" "+this.pstatuspara+" "+this.batchpara+" "+this.utrpara+" "+this.amountpara)
        this.rmservice.getfilrmpaynew(rmid,pagenumber,pagesize,this.fromdatepara,this.todatepara,this.orgpara,this.tstatuspara,this.pstatuspara,this.batchpara,this.utrpara,this.amountpara).then(resp=>{
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
      
        this.paymentlist = resp['data'][0]['data']['PaymentData']
        if(this.paymentlist!=null){
          for(var total of this.paymentlist){
            this.totalamount+=parseFloat(total['amount'])
          }
        }
        console.log(this.paymentlist);
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

        loadPayLogs(id:number,index){
          this.selectedIndex = index;
         
         this.paymentservice.paylogsNew(id).then(resp=>{
          this.approverDetails=resp['data']
         // console.log(this.approverDetails)
          for(let data of this.approverDetails)
          this.grouplength= data['group'].length;
          
         },error=>{
           console.log(error)
         })
        }

}
