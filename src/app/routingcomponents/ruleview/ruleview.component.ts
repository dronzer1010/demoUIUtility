import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// declare var jquery:any;
// declare var $ :any;
// import{RuleService} from '../../api/rule.service'
@Component({
  selector: 'app-ruleview',
  templateUrl: './ruleview.component.html',
  styleUrls: ['./ruleview.component.css']
})
export class RuleviewComponent implements OnInit {
  amountdata:any={};
  ruledata:any=[];
  ruleDetails:any[];
  step2:boolean=true;
  ruleamount:string;
  constructor() { }

  ngOnInit() {
  }

  rulevalidation(){
    // this.ruleservice.validateRule(this.amountdata).subscribe(data=>{
    //   console.log("Rule Data")
    //   //console.log(data)
    //   this.ruleamount=this.amountdata['chkamt']
    //   this.ruledata=data['data']
    //   if(this.ruledata!=null){
    //     this.step2=false;
    //   } 
    //   console.log(this.ruledata)
    //   //this.ruleDetails=data['data']
    // },error=>{
    //   console.log(error)
    // })
    this.ruleamount=this.amountdata['chkamt']
    this.ruledata=[{"rule":{"lower_limit":0.0,"rule_formula":"A&A","upper_limit":1.0E8,"id":126,"status":1},"rule_data":[{"rule_heading":"Group A(Any 2)","users":["Mr. Thirumurugan J"]}]},{"rule":{"lower_limit":0.0,"rule_formula":"A&B","upper_limit":1.0E8,"id":127,"status":1},"rule_data":[{"rule_heading":"Group A(Any 1)","users":["Mr. Thirumurugan J","Ms. Nalini L"]},{"rule_heading":"Group B(Any 1)","users":["Ms. Meena A",""]}]},{"rule":{"lower_limit":0.0,"rule_formula":"B&B","upper_limit":1.0E8,"id":129,"status":1},"rule_data":[{"rule_heading":"Group B(Any 2)","users":["Ms. Meena A"]}]},{"rule":{"lower_limit":0.0,"rule_formula":"A&C","upper_limit":1.0E8,"id":130,"status":1},"rule_data":[{"rule_heading":"Group A(Any 1)","users":["Mr. Thirumurugan J"]},{"rule_heading":"Group C(Any 1)","users":[]}]},{"rule":{"lower_limit":0.0,"rule_formula":"B&C","upper_limit":1.0E8,"id":131,"status":1},"rule_data":[{"rule_heading":"Group B(Any 1)","users":["Ms. Meena A"]},{"rule_heading":"Group C(Any 1)","users":[]}]},{"rule":{"lower_limit":0.0,"rule_formula":"C&C","upper_limit":1.0E8,"id":132,"status":1},"rule_data":[{"rule_heading":"Group C(Any 2)","users":[]}]}]
        if(this.ruledata!=null){
          this.step2=false;
        } 
        console.log(this.ruledata)
}

back(){
  this.step2=true;

  this.amountdata['chkamt']="";
}


}
