import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {RmservicesService} from '../../api/rmservices.service'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {Config} from '../../config'
const path = new Config().getutilityBaseUrl();
import {saveAs as importedSaveAs} from "file-saver";
import {Observable} from 'rxjs/Rx';
import { Http, ResponseContentType , Headers,RequestOptions} from '@angular/http';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-rmbills',
  templateUrl: './rmbills.component.html',
  styleUrls: ['./rmbills.component.css']
})
export class RmbillsComponent implements OnInit {
  display='none'; 
  billdata:any=[];
  billerlength:number=0;
  noofrole="No bills available"
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  key: string = 'status'; //set default
  reverse: boolean = false;
rolename:any;
settings = {
  bigBanner: true,
  timePicker: false,
  format: 'dd-MM-yyyy',
  defaultOpen: false
}
todate:Date = new Date();
fromdate:Date = new Date();
public searchText : string;
downloadArray:any=[];
approveRejBiller:any=[];
userdata:any={};
approverdetails:any=[];
selectedIndex = -1;
billparams:any={};
public id: string;
statusddSettings = {};
dropdownStatus = [];
statusselected=[];
filterstatus:any="0";
filterinterval:any="0";
filtercategory:any="6f6af57a-5c48-442e-b5b8-8b3559b10cd9";
filterorgid:any;
organisation_id:any;
selectallpara:boolean=false;
filterfromdate:any;
  filtertodate:any
  billername:boolean=false;
consumerno:boolean=false;
duedate:boolean=false;
billdate:boolean=false;
glexpensecode:boolean=false;
shortname:boolean=false;
email:boolean=false;
contactno:boolean=false;
contactaddress:boolean=false;
utilityname:boolean=false;
status:boolean=false;
location:boolean=false;
initiatedby:boolean=false;
initiatedon:boolean=false;
  constructor(private excelservice : ExcelService,private loaderService: LoaderService,private billservice:BillerserviceService,private rmservice:RmservicesService,private route: ActivatedRoute,private toastr: ToastrService,private http: Http,public datepipe: DatePipe) { }

  ngOnInit() {
    this.filterorgid = this.route.snapshot.paramMap.get('id');
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
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.statusddSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.dropdownStatus = [
      { item_id: 1, item_text: 'All' },
      { item_id: 2, item_text: 'Registered' },
      { item_id: 3, item_text: 'Rejected' },
      { item_id: 4, item_text: 'Pending' }
    ];
    this.loadallbills();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onIntervalSelect(interval:any){
    console.log(interval)
  this.filterinterval=interval['item_id']
    console.log(this.filterinterval)
  }
  onItemSelectDown(items:any){
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.approveRejBiller){
        var obj={
          Biller:data['biller_name'],
          Consumer_No:data['consumer_no'],
          Status:data['status'],
          Short_Name:data['short_name'],
          GL_Expense_Code:data['gl_expense_code'],
          Bill_Date:data['bill_date'],
          Due_Date:data['due_date'],
          State:data['state'],
          Reference_no_1:data['bu'],
          Reference_no_2:data['circle'],
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

 onSelectStatus(status:any){
  this.filterstatus=status['item_text']
  console.log(this.filterstatus)
 }

 onSelectAllStatus(status:any){
  console.log(status)
 }

 getApproverDetails(id,index){
  this.selectedIndex = index;
  this.billservice.suplogs(id).then(resp=>{
    console.log(resp)
    if(resp!=null){
    this.approverdetails=resp['data']
    }else{
      this.approverdetails=[];
    }
  },error=>{
    console.log(error)
  })
}


private loadallbills(){
  this.loaderService.display(true);
  this.billparams={
    "category":this.filtercategory,
    "interval":this.filterinterval,
    "status":this.filterstatus
  }
  this.rmservice.getAllBills(this.billparams,this.filterorgid).then(resp=>{
    console.log(resp)
    this.billdata=resp['bills'];
    if(this.billdata==null){
      this.billerlength=0
      this.noofrole="No bills available"
      this.loaderService.display(false)
    }else{
      this.billerlength=this.billdata.length;
      if(this.billerlength>1){
        this.noofrole="No of bills"
      }else{
        this.noofrole="No of bill"
      }
    }
    this.loaderService.display(false)
  },error=>{
    console.log(error)
    this.loaderService.display(false)
    if(error['error']['msg']=='Bills not found'){
      this.billdata=[]
      this.toastr.error("Bills not found for this organisation!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  })
  
}

getfilterdata(){
  this.loaderService.display(true);
  if(this.filterstatus=='All')
  this.filterstatus="0"
  this.billparams={
    "category":this.filtercategory,
    "interval":this.filterinterval,
    "status":this.filterstatus
  }
  this.rmservice.getAllBills(this.billparams,this.filterorgid).then(resp=>{
    console.log(resp)
    this.billdata=resp['bills'];
    if(this.billdata==null){
      this.billerlength=0
      this.noofrole="No bills available"
      this.loaderService.display(false)
    }else{
      this.billerlength=this.billdata.length;
      if(this.billerlength>1){
        this.noofrole="No of bills"
      }else{
        this.noofrole="No of bill"
      }
    }
    this.loaderService.display(false)
  },error=>{
    console.log(error)
    
    this.loaderService.display(false)
    if(error['error']['msg']=='Bills not found'){
      this.billdata=[]
      this.toastr.error("Bills not found for your filtered criteria!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  })
}


getcustomreport(){
  this.filterfromdate=this.datepipe.transform(this.filterfromdate, 'yyyy-MM-dd');
this.filtertodate=this.datepipe.transform(this.filtertodate, 'yyyy-MM-dd');
let headers = new Headers();
let billsdata={
  "Fromdate":this.filterfromdate,
  "Todate":this.filtertodate,
  "utility_type":this.utilityname,
  "consumer_no":this.consumerno,
  "name":this.billername,
  "short_name":this.shortname,
  "gl_expense_code":this.glexpensecode,
  "bill_date":this.billdate,
  "due_date":this.duedate,
  "email":this.email,
  "contact_no":this.contactno,
  "contact_address":this.contactaddress,
  "created_by":this.initiatedby,
  "created_on":this.initiatedon,
  "status":this.status,
  "location":this.location,
  "orgid":this.filterorgid
  
};
let date =new Date()
this.downloadFile(billsdata).subscribe(blob=>{
  importedSaveAs(blob, "bills_"+date+".xlsx");
})


}

downloadFile(arr:any): Observable<Blob> {
let options = new RequestOptions({responseType: ResponseContentType.Blob });
return this.http.post(path+`api/v1/bill_report`,arr, options)
  .map(res => res.blob())
  .catch(this.handleError)
}
handleError(handleError: any): Observable<Blob> {
throw new Error("Method not implemented.");
}



selectllpara(){
  if(this.selectallpara==true){
    this.utilityname=true;
    this.consumerno=true;
    this.billername=true;
    this.shortname=true;
    this.glexpensecode=true;
    this.billdate=true;
    this.duedate=true;
    this.email=true;
    this.contactno=true;
    this.contactaddress=true;
    this.initiatedby=true;
    this.initiatedon=true;
    this.status=true;
    this.location=true;
  }else{
    this.utilityname=false;
    this.consumerno=false;
    this.billername=false;
    this.shortname=false;
    this.glexpensecode=false;
    this.billdate=false;
    this.duedate=false;
    this.email=false;
    this.contactno=false;
    this.contactaddress=false;
    this.initiatedby=false;
    this.initiatedon=false;
    this.status=false;
    this.location=false;
  }

}



}
