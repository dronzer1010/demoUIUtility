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
  pathroute: string;
  constructor(location: Location,private route: ActivatedRoute,private router: Router) { 
    router.events.subscribe((val) => {
      this.pathroute=location.path();
      if(this.pathroute=='/dashboard'){
        this.clickDashEvent()
      }else if(this.pathroute=='/make-payment' || this.pathroute=='/maker-payment-list' || this.pathroute=='/checker-approve-payments' || this.pathroute=='/checker-approve-payments' || this.pathroute=='/otp-approve-payment'){
        this.clickPayEvent();
      }else if(this.pathroute=='/billerlist' || this.pathroute=='/unitary-biller' || this.pathroute=='/maker-biller-bulk' || this.pathroute=='/otp-approve-biller' || this.pathroute=='/pending-biller'){
        this.clickBillEvent()
      }
      else if(this.pathroute=='/cardview' || this.pathroute=='/unitary-card' || this.pathroute=='/pending-card'){
        this.clickCardEvent()
      }else if(this.pathroute=='/userview' || this.pathroute=='/unitary-user' || this.pathroute=='/pending-user' || this.pathroute=='/user-bulk'){
        this.clickUserEvent()
      }else if(this.pathroute=='/groupview' || this.pathroute=='/unitary-group' || this.pathroute=='/pending-group'){
        this.clickGroupEvent()
      }else if(this.pathroute=='/ruleview' || this.pathroute=='/unitary-rule' || this.pathroute=='/pending-rules'){
        this.clickRuleEvent()
      }else if(this.pathroute=='/organisation'){
        this.clickOrgEvent()
      }else if(this.pathroute=='/profile'){
this.clickNotEvent()
      }
  
  });
  }

  ngOnInit() {
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

}
