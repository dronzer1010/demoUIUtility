import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// declare var jquery:any;
// declare var $ :any;
import{RuleserviceService} from '../../api/ruleservice.service'
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
  constructor(private ruleservice:RuleserviceService ) { }

  ngOnInit() {
  }

  validateMobileNo(value){    
    var k = value.keyCode;
          return ((k >= 48 && k <= 57) || k == 8);
  }

  rulevalidation(){
    this.ruleservice.validateRule(this.amountdata).subscribe(data=>{
      console.log("Rule Data")
      //console.log(data)
      this.ruleamount=this.amountdata['chkamt']
      this.ruledata=data['data']
      if(this.ruledata!=null){
        this.step2=false;
      } 
      console.log(this.ruledata)
      //this.ruleDetails=data['data']
    },error=>{
      console.log(error)
    })
 
}

back(){
  this.step2=true;

  this.amountdata['chkamt']="";
}


}
