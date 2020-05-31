import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'
import {AuthService} from '../../api/auth.service'
import {Urlconfig} from '../../urlconfig'
const billtreepath= new Urlconfig().getBilltreeURL()
const gstpath= new Urlconfig().getGstURL()
const supplierpath = new Urlconfig().getSupplierURL()
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
  displayotherdrop='none';
  rolename:any;
  otherActive:boolean=false;
  dashActive:boolean=true;
  cardActive:boolean=false;
  payActive:boolean=false;
  billActive:boolean=false;
  userActive:boolean=false;
  groupActive:boolean=false;
  ruleActive:boolean=false;
  fetchActive:boolean=false;
  orgActive:boolean=false;
  faqActive:boolean=false;
  notActive:boolean=false;
  quickActive:boolean=false;
  profActive:boolean=false;
  public utilityparams:string;
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
      }else if(this.pathroute=='/rmfetch-report'){
        this.clickFetchEvent()
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
    this.supplierurl=supplierpath+'rmdashboard?token='+this.localstoragetoken+'&modules='+this.localstoragemodules;
    this.gsturl=gstpath+'rm-dashboard?token='+this.localstoragetoken+'&modules='+this.localstoragemodules;
    console.log(this.rolename)
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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
    this.fetchActive=false;

  }

  clickFetchEvent(){
    this.orgActive=false;
    this.dashActive=false;
    this.payActive=false;
    this.fetchActive=true;
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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
    this.fetchActive=false;
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

}
