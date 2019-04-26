import { Component, OnInit } from '@angular/core';
// import { AsViewRulesService } from './asviewrules.service';
// import * as $ from 'jquery';
import { Router } from '@angular/router';
import {RuleserviceService} from '../../api/ruleservice.service'
import{LoaderService} from '../../api/loader.service';
declare var $: any;

@Component({
  selector: 'app-pendingrules',
  templateUrl: './pendingrules.component.html',
  styleUrls: ['./pendingrules.component.css']
})
export class PendingrulesComponent implements OnInit {
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  public pendingRules: any;
  public temp: any;
  public flag: any;
  public checkedValueArray: any = [];
  public cntChk: any;
  public checkedValue: any;
  public comment: any;
  public rejectedruledata: any;
  public rejectedrulemsg: any;
  public pendingdetails: any;
  selectall:boolean=false;
  disRejMod:string='none'
  selectedAll: any;
  constructor(private router: Router,private ruleservice: RuleserviceService,private loader: LoaderService) { }

  ngOnInit() {
    this.temp = false;
    this.checkedValue = "";
    this.flag = 0;
    this.cntChk = 0;
 this.loadpendingrules();
    
  }

  rejectRuleById(): void {
    this.ruleservice.rejectedRule(this.checkedValueArray, this.comment).then(resp => {
      this.rejectedruledata = resp.data;
      this.rejectedrulemsg = resp.msg;
      if (this.rejectedrulemsg == "succes") {
        // this.pendingdetails = [];
        // this.router.navigate(['/asviewrules']);
        this.ruleservice.getAllPendingRules().then(resp => {
          this.pendingRules = resp.rules;
          for (var i = 0; i < this.pendingRules.length; i++) {
            if (this.pendingRules[i].status == 2) {
              this.pendingdetails.push(this.pendingRules[i]);
            }
          }
        });
      }
    });
    this.loader.display(false);
   this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'rulereject'}});

  }

  gotoOTP(): void {
    if (this.temp == true) {
      this.router.navigate(['/main/otp-rule', JSON.stringify(this.checkedValueArray)]);
    } else {
      alert("First select at least one checkbox.");
    }


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
      if(this.checkedValueArray.length<this.pendingRules.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)
     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.pendingRules.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)
     
    }
    console.log(this.checkedValueArray)
  }
  sortByDesc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "desc";
  }

  sortByAsc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "asc";
  }
  changeAll(asGroupsPendingRules): void {
    
    if(this.checkedValueArray.length==this.pendingRules.length){
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
        for (var i = 0; i < asGroupsPendingRules.length; i++) {
          this.checkedValueArray[i] = asGroupsPendingRules[i].ruleid;
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
  for (var i = 0; i < this.pendingRules.length; i++) {
    this.pendingRules[i].selected = this.selectedAll;
  }
}

checkIfAllSelected() {
  this.selectedAll = this.pendingRules.every(function(item:any) {
      return item.selected == true;
    })
}

 displayRejMod(){
  this.disRejMod='block'
  }
  closeRejMod(){
    this.disRejMod='none'
  }

  private loadpendingrules(){
   this.pendingdetails = [];
    this.ruleservice.getAllPendingRules().then(resp => {
      this.pendingRules = resp.rules;
      // for (var i = 0; i < this.pendingRules.length; i++) {
      //   if (this.pendingRules[i].status == 2) {
      //     this.pendingdetails.push(this.pendingRules[i]);
      //   }
      // }
    });
  }

}
