import { Component, OnInit } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {ExcelService} from '../../excelservice/excel.service'

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
  reverse: boolean = true;
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
  constructor(private excelservice : ExcelService) { }

  ngOnInit() {
this.rolename=localStorage.getItem('rolename')
    this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    if(this.rolename=='maker' || this.rolename=='ccmaker' || this.rolename=='as'){
      this.approveRejBiller=this.billdata.filter((biller)=>{
        return (biller.status == "Approved" || biller.status == "Rejected"  || biller.status == "Pending")
      })
    }else if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
      this.approveRejBiller=this.billdata.filter((biller)=>{
        return (biller.status == "Approved" || biller.status == "Rejected")
      })
    }
    console.log(this.billdata)
    if(this.approveRejBiller==null){
      this.billerlength=0
      this.noofrole="No bills available"
    }else{
      this.billerlength=this.approveRejBiller.length;
      if(this.billerlength>1){
        this.noofrole="No of bills"
      }else{
        this.noofrole="No of bill"
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
          Biller:data['biller'],
          Consumer_No:data['consumerno'],
          Status:data['status'],
          Short_Name:data['shortname'],
          GL_Expense_Code:data['expensecode'],
          Bill_Date:data['billdate'],
          Due_Date:data['duedate'],
          State:data['state'],
          Contact:data['contact'],
          Bill_Address:data['billaddress'],
          Email:data['email'],
          Initiated_by:data['initiatedby'],
          Initiated_On:data['initiatedon'],
          Approved_By:data['approvedby'],
          Approved_On:data['approvedon']
  
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

}
