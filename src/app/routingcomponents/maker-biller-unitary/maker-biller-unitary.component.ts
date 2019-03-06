import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-maker-biller-unitary',
  templateUrl: './maker-biller-unitary.component.html',
  styleUrls: ['./maker-biller-unitary.component.css']
})
export class MakerBillerUnitaryComponent implements OnInit {
  billdata:any={};
  states:any;
  billers:any;
  billerlist:any=[];
  billertype:boolean=true;
  billdetails:boolean=false;
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
    this.billertype=false;
    this.billdetails=true;
  }

  cnfsend(){
    this.billdetails=false;
    this.conf=true;
    this.billertype=false;
  }

  succesadd(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    this.success=true;

  }

  backbilltype(){
    this.billdetails=false;
    this.billertype=true;
    this.conf=false;
    this.success=false;
  }

  backbilldetails(){
    this.billdetails=true;
    this.billertype=false;
    this.conf=false;
    this.success=false;
  }

  submitbilldata(){
    console.log(this.billdata)
    this.billdata.status = "Pending";
    this.billdata.initiatedby = "Ms. Deepali Patekar"
    this.billdata.approvedby="--"
    this.billdata.approvedon="--"
    var d =new Date();
    this.billdata.initiatedon = d.toLocaleString();
    this.billdata.uploadfilename = "Unitary"
    var billerData =[];
    billerData=JSON.parse(localStorage.getItem('billdetails'));
    if(billerData){
      this.billdata.id = billerData.length+1;
      billerData.push(this.billdata);
    }else{
      billerData=[]
      this.billdata.id=1;
      billerData.push(this.billdata);

    }
    localStorage.setItem('billdetails', JSON.stringify(billerData));
    console.log(JSON.parse(localStorage.getItem('billdetails')))
  }

}
