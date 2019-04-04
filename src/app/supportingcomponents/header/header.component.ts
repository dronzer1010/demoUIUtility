import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displaybilldrop='none';
  displaypaydrop='none';
  displaycarddrop='none';
  displayprofile='none';
  displaynotdrop='none';
  displayuserdrop='none';
  displaygroupdrop='none';
  displayruledrop='none';
  rolename:any;
  dashActive:boolean=true;
  cardActive:boolean=false;
  payActive:boolean=false;
  billActive:boolean=false;
  userActive:boolean=false;
  groupActive:boolean=false;
  ruleActive:boolean=false;
  orgActive:boolean=false;
  faqActive:boolean=false;
  notActive:boolean=false;
  quickActive:boolean=false;
  profActive:boolean=false;
  public utilityparams:string;
  pathroute: string;
  constructor(location: Location,private route: ActivatedRoute,private router: Router) { 
    router.events.subscribe((val) => {
      this.pathroute=location.path();
      if(this.pathroute=='/dashboard'){
        this.clickDashEvent()
      }else if(this.pathroute=='/main/make-payment' || this.pathroute=='/main/paymentlist' || this.pathroute=='/main/pending-payments' || this.pathroute=='/main/pending-payments' || this.pathroute=='/main/otp-approve-payment'){
        this.clickPayEvent();
      }else if(this.pathroute=='/main/billerlist' || this.pathroute=='/main/unitary-biller' || this.pathroute=='/main/biller-bulk' || this.pathroute=='/main/otp-approve-biller' || this.pathroute=='/main/pending-biller'){
        this.clickBillEvent()
      }
      else if(this.pathroute=='/main/cardview' || this.pathroute=='/unitary-card' || this.pathroute=='/main/pending-card' ||this.pathroute=='/main/cardview?msg=crdapprsuccess' ||this.pathroute=='/main/cardview?msg=cardsuccess'){
        this.clickCardEvent()
      }else if(this.pathroute=='/main/userview' || this.pathroute=='/unitary-user' || this.pathroute=='/main/pending-user' || this.pathroute=='/main/user-bulk' ||this.pathroute=='/main/userview?msg=usrapprsuccess' ||this.pathroute=='/main/userview?msg=usersuccess'){
        this.clickUserEvent()
      }else if(this.pathroute=='/main/groupview' || this.pathroute=='/main/unitary-group' || this.pathroute=='/main/pending-group' ||this.pathroute=='/main/groupview?msg=grpapprsuccess' ||this.pathroute=='/main/groupview?msg=groupsuccess'){
        this.clickGroupEvent()
      }else if(this.pathroute=='/main/ruleview' || this.pathroute=='/main/unitary-rule' || this.pathroute=='/main/pending-rules' ||this.pathroute=='/main/ruleview?msg=ruleapprsuccess' ||this.pathroute=='/main/ruleview?msg=rulesuccess'){
        this.clickRuleEvent()
      }else if(this.pathroute=='/main/organisation'){
        this.clickOrgEvent()
      }else if(this.pathroute=='/main/profile' || this.pathroute=='/main/repository' || this.pathroute=='/main/notification' || this.pathroute=='/main/sample-bills' || this.pathroute=='/main/templates'){
this.clickNotEvent()
      }
  
  });
  }

  ngOnInit() {
    this.utilityparams=this.route.snapshot.queryParams["token"];
    console.log(this.utilityparams)
    if(this.utilityparams!=null || this.utilityparams!=undefined)
    this.savetoken()
    this.rolename=localStorage.getItem('rolename')
    console.log(this.rolename)
  }

  clickDashEvent(){
    this.orgActive=false;
    this.dashActive=true;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.billActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
  }

  clickOrgEvent(){
    this.orgActive=true;
    this.dashActive=false;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.billActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
  }

  clickPayEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=true;
    this.billActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;

  }
  clickBillEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.billActive=true;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
  }
  clickCardEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=true;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
  }

  

  clickQuickEvent(){
    this.orgActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
    this.dashActive=false;
  this.billActive=false;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=true;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
  }

  clickNotEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false
    this.quickActive=false;
    this.notActive=true;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
  }

  clickGroupEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=true;
    this.ruleActive=false;
  }


  clickUserEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=true;
    this.groupActive=false;
    this.ruleActive=false;
  }


  clickRuleEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=true;
  }

  openbilldrop(){
    this.displaybilldrop='block'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  openpaydrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='block';
    this.displaycarddrop='none';
    this.displayprofile='none';
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  opencarddrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='block';
    this.displayprofile='none';
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }
  clickDash(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  clickOrg(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  openmyprofile(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='block'
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  opennoti(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none'
    this.displaynotdrop='block'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  opennuser(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none'
    this.displaynotdrop='none'
    this.displayuserdrop='block';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  openrule(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none'
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='block'
  }


  opengroup(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none'
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='block';
    this.displayruledrop='none'
  }


  closealldrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none'
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
  }

  logout(){
    localStorage.removeItem('rolename');
   
  }
  savetoken(){
    localStorage.setItem("rolename",this.utilityparams)
  }

}
