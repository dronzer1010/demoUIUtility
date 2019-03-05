import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-maker-biller-bulk',
  templateUrl: './maker-biller-bulk.component.html',
  styleUrls: ['./maker-biller-bulk.component.css']
})
export class MakerBillerBulkComponent implements OnInit {
  billertype:boolean=true;
  billdetails:boolean=false;
  reviewfile:boolean=false;
  billdata:any={};
  states:any;
  billers:any;
  billerlist:any=[];
  conf:boolean=false;
  success:boolean=false;
  
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('./assets/states.json').subscribe(
      data=>{
        this.states=data;
      }
    )
  }

  getBiller(stateid){
  
    this.httpService.get('./assets/billers.json').subscribe(
      data=>{
        this.billers=data;
        for(var i=0;i<this.billers.length;i++){
          if(this.billers[i]['code']==stateid){
            this.billerlist=[];
            this.billerlist=this.billers[i]['billers']
          }
        }
        console.log(this.billerlist)
       
      }
    )
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
