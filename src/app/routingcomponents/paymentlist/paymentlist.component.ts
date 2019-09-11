import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import {PaymentserviceService} from '../../api/paymentservice.service'
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import {AuthService} from '../../api/auth.service';
import {Config} from '../../config'
const path = new Config().getutilityBaseUrl();
import {saveAs as importedSaveAs} from "file-saver";
import { e } from '@angular/core/src/render3';
import {Observable} from 'rxjs/Rx';
import { Http, ResponseContentType , Headers,RequestOptions} from '@angular/http';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
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
  pendingpaymentdata:any=[]
  successpaymentData:any=[]
  failedpaymentdata:any=[]
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
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
  fromfilter: Date = new Date();
  filterfromdate:any;
  filtertodate:any
  fromfilterstring:any;
  tofilterstring:any;
rolename:any;
key: string = 'status'; //set default
reverse: boolean = true;
totalamount:any=0;
successtotalamount:any=0;
failedtotalamount:any=0;
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
deletemodal:string='none';
deleteid:any;
filterinterval:any="0";
filtercategory:any="6f6af57a-5c48-442e-b5b8-8b3559b10cd9";
filterts:any="0";
filterps:any="0";
tsdropdownsettings = {};
psdropdownsettings = {};
tsdddata = [];
psdddata = [];
tsselected = [];
psselected = [];
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
organization_id:any;
apprcrd:boolean=true;
rejcrd:boolean=false;
pencrd:boolean=false;
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,public datepipe: DatePipe,private toaster:ToastrService,private auth: AuthService,private http: Http) { }

  ngOnInit() {
    //this.rolename=localStorage.getItem('rolename')
    this.getUserDetail();
    this.laodpayments();
    this.filterfromdate=this.fromdate
    this.filtertodate=this.todate;
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
      allowSearchFilter: false,
      enableCheckAll:false
    };
    this.dropdownDownload = [
      { item_id: 1, item_text: 'Standard List' },
      { item_id: 2, item_text: 'Customise List' }
    ];
   
    this.dropdownSettings = {
      singleSelection: true,
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

  ontsselect(ts:any){
    console.log(ts)
    if(ts['item_text']=='All')
    this.filterts="0"
    else
    this.filterts=ts['item_text']
    console.log(this.filterts)
  }

  
  onpsSelect(ps:any){
    console.log(ps)
    if(ps['item_text']=='All')
    this.filterps="0"
    else
    this.filterps=ps['item_text']
    console.log(this.filterps)
  }

  onItemSelectDown(items:any){
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.pendingpaymentdata){
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

  onItemSelectDown1(items:any){
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.successpaymentData){
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

  onItemSelectDown2(items:any){
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.failedpaymentdata){
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

  onSelectAllDown(items:any){
    console.log(items);
  }


  private laodpayments(){
  //   this.payments=JSON.parse(localStorage.getItem('payments'));
  //   if(this.rolename=='maker' || this.rolename=='ccmaker' || this.rolename=='as'){
  //   this.apprrejpay=this.payments.filter((payment)=>{
  //     return (payment.status == "Approved" || payment.status == "Rejected"  || payment.status == "Pending")
  //   })
  // }else if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
  //   this.apprrejpay=this.payments.filter((payment)=>{
  //     return (payment.status == "Approved" || payment.status == "Rejected")
  //   })
  // }
   

    // for(var total of this.paymentData){
    //     this.totalamount+=parseFloat(total['amount'])
    // }
    //console.log(this.totalamount)
    this.loaderService.display(true)
this.paymentservice.getAllPayments().then(resp=>{
  console.log(resp)
  this.paymentData=resp['data'];
  console.log(this.paymentData)
  this.loaderService.display(false)
  if(this.paymentData!=null){
  // for(var total of this.paymentData){
  //   this.totalamount+=parseFloat(total['amount'])
  // }
  for(let i = 0; i < this.paymentData.length; i++){
    if(this.paymentData[i].payment_status == "Pending" || this.paymentData[i].payment_status == "Card Debited" || this.paymentData[i].payment_status == "In Process" || this.paymentData[i].payment_status == "REJECT" || this.paymentData[i].payment_status == "ERROR" || this.paymentData[i].payment_status == "Unspecified Failure"){
        this.pendingpaymentdata.push(this.paymentData[i]);
        this.totalamount+=parseFloat(this.paymentData[i]['amount'])
    }
}
  for(let i = 0; i < this.paymentData.length; i++){
    if(this.paymentData[i].payment_status == "Payment Success"){
        this.successpaymentData.push(this.paymentData[i]);
        this.successtotalamount+=parseFloat(this.paymentData[i]['amount'])
    }
}
for(let i = 0; i < this.paymentData.length; i++){
    if(this.paymentData[i].payment_status == "Payment Failed" || this.paymentData[i].payment_status == "Payment Returned"){
        this.failedpaymentdata.push(this.paymentData[i]);
        this.failedtotalamount+=parseFloat(this.paymentData[i]['amount'])
    }
}
}
},error=>{
  this.loaderService.display(false)
  console.log(error)
  if(error['status']==401){
    this.auth.expiresession();
  }
})

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

  private getUserDetail(){
    this.userservice.getUserDetails().subscribe(res=>{
      //console.log(res)
      this.userdata=res['Data'];
      console.log(this.userdata)
      this.rolename=this.userdata['dualrole']
      this.organization_id=this.userdata['orgid']
     // this.username=this.userdata['firstname']+" "+this.userdata['lastname']
    },error=>{
      console.log(error)
      if(error['status']==401){
        this.auth.expiresession();
      }
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

      
    getpaymentlogs(carddebittime,paystatustime,rejectreason,paymentstat){
      this.paymentstatus=paymentstat
  console.log(this.paymentstatus)
      console.log(carddebittime)
      
     
      this.displayLogs='block';
      if(carddebittime!=null){
        // var utcdate = new Date(carddebittime);
        // var nowUtc = new Date(utcdate.getTime() + utcdate.getTimezoneOffset() * 60000);
        // var d=new Date(nowUtc)
        // console.log(d.toUTCString)
        //var event = new Date(carddebittime);
//console.log(event.toLocaleString('en-GB', { timeZone: 'Europe/London' }));
//         var usaTime = new Date(carddebittime).toLocaleString("en-GB", {timeZone: "Europe/London"});
// var usaTime1 = new Date(usaTime);

// var nowUtc= usaTime1.toLocaleString()
// console.log(nowUtc)
// var indiaTime = new Date(nowUtc).toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
// var indiaTime1 = new Date(indiaTime);
// console.log('India time: '+indiaTime1.toLocaleString())

// var nowist=indiaTime1.toLocaleString()

//console.log(nowist)
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

    closedelmodal(){
      this.deletemodal='none'; //set none css after close dialog
    
     }
    
     opendeletemodal(id){
       console.log(this.deletemodal)
       console.log(id)
      this.deletemodal='block'; //Set block css
      this.deleteid=id;
    
    }

    deletepayment(){
      this.loaderService.display(true)
      this.paymentservice.deletepayment(this.deleteid).then(resp=>{
        console.log(resp)
        this.loaderService.display(false)
        this.toaster.success("Payment Deleted Successfully!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
          this.laodpayments()
      },error=>{
        console.log(error)
        this.loaderService.display(false)
        this.toaster.error("Failed to delete the payment!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      })
    }

    downloadattachment(id){
      this.paymentservice.getattachment(id).then(resp=>{
        console.log(resp)
      },error=>{
        console.log(error)
      })

    }

    getcustomreport(){
      this.filterfromdate=this.datepipe.transform(this.filterfromdate, 'yyyy-MM-dd');
      this.filtertodate=this.datepipe.transform(this.filtertodate, 'yyyy-MM-dd');
      let headers = new Headers();
      console.log(this.filterfromdate+"+++++"+this.filtertodate)
      var paymentdata={
        "Fromdate":this.filterfromdate,
        "Todate":this.filtertodate,
        "bill_name": this.custbill_name,
"consumer_name": this.custconsumer_name,
"consumer_no": this.custconsumer_no,
"amount": this.custamount,
"reference_no": this.custconsumer_no,
"status": this.custstatus,
"payment_status": this.custpayment_status,
"short_name": this.custshort_name,
"bill_date": this.custbill_date,
"due_date": this.custdue_date,
"location": this.custlocation,
"bill_no": this.custbill_no,
"card_no": this.custcard_no,
"mobile_no": this.custmobile_no,
"email": this.custemail,
"address": this.custaddress,
"crn": this.custcrn,
"initiated_by": this.custinitiated_by,
"initiated_at": this.custinitiated_at,
"approved_on": this.custapproved_on,
"comment": this.custcomment,
"order_id": this.custorderid,
"orgid":this.organization_id
      }

      let date =new Date()
      this.downloadFile(paymentdata).subscribe(blob=>{
        importedSaveAs(blob, "payments_"+date+".xlsx");
      })

      console.log(JSON.stringify(paymentdata))
    }

    downloadFile(arr:any): Observable<Blob> {
      let options = new RequestOptions({responseType: ResponseContentType.Blob });
      return this.http.post(path+`api/v1/payment_report`,arr, options)
          .map(res => res.blob())
          .catch(this.handleError)
    }
      handleError(handleError: any): Observable<Blob> {
        throw new Error("Method not implemented.");
      }
    

    getfilterdata(){
      this.paymentData=[]
      this.pendingpaymentdata=[];
      this.totalamount=0;
      
      this.fromfilterstring=this.datepipe.transform(this.fromfilter, 'yyyy-MM-dd');
      this.tofilterstring=this.datepipe.transform(this.tofilter, 'yyyy-MM-dd');
      this.loaderService.display(true)
      var payparams={
        // "interval":this.filterinterval,
        "payment_status":this.filterps,
        "transaction_status":this.filterts,
        "category":this.filtercategory,
        "from":this.fromfilterstring,
        "to":this.tofilterstring
      }

      this.paymentservice.filterpayment(payparams).then(resp=>{
        this.totalamount=0
        console.log(resp)
        this.paymentData=resp['data'];
        console.log(this.paymentData)
        this.loaderService.display(false)
        if(this.paymentData!=null){
        // for(var total of this.paymentData){
        //   this.totalamount+=parseFloat(total['amount'])
        // }
        for(let i = 0; i < this.paymentData.length; i++){
          if(this.paymentData[i].payment_status == "Pending" || this.paymentData[i].payment_status == "Card Debited" || this.paymentData[i].payment_status == "In Process" || this.paymentData[i].payment_status == "REJECT" || this.paymentData[i].payment_status == "ERROR" || this.paymentData[i].payment_status == "Unspecified Failure"){
              this.pendingpaymentdata.push(this.paymentData[i]);
              this.totalamount+=parseFloat(this.paymentData[i]['amount'])
          }
      }
      }
      },error=>{
        this.loaderService.display(false)
        console.log(error)
      })
    }

    getfilterdata1(){
      this.paymentData=[]
      this.successpaymentData=[]
      this.successtotalamount=0
      this.fromfilterstring=this.datepipe.transform(this.fromfilter, 'yyyy-MM-dd');
      this.tofilterstring=this.datepipe.transform(this.tofilter, 'yyyy-MM-dd');
      this.loaderService.display(true)
      var payparams={
        // "interval":this.filterinterval,
        "payment_status":this.filterps,
        "transaction_status":this.filterts,
        "category":this.filtercategory,
        "from":this.fromfilterstring,
        "to":this.tofilterstring
      }

      this.paymentservice.filterpayment(payparams).then(resp=>{
        this.successtotalamount=0
        console.log(resp)
        this.paymentData=resp['data'];
        console.log(this.paymentData)
        this.loaderService.display(false)
        if(this.paymentData!=null){
          for(let i = 0; i < this.paymentData.length; i++){
            if(this.paymentData[i].payment_status == "Payment Success"){
                this.successpaymentData.push(this.paymentData[i]);
                this.successtotalamount+=parseFloat(this.paymentData[i]['amount'])
            }
        }
      }
      },error=>{
        this.loaderService.display(false)
        console.log(error)
      })
    }

    getfilterdata2(){
      this.paymentData=[]
      this.failedpaymentdata=[]
      this.failedtotalamount=0;
      this.fromfilterstring=this.datepipe.transform(this.fromfilter, 'yyyy-MM-dd');
      this.tofilterstring=this.datepipe.transform(this.tofilter, 'yyyy-MM-dd');
      this.loaderService.display(true)
      var payparams={
        // "interval":this.filterinterval,
        "payment_status":this.filterps,
        "transaction_status":this.filterts,
        "category":this.filtercategory,
        "from":this.fromfilterstring,
        "to":this.tofilterstring
      }

      this.paymentservice.filterpayment(payparams).then(resp=>{
        this.failedtotalamount=0
        console.log(resp)
        this.paymentData=resp['data'];
        console.log(this.paymentData)
        this.loaderService.display(false)
        if(this.paymentData!=null){
          for(let i = 0; i < this.paymentData.length; i++){
            if(this.paymentData[i].payment_status == "Payment Failed" || this.paymentData[i].payment_status == "Payment Returned"){
                this.failedpaymentdata.push(this.paymentData[i]);
                this.failedtotalamount+=parseFloat(this.paymentData[i]['amount'])
            }
        }
      }
      },error=>{
        this.loaderService.display(false)
        console.log(error)
      })
    }

    selectllpara(){
      if(this.selectallpara==true){
        this.custbill_name=true;
        this.custamount=true;
        this.custreference_no=true;
        this.custconsumer_name=true;
        this.custstatus=true;
        this.custpayment_status=true;
        this.custshort_name=true;
        this.custdue_date=true;
        this.custbill_date=true;
        this.custcard_no=true;
        this.custlocation=true;
        this.custbill_no=true;
        this.custemail=true;
        this.custaddress=true;
        this.custmobile_no=true;
        this.custinitiated_by=true;
        this.custinitiated_at=true;
        this.custorderid=true;
        this.custcrn=true;
        this.custcomment=true;
        this.custreference_no=true;
        this.custapproved_on=true;
        this.custshort_name=true;
        this.custconsumer_no=true;
      }else{
        this.custbill_name=false;
        this.custamount=false;
        this.custreference_no=false;
        this.custconsumer_name=false;
        this.custstatus=false;
        this.custpayment_status=false;
        this.custshort_name=false;
        this.custdue_date=false;
        this.custbill_date=false;
        this.custcard_no=false;
        this.custlocation=false;
        this.custbill_no=false;
        this.custemail=false;
        this.custaddress=false;
        this.custmobile_no=false;
        this.custinitiated_by=false;
        this.custinitiated_at=false;
        this.custorderid=false;
        this.custcrn=false;
        this.custcomment=false;
        this.custreference_no=false;
        this.custapproved_on=false;
        this.custshort_name=false;
        this.custconsumer_no=false;
      }
    }

    apprcard(){
   
      this.apprcrd=true;
      this.pencrd=false;
      this.rejcrd=false;
  
    }
  
    pencard(){
      
      this.apprcrd=false;
      this.pencrd=true;
      this.rejcrd=false;
    }

    
    rejcard(){
      
      this.apprcrd=false;
      this.pencrd=false;
      this.rejcrd=true;
    }
}
