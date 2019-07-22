import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {RmservicesService} from '../../api/rmservices.service'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
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
  format: 'MM-yyyy',
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
  constructor(private excelservice : ExcelService,private loaderService: LoaderService,private billservice:BillerserviceService,private rmservice:RmservicesService,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit() {
    this.filterorgid = this.route.snapshot.paramMap.get('id');
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

}
