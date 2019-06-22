import { Component, OnInit } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
@Component({
  selector: 'app-billerlist',
  templateUrl: './billerlist.component.html',
  styleUrls: ['./billerlist.component.css']
})
export class BillerlistComponent implements OnInit {
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
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService) { }

  ngOnInit() {
    this.getUserDetail();
    this.loadbills()
//this.rolename=localStorage.getItem('rolename')
   // this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    // if(this.rolename=='maker' || this.rolename=='ccmaker' || this.rolename=='as'){
    //   this.approveRejBiller=this.billdata.filter((biller)=>{
    //     return (biller.status == "Registered" || biller.status == "Rejected"  || biller.status == "Pending")
    //   })
    // }else if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
    //   this.approveRejBiller=this.billdata.filter((biller)=>{
    //     return (biller.status == "Registered" || biller.status == "Rejected")
    //   })
    // }
   
    //console.log(this.billdata)
   

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
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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

 private loadbills(){
  this.loaderService.display(true)
   this.billservice.getAllbillers().then(resp=>{
    this.billdata=resp
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
