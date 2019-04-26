import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// declare var jquery:any;
// declare var $ :any;
 import{GroupserviceService} from '../../api/groupservice.service'
// import { Groups } from '../../models/groups';
 import{RuleserviceService} from '../../api/ruleservice.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-unitaryrule',
  templateUrl: './unitaryrule.component.html',
  styleUrls: ['./unitaryrule.component.css']
})
export class UnitaryruleComponent implements OnInit {
  groupData: any = {};
  groups:any[] = [];
  ruleField:any={};
  rules:any[]=[];
  _rules:any[]=[];
  isSelected = false;
  usergroups:any=[];
  constructor(private router: Router,private ruleservice:RuleserviceService,private groupservice:GroupserviceService) { }

  ngOnInit() {
    this.loadAllGroups()
    this.resetRuleField();
  }

  private loadAllGroups() {
    this.groupservice.getAll().subscribe(groups => {
    this.groups = groups['data']; 
   
    if(!!this.groups){
      this.usergroups=[];
      for(var i=0; i<this.groups.length;i++){
        if(this.groups[i]['status'] == 'Approved'){
            this.usergroups.push(this.groups[i]);
        }
    }
    }
  });

  // this.groups=[{"lwrlimit":0.0,"grpname":"A","id":97,"uprlimit":1.0E8,"users":["Mr. Thirumurugan J","Ms. Nalini L"],"status":"Approved"},{"lwrlimit":0.0,"grpname":"B","id":98,"uprlimit":1.0E8,"users":["Ms. Meena A","Mr. Ravi Kumar"],"status":"Approved"},{"lwrlimit":0.0,"grpname":"C","id":99,"uprlimit":1.0E8,"users":[],"status":"Approved"},{"lwrlimit":0.0,"grpname":"D","id":100,"uprlimit":0.0,"users":[],"status":"Approved"},{"lwrlimit":0.0,"grpname":"E","id":101,"uprlimit":0.0,"users":[],"status":"Approved"}]
    if(!!this.groups){
      this.usergroups=[];
      for(var i=0; i<this.groups.length;i++){
        if(this.groups[i]['status'] == 'Approved'){
            this.usergroups.push(this.groups[i]);
        }
    }
    }
}

private resetRuleField(){
  this.ruleField.lwramount=0;
  this.ruleField.upramount=0;
  this.ruleField.ruleformula="";
}

submitRule(group1:string , group2:string , condition:string , ruledata:any){
  console.log("I am called with data = "+group1+" "+group2+" "+condition+" "+ruledata['lwramount']+" "+ruledata['upramount']);
  var data={};

  
  data["ruleformula"]=group1+condition+group2;
  data["lwramount"]=ruledata['lwramount'];
  data["upramount"]=ruledata['upramount'];
  this.rules.push(data);
  this.resetRuleField();
}


updateRuleList(rule:any , index:number){
  var temp_index=-1;
 for(var i=0;i<this._rules.length;i++){
   if(this._rules[i]["_id"]==index){
     temp_index=i;
   }
 }

 if(temp_index>-1){
  this._rules.splice(temp_index , 1);
 }else{
  rule["_id"] = index;
  this._rules.push(rule);
 }

 console.log(this._rules);

}

 /**
   * CheckAll Functionality
   */

  checkAll(checkedState:boolean){
    console.log(checkedState);

    if(!checkedState){
      this._rules=[];
      for(var i=0;i<this.rules.length;i++){
        this._rules.push(this.rules[i]);
        this._rules[i]["_id"]=i;
      }
    }else{
      this._rules=[];
    }

    console.log(this._rules);
    this.isSelected = !checkedState
  }

  /**
   * Submit Rules
   */
  submitRules(){
    console.log(this._rules)
    //this.router.navigate(['/main/successmsg'],{queryParams:{msg:'rulesuccess'}});
    this.ruleservice.createrule(this._rules).subscribe(data => {
     this.router.navigate(['/main/successmsg'],{queryParams:{msg:'rulesuccess'}});
   },error => {
     this.router.navigate(['/main/successmsg'],{queryParams:{msg:'rulesuccess'}});
 });
  }


}
