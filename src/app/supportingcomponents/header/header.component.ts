import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'
import {AuthService} from '../../api/auth.service'
import {Urlconfig} from '../../urlconfig'
const billtreepath= new Urlconfig().getBilltreeURL()
const gstpath= new Urlconfig().getGstURL()
const supplierpath = new Urlconfig().getSupplierURL()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    '(document:click)': 'closeAllDropdown($event)',
  },
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
  displayotherdrop='none';
  rolename:any;
  dashActive:boolean=true;
  cardActive:boolean=false;
  otherActive:boolean=false;
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
  authmatrix:string;
  userdata:any={};
  pathroute: string;
  redirecttoken:string;
  redirectmodules:any=[]
  localstoragetoken:string;
  localstoragemodules:any=[];
  supplierurl:string;
  gsturl:string;
  modules:any=[];
  showsuppliermodule:boolean=false;
  showgstmodule:boolean=false;
  showsolutions:boolean=false;
  constructor(location: Location,private route: ActivatedRoute,private router: Router,private usrservice:UserserviceService,private auth:AuthService,private _eref: ElementRef) { 
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
   
    this.redirecttoken=this.route.snapshot.queryParams["token"];
    this.redirectmodules=this.route.snapshot.queryParams["modules"];
    if(this.redirecttoken!=undefined){
      console.log("hello")
      this.auth.saveToken(this.redirecttoken)
    }
    if(this.redirectmodules!=undefined){
      localStorage.setItem('modules',this.redirectmodules)
    }
    this.localstoragemodules=localStorage.getItem('modules')
    this.localstoragetoken=localStorage.getItem('token')
    this.supplierurl=supplierpath+'main?token='+this.localstoragetoken+'&modules='+this.localstoragemodules;
    this.gsturl=gstpath+'main/dashboard?token='+this.localstoragetoken+'&modules='+this.localstoragemodules;
   
    this.getModules()
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
    this.otherActive=false;
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
    this.otherActive=false;
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
    this.otherActive=false;

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
    this.otherActive=false;
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
    this.otherActive=false;
  }

  clickOtherEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.cardActive=false;
    this.userActive=false;
    this.groupActive=false;
    this.ruleActive=false;
    this.otherActive=true;
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
    this.otherActive=false;
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
    this.otherActive=false;
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
    this.otherActive=false;
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
    this.otherActive=false;
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
    this.otherActive=false;
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
    this.displayotherdrop='none'
  }
  openotherdrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
    this.displaynotdrop='none'
    this.displayuserdrop='none';
    this.displaygroupdrop='none';
    this.displayruledrop='none'
    this.displayotherdrop='block'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
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
    this.displayotherdrop='none'
  }

  logout(){
    this.auth.logout();
    localStorage.removeItem('rolename');
   
  }
  savetoken(){
    localStorage.setItem("rolename",this.utilityparams)
  }

  private getUserDetail(){
this.usrservice.getUserDetails().subscribe(res=>{
  //console.log(res)
  this.userdata=res['Data'];
  console.log(this.userdata)
  this.rolename=this.userdata['dualrole']
  this.authmatrix=this.userdata['authmtrix']
},error=>{
  console.log(error)
})
  }

  private getModules(){
    this.modules=localStorage.getItem('modules')
    if(this.modules.length>0){
      if(this.modules.includes('GST-Payments') || this.modules.includes('Supplier_module')){
        this.showsolutions=true;
        if(this.modules.includes('Supplier_module')){
          this.showsuppliermodule=true;
        }else{
          this.showsuppliermodule=false;
        }
        if(this.modules.includes('GST-Payments')){
          this.showgstmodule=true;
        }else{
          this.showgstmodule=false;
        }
      }else{
        this.showsolutions=false;
      }
    }else{
      this.showsolutions=false;
    }
  }

  closeAllDropdown(){
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
    this.closealldrop()
  }

}
