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
  
  dashActive:boolean=true;
  cardActive:boolean=false;
  payActive:boolean=false;
  billActive:boolean=false;
  faqActive:boolean=false;
  notActive:boolean=false;
  quickActive:boolean=false;
  profActive:boolean=false;
  pathroute: string;
  constructor(location: Location,private route: ActivatedRoute,private router: Router) { 
    router.events.subscribe((val) => {
      this.pathroute=location.path();
      if(this.pathroute=='/dashboard-maker'){
        this.clickDashEvent()
      }else if(this.pathroute=='/make-payment' || this.pathroute=='/maker-payment-list'){
        this.clickPayEvent();
      }else if(this.pathroute=='/billerlist' || this.pathroute=='/unitary-biller' || this.pathroute=='/maker-biller-bulk'){
        this.clickBillEvent()
      }
  
  });
  }

  ngOnInit() {
  }

  clickDashEvent(){
    this.dashActive=true;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.billActive=false;
  }

  clickPayEvent(){
    this.dashActive=false;
    this.payActive=true;
    this.billActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;

  }
  clickBillEvent(){
    this.dashActive=false;
    this.billActive=true;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
  }

  

  clickQuickEvent(){
    
    this.dashActive=false;
  this.billActive=false;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=true;
    this.notActive=false;
    this.profActive=false;
  
  }

  clickNotEvent(){
    this.dashActive=false;
    this.payActive=false;
    this.billActive=false
    this.quickActive=false;
    this.notActive=true;
    this.profActive=false;

  }

  openbilldrop(){
    this.displaybilldrop='block'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
   
  }

  openpaydrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='block';
    this.displaycarddrop='none';
    this.displayprofile='none';
    

  }

  opencarddrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='block';
    this.displayprofile='none';
   
  }
  clickDash(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
   
    
  }

  openmyprofile(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='block'
   
  }

  closealldrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none'
  }

}
