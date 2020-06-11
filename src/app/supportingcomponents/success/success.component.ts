import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd,RoutesRecognized   } from '@angular/router';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  previousUrl: string;
  currentUrl: string;
  params:string;
  groupsuccess:boolean=false;
  cardsuccess:boolean=false;
  usersucess:boolean=false;
  rulesuccess:boolean=false;
  billsuccess:boolean=false;
  billnewsuccess:boolean=false;
  usrapprsuccess:boolean=false;
  grpapprsuccess:boolean=false;
  ruleapprsuccess:boolean=false;
  crdapprsuccess:boolean=false;
  billapprsuccess:boolean=false;
  billnewapprsuccess:boolean=false;
  paymentsuccess:boolean=false;
  paymentnewsuccess:boolean=false;
  paymentapprsuccess:boolean=false;
  paymentnewapprsuccess:boolean=false;
  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.queryParams["msg"];
    console.log(this.params);
    if(this.params=='groupsuccess'){
      this.groupsuccess=true;
    }else if(this.params=='cardsuccess'){
      this.cardsuccess=true;
    }else if(this.params=='rulesuccess'){
      this.rulesuccess=true;
    }else if(this.params=='usersuccess'){
      this.usersucess=true;
    }else if(this.params=='usrapprsuccess'){
      this.usrapprsuccess=true;
    }else if(this.params=='crdapprsuccess'){
      this.crdapprsuccess=true;
    }else if(this.params=='ruleapprsuccess'){
      this.ruleapprsuccess=true;
    }else if(this.params=='grpapprsuccess'){
      this.grpapprsuccess=true;
    }else if(this.params=='billsuccess'){
      this.billsuccess=true;
    }else if(this.params=='billapprsuccess'){
      this.billapprsuccess=true;
    }else if(this.params=='paymentsuccess'){
      this.paymentsuccess=true;
    }else if(this.params=='paymentapprsuccess'){
      this.paymentapprsuccess=true;
    }
    else if(this.params=='paymentnewsuccess'){
      this.paymentnewsuccess=true;
    }
    else if(this.params=='paymentnewapprsuccess'){
      this.paymentnewapprsuccess=true;
    }
    else if(this.params=='billnewapprsuccess'){
      this.billnewapprsuccess=true;
    }
    else if(this.params=='billnewsuccess'){
      this.billnewsuccess=true;
    }
    else{
      this.groupsuccess=false;
      this.cardsuccess=false;
      this.rulesuccess=false;
      this.usersucess=false;
      this.grpapprsuccess=false;
      this.usrapprsuccess=false;
      this.ruleapprsuccess=false;
      this.crdapprsuccess=false;
      this.billsuccess=false;
      this.billapprsuccess=false;
      this.paymentapprsuccess=false;
      this.paymentsuccess=false;
      this.paymentnewapprsuccess=false;
      this.paymentnewsuccess=false;
      this.billnewsuccess=false;
      this.billnewapprsuccess=false;
    }
  }

}
