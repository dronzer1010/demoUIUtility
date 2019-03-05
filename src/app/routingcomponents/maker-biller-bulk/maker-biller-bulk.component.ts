import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maker-biller-bulk',
  templateUrl: './maker-biller-bulk.component.html',
  styleUrls: ['./maker-biller-bulk.component.css']
})
export class MakerBillerBulkComponent implements OnInit {
  billertype:boolean=true;
  billdetails:boolean=false;
  reviewfile:boolean=false;
  conf:boolean=false;
  success:boolean=false;
  
  constructor() { }

  ngOnInit() {
  }
  billrdetails(){
    this.billdetails=true;
    this.billertype=false;    
    this.reviewfile=false;
    this.conf=false;
    this.success=false;
  }

  upldfile(){
    this.reviewfile=true;
    this.billdetails=false;    
    this.conf=false;
    this.success=false;
    this.billertype=false;    
  }

  revfile(){
    this.conf=true;
    this.reviewfile=false;    
    this.success=false;
    this.billertype=false;
    this.billdetails=false;
  }

  revup(){
    this.success=true;
    this.billertype=false;
    this.billdetails=false;
    this.reviewfile=false;
    this.conf=false;    
  } 
}
