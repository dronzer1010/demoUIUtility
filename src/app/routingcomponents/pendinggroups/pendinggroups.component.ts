import { Component, OnInit } from '@angular/core';
//import { AsGroupsPendingService } from './asgroupspending.service';
import { ExcelService } from '../../excelservice/excel.service';
import{LoaderService} from '../../api/loader.service';
//import * as $ from 'jquery';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-pendinggroups',
  templateUrl: './pendinggroups.component.html',
  styleUrls: ['./pendinggroups.component.css']
})
export class PendinggroupsComponent implements OnInit {
  filterQuery = "";
  sortBy = "email";
  sortOrder = "asc";
  public asGroupsPendingDetails: any;
  public temp: any;
  public checkedValueArray: any = [];
  public showHide: any;
  public test: any;
  public flag: any;
  public comment: any;
  public rejectedgroupdata: any;
  public rejectedgroupmsg: any;
  public cntChk:any;
  public pendingdetails:any;
  selectall:boolean=false;
  selectedAll: any;
  disRejMod:string='none'
  constructor(private router: Router,private excelService:ExcelService,private loaderService : LoaderService) { }

  ngOnInit() {
    this.temp = false;
    this.showHide = false;
    this.flag = 0;
    this.cntChk = 0;
    this.pendingdetails = [];
    // this.asGroupsPendingService.getAllGroups().then(resp => {  
    //   this.loaderService.display(false);
    //   this.asGroupsPendingDetails = resp.data;
    //   for(var i=0; i< this.asGroupsPendingDetails.length;i++){
    //       if(this.asGroupsPendingDetails[i].status =="Pending"){
    //         this.pendingdetails.push(this.asGroupsPendingDetails[i]);
    //       }
    //   }
    //   if (!!this.pendingdetails) {
    //     this.showHide = true;
    //   }
    //   else {
    //     this.test = true;
    //   }
    //   console.log("Group details ... " + this.pendingdetails);
    // });

    this.asGroupsPendingDetails=[
      {"lwrlimit":0.0,"grpname":"A","id":97,"uprlimit":1.0E8,"users":["Mr. Thirumurugan J","Ms. Nalini L"],"status":"Pending"},{"lwrlimit":0.0,"grpname":"B","id":98,"uprlimit":1.0E8,"users":["Ms. Meena A","Mr. Ravi Kumar"],"status":"Pending"},{"lwrlimit":0.0,"grpname":"C","id":99,"uprlimit":1.0E8,"users":[],"status":"Approved"},{"lwrlimit":0.0,"grpname":"D","id":100,"uprlimit":0.0,"users":[],"status":"Approved"},{"lwrlimit":0.0,"grpname":"E","id":101,"uprlimit":0.0,"users":[],"status":"Approved"}
      ]

        for(var i=0; i< this.asGroupsPendingDetails.length;i++){
          if(this.asGroupsPendingDetails[i].status =="Pending"){
            this.pendingdetails.push(this.asGroupsPendingDetails[i]);
          }
      }
      if (!!this.pendingdetails) {
        this.showHide = true;
      }
      else {
        this.test = true;
      }
      console.log("Group details ... " + this.pendingdetails);
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
      if(this.checkedValueArray.length<this.pendingdetails.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)
     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.pendingdetails.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)
     
    }
    console.log(this.checkedValueArray)
  }

  changeAll(asGroupsPendingDetails): void {
    if(this.checkedValueArray.length==this.pendingdetails.length){
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
        for (var i = 0; i < asGroupsPendingDetails.length; i++) {
          this.checkedValueArray[i] = asGroupsPendingDetails[i].id;
        }
        this.cntChk = 0;
      }
     
      else {
        this.cntChk = 0;
        this.temp = false;
        this.checkedValueArray = [];
      }
      console.log(this.checkedValueArray)

  }

  selectAll() {
    for (var i = 0; i < this.pendingdetails.length; i++) {
      this.pendingdetails[i].selected = this.selectedAll;
    }
  }
  
  checkIfAllSelected() {
    this.selectedAll = this.pendingdetails.every(function(item:any) {
        return item.selected == true;
      })
  }

  gotoOTP(): void {
    // if (this.temp == true) {
    //   this.router.navigate(['/asgroupapproveotp', JSON.stringify(this.checkedValueArray)]);
    // } else {
    //   alert("First select at least one checkbox.");
    // }
    var ids:any=[]
  ids= JSON.stringify(this.checkedValueArray)
  this.router.navigate(['/main/otp-group'],{queryParams:{ids:ids}});
  }

  rejectGroupById(): void {
    this.loaderService.display(true);
    // this.asGroupsPendingService.rejectedGroup(this.checkedValueArray, this.comment).then(resp => {
    //   this.loaderService.display(false);
    //   this.rejectedgroupdata = resp.data;
    //   this.rejectedgroupmsg = resp.msg;
    //   if (this.rejectedgroupmsg == "succes") {
    //     this.pendingdetails= [];
    //     // this.router.navigate(['/asviewrules']);
    //     this.asGroupsPendingService.getAllGroups().then(resp => {
    //       this.asGroupsPendingDetails = resp.data;
    //       for(var i=0; i< this.asGroupsPendingDetails.length;i++){
    //           if(this.asGroupsPendingDetails[i].status =="Pending"){
    //             this.pendingdetails.push(this.asGroupsPendingDetails[i]);
    //           }
    //       }
    //     });
    //   }
    //   this.router.navigate(['/asgrouplist']);
    // });
    this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'groupreject'}});
    this.loaderService.display(false);
  }

  sortByDesc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "desc";
  }

  sortByAsc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "asc";
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.pendingdetails, 'sample');
 }

 displayRejMod(){
  this.disRejMod='block'
  }
  closeRejMod(){
    this.disRejMod='none'
  }

}
