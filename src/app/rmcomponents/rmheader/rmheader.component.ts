import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'
import {AuthService} from '../../api/auth.service'
@Component({
  selector: 'app-rmheader',
  templateUrl: './rmheader.component.html',
  styleUrls: ['./rmheader.component.css']
})
export class RmheaderComponent implements OnInit {
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
  userdata:any={};
  pathroute: string;
  constructor(location: Location,private route: ActivatedRoute,private router: Router,private usrservice:UserserviceService,private auth:AuthService) { 

    router.events.subscribe((val) => {
      this.pathroute=location.path();
      if(this.pathroute=='/rmdashboard'){
        this.clickDashEvent()
      }else if(this.pathroute=='/rmpayment'){
        this.clickPayEvent();
      }else if(this.pathroute.includes('rmorggroups') || this.pathroute=='/rmgrouporganisation'){
        this.clickGroupEvent()
      }else if(this.pathroute=='/rmrulevalidation'){
        this.clickRuleEvent()
      }else if(this.pathroute=='/rmorganisation' || this.pathroute.includes('rmorganisationdetail') ||this.pathroute.includes('rmbills') || this.pathroute.includes('rmuserreports') || this.pathroute.includes('rmcards')){
        this.clickOrgEvent()
      }else if(this.pathroute=='/rmprofile' || this.pathroute=='/rmrepository' || this.pathroute=='/rmnotificationmatrix' || this.pathroute=='/rmsample-bills' || this.pathroute=='/rmtemplates'){
this.clickNotEvent()
      }
  
  });
  }

  ngOnInit() {
    this.getUserDetail()

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
    this.auth.logout();
    localStorage.removeItem('rolename');
   
  }

  private getUserDetail(){
    this.usrservice.getUserDetails().subscribe(res=>{
      //console.log(res)
      this.userdata=res['Data'];
      console.log(this.userdata)
      this.rolename=this.userdata['dualrole']
    },error=>{
      console.log(error)
    })
      }

      savetoken(){
        localStorage.setItem("rolename",this.utilityparams)
      }

}
