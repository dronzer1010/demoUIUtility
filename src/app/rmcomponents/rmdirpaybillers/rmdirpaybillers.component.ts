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
  selector: 'app-rmdirpaybillers',
  templateUrl: './rmdirpaybillers.component.html',
  styleUrls: ['./rmdirpaybillers.component.css']
})
export class RmdirpaybillersComponent implements OnInit {
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
    //this.loadallbills();
  }
  onItemSelectDown(items:any){
    this.downloadArray=[]
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
  
  

}
