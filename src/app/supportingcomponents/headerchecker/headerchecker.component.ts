import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-headerchecker',
  templateUrl: './headerchecker.component.html',
  styleUrls: ['./headerchecker.component.css']
})
export class HeadercheckerComponent implements OnInit {
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
      if(this.pathroute=='/dashboard-checker'){
        this.clickDashEvent()
      }else if(this.pathroute=='/checker-payments' || this.pathroute=='/checker-approve-payments'){
        this.clickPayEvent();
      }else if(this.pathroute=='/checker-biller' || this.pathroute=='/pending-biller'){
        this.clickBillEvent()
      }
  
  });
   }

  ngOnInit() {
  }
  openbilldrop(){
    this.displaybilldrop='block'
    this.displaypaydrop='none';
    this.displaycarddrop='none';
    this.displayprofile='none';
   
  }
  clickBillEvent(){
    this.dashActive=false;
    this.payActive=false;
    this.faqActive=false;
    this.quickActive=false;
    this.notActive=false;
    this.profActive=false;
    this.billActive=true;
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

  openpaydrop(){
    this.displaybilldrop='none'
    this.displaypaydrop='block';
    this.displaycarddrop='none';
    this.displayprofile='none';
   
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
