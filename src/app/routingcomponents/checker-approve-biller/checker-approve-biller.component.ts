import { Component, OnInit,Inject } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-checker-approve-biller',
  templateUrl: './checker-approve-biller.component.html',
  styleUrls: ['./checker-approve-biller.component.css']
})
export class CheckerApproveBillerComponent implements OnInit {
  select=false;
  display='none';
  pendingList:boolean=true;
  approve:boolean=false;
  reject:boolean=false; 
  displaydownloadlist='none';
  displayreason='none';
  displaypaydetails='none';
  billdata:any=[];
  pendingbillers:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  billerlength:number=0;
  public checkedValueArray: any = [];
  public temp: any;
  public cntChk: any;
  public flag: any;
  selectall:boolean=false;
  selectallbiller:boolean=false;
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  noofrole="No bills available"

  constructor(private router : Router , private aRouter : ActivatedRoute) { }

  
  ngOnInit() {
    this.aRouter.queryParams
    .filter(params => params.otp)
    .subscribe(params => {
      console.log(params);
      if(params.otp && params.otp == 'success'){
        this.pendingList=false;
        this.approve=true;
        this.reject=false;
      }
    });
    this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    console.log(this.billdata)

    this.pendingbillers = this.billdata.filter((data)=>data['status']=='Pending');
    if(this.pendingbillers==null){
      this.billerlength=0
      this.noofrole="No bills available"
    }else{
      this.billerlength=this.pendingbillers.length;
      if(this.billerlength>1){
        this.noofrole="No of Bills:"
      }else{
        this.noofrole="No of Bill:"
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
      allowSearchFilter: true
    };
  }

  changeAll(pendingbillerpage): void {
    
    if(this.checkedValueArray.length==this.pendingbillers.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.cntChk=0
    }
    console.log(this.selectall)
    if (this.cntChk == 0) {
      this.cntChk = 1;
      this.temp = true;
      this.selectall=true;
      this.select=true;
      for (var i = 0; i < pendingbillerpage.length; i++) {
        this.checkedValueArray[i] = pendingbillerpage[i].id;
      }
      this.cntChk = 0;
    }
   
    else {
      this.cntChk = 0;
      this.temp = false;
      this.checkedValueArray = [];
      this.select=false;
    }
    console.log(this.checkedValueArray)
  }

  change(id): void {
    this.flag = 0;
    for (var i = 0; i < this.checkedValueArray.length; i++) {
      if (this.checkedValueArray[i] == id) {
        this.checkedValueArray.splice(i, 1);
        this.flag = 1;
      }
    }
    if (this.flag == 0) {
      this.checkedValueArray.push(id);
     
    }

    if (this.checkedValueArray.length > 0) {
      this.temp = true;
      if(this.checkedValueArray.length<this.pendingbillers.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)
     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.pendingbillers.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)
     
    }
    console.log(this.checkedValueArray)
  }
  openModalDialog(){
    this.display=''; //Set block css
 }

 closeModalDialog(){
  this.display='block'; //set none css after close dialog
 }
 closeModalDialog2(){
  this.displayreason='block';
 }
openModalDialog2(){
this.displayreason='';
}
 approveBtn(){
  
  var bills =JSON.parse(localStorage.getItem('billdetails'));

  // for(var i=0;i<this.checkedValueArray.length;i++){
  //   for(var j=0;j<bills.length;j++){


  //     if(this.checkedValueArray[i]==parseInt(bills[j]['id'])){
       
  //       bills[j]['status']="Approved"
  //       bills[j]['approvedby']="Ms. Deepali Patekar"
  //       var d =new Date();
  //       bills[j]["approvedon"] = d.toLocaleString();
  //     }
  //   }
  // }
  // this.billdata=bills;
  // console.log(this.billdata)
  // localStorage.setItem('billdetails', JSON.stringify(this.billdata));
  this.pendingList=false;
  this.approve=false;
  this.reject=false;
  console.log(this.checkedValueArray)
  localStorage.setItem('selectedBillers' , JSON.stringify(this.checkedValueArray));
  this.router.navigate(['main/otp-approve-biller']);

}
rejectBtn(){
  this.pendingList=false;
  this.approve=false;
  this.reject=true;
}
  

}

