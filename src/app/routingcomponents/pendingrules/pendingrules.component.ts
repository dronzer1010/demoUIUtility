import { Component, OnInit } from '@angular/core';
// import { AsViewRulesService } from './asviewrules.service';
// import * as $ from 'jquery';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

  ngOnInit() {
    this.temp = false;
    this.checkedValue = "";
    this.flag = 0;
    this.cntChk = 0;
    // this.pendingdetails = [];
    // this.asViewRulesService.getAllPendingRules().then(resp => {
    //   this.pendingRules = resp.rules;
    //   // for (var i = 0; i < this.pendingRules.length; i++) {
    //   //   if (this.pendingRules[i].status == 2) {
    //   //     this.pendingdetails.push(this.pendingRules[i]);
    //   //   }
    //   // }
    // });
    this.pendingRules=[{"ruleid":134,"orgid":66,"lwramount":"0","upramount":"0.00","ruleseter":0,"ruleformula":"A&D","status":2,"regcmt":"Approved by Mr. Thirumurugan J","checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":"Amit Shrivastava","approved":"Mr. Thirumurugan J","g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null},{"ruleid":135,"orgid":66,"lwramount":"0","upramount":"0.00","ruleseter":0,"ruleformula":"B&D","status":2,"regcmt":"Approved by Mr. Thirumurugan J","checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":"Amit Shrivastava","approved":"Mr. Thirumurugan J","g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null},{"ruleid":136,"orgid":66,"lwramount":"0","upramount":"0.00","ruleseter":0,"ruleformula":"C&D","status":2,"regcmt":"Approved by Mr. Thirumurugan J","checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":"Amit Shrivastava","approved":"Mr. Thirumurugan J","g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null}]
  }

  rejectRuleById(): void {
    // this.asViewRulesService.rejectedRule(this.checkedValueArray, this.comment).then(resp => {
    //   this.rejectedruledata = resp.data;
    //   this.rejectedrulemsg = resp.msg;
    //   if (this.rejectedrulemsg == "succes") {
    //     // this.pendingdetails = [];
    //     // this.router.navigate(['/asviewrules']);
    //     this.asViewRulesService.getAllPendingRules().then(resp => {
    //       this.pendingRules = resp.rules;
    //       // for (var i = 0; i < this.pendingRules.length; i++) {
    //       //   if (this.pendingRules[i].status == 2) {
    //       //     this.pendingdetails.push(this.pendingRules[i]);
    //       //   }
    //       // }
    //     });
    //   }
    // });
    this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'rulereject'}});
   // this.loaderService.display(false);
  }

  gotoOTP(): void {
    // if (this.temp == true) {
    //   this.router.navigate(['/aspaymentapproveotp', JSON.stringify(this.checkedValueArray)]);
    // } else {
    //   alert("First select at least one checkbox.");
    // }
    var ids:any=[]
    ids= JSON.stringify(this.checkedValueArray)
    this.router.navigate(['/main/otp-rule'],{queryParams:{ids:ids}});

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

}
