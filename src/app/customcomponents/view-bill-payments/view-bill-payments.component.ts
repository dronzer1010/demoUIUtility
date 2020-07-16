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
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-bill-payments',
  templateUrl: './view-bill-payments.component.html',
  styleUrls: ['./view-bill-payments.component.css']
})
export class ViewBillPaymentsComponent implements OnInit {
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
filter:any;
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,public datepipe: DatePipe,private toaster:ToastrService,private auth: AuthService,private http: Http,private router: Router) { }

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
       { item_id: 1, item_text: 'Standard List' }
      //  { item_id: 2, item_text: 'Customise List' }
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
    this.downloadArray=[]
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.paymentData){
        var obj={
          Biller:data['billername'],
          Amount:data['amount'],
          Consumer_No:data['consumer_no'],
          Consumer_Name:data['consumernumber'],
          Status:data['transstatus'],
          Payment_Status:data['paymentstatus'],
          GL_Expense_Code:data['glexpensecode'],
          Bill_Date:data['billdate'],
          Due_Date:data['duedate'],
          State:data['location'],
          Ref1:data['bucodebuname'],
          Ref2:data['circle'],
          Bill_Number:String(data['billno']),
          Card_Number:data['cardno'],
          UTR:data['utr'],
          Contact:data['mobileno'],
          Email:data['email'],
          CRN:data['crn'],
          BankAccountNo:data['accountno'],
          IFSC:data['ifsc'],
          BankName:data['bankname'],
          BranchName:data['branchname'],
          Initiated_by:data['initiatedby'],
          Initiated_On:data['initiateddate']+"|"+data['initiatedtime'],
       
  
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
 
    this.loaderService.display(true)
this.paymentservice.getAllPaymentsNew().then(resp=>{
  console.log(resp)
    if(resp['data']!=null){
      this.paymentData=resp['data'];
      console.log(this.paymentData)
      for(var data of this.paymentData){
        this.totalamount+=parseFloat(data['amount'])
      }
      this.loaderService.display(false)
    }else{
      this.loaderService.display(false)
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
    this.paymentservice.paylogsNew(id).then(resp=>{
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

      
    getpaymentlogs(carddebiteddate,carddebittime,paymentstatusdate,paystatustime,rejectreason,paymentstat){
      this.displayLogs='block';
        if(carddebiteddate=='--'){
          this.carddebitdate='--'
        }else{
          this.carddebitdate=carddebiteddate
        }
        if(carddebittime=='--'){
          this.carddebittime='--'
        }else{
          this.carddebittime=carddebittime
        }
        if(paymentstat=='Payment Returned'){
          this.rejectreason=rejectreason
          if(paymentstatusdate=='--'){
            this.payfaildate='--'
          }else{
            this.payfaildate=paymentstatusdate
          }
          if(paystatustime=='--'){
            this.payfailtime='--'
          }else{
            this.payfailtime=paystatustime
          }
        }else{
          this.rejectreason='--'
          if(paymentstatusdate=='--'){
            this.paysuccessdate='--'
          }else{
            this.paysuccessdate=paymentstatusdate
          }
          if(paystatustime=='--'){
            this.paysuccesstime='--'
          }else{
            this.paysuccesstime=paystatustime
          }
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
      var params={
        "checkval":[this.deleteid],
        "regcmt":`Deleted by ${this.userdata['firstname']} ${this.userdata['lastname']}`
      }
      
      
      this.paymentservice.deletepaymentNew(params).then(resp=>{
        console.log(resp)
        
        if(resp['msg']=='delete bill payment Succes'){
          this.loaderService.display(false)
          this.toaster.success("Payment Deleted Successfully!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
            this.laodpayments()
        }else{
          this.loaderService.display(false)
          this.toaster.error("Something went wrong!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
       
          
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

    editbiller(id){
      this.router.navigate(['/main/add-custom-bill-payment'],{queryParams:{id:id}});
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
        if(resp!=null){
          if(resp['inprocess_payment']!=null){
            this.pendingpaymentdata=resp['inprocess_payment']
            for(let i = 0; i < this.pendingpaymentdata.length; i++){
              this.totalamount+=parseFloat(this.pendingpaymentdata[i]['amount'])
            }
          }
        }
      //  this.paymentData=resp['data'];
        //console.log(this.paymentData)
        this.loaderService.display(false)
       // if(this.paymentData!=null){
        // for(var total of this.paymentData){
        //   this.totalamount+=parseFloat(total['amount'])
        // }
      //   for(let i = 0; i < this.paymentData.length; i++){
      //     if(this.paymentData[i].payment_status == "Pending" || this.paymentData[i].payment_status == "Card Debited" || this.paymentData[i].payment_status == "In Process" || this.paymentData[i].payment_status == "REJECT" || this.paymentData[i].payment_status == "ERROR" || this.paymentData[i].payment_status == "Unspecified Failure"){
      //         this.pendingpaymentdata.push(this.paymentData[i]);
      //         this.totalamount+=parseFloat(this.paymentData[i]['amount'])
      //     }
      // }
     // }

      },error=>{
        this.loaderService.display(false)
        console.log(error)
      })
    }

    getfilterdata1(){
      //this.paymentData=[]
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
        //this.paymentData=resp['data'];
       // console.log(this.paymentData)
        this.loaderService.display(false)
        if(resp!=null){
          if(resp['successful_payment']!=null){
            this.successpaymentData=resp['successful_payment']
            for(let i = 0; i < this.successpaymentData.length; i++){
              this.successtotalamount+=parseFloat(this.successpaymentData[i]['amount'])
            }
          }
        }
      //   if(this.paymentData!=null){
      //     for(let i = 0; i < this.paymentData.length; i++){
      //       if(this.paymentData[i].payment_status == "Payment Success"){
      //           this.successpaymentData.push(this.paymentData[i]);
      //           this.successtotalamount+=parseFloat(this.paymentData[i]['amount'])
      //       }
      //   }
      // }
      },error=>{
        this.loaderService.display(false)
        console.log(error)
      })
    }

    getfilterdata2(){
     
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
        //this.paymentData=resp['data'];
        //console.log(this.paymentData)
        this.loaderService.display(false)
      //   if(this.paymentData!=null){
      //     for(let i = 0; i < this.paymentData.length; i++){
      //       if(this.paymentData[i].payment_status == "Payment Failed" || this.paymentData[i].payment_status == "Payment Returned"){
      //           this.failedpaymentdata.push(this.paymentData[i]);
      //           this.failedtotalamount+=parseFloat(this.paymentData[i]['amount'])
      //       }
      //   }
      // }
      if(resp!=null){
        if(resp['fail_payment']!=null){
          this.failedpaymentdata=resp['fail_payment']
          for(let i = 0; i < this.failedpaymentdata.length; i++){
            this.failedtotalamount=parseFloat(this.failedpaymentdata[i]['amount'])
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
