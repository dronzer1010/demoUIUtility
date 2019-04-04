import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-billerunitary',
  templateUrl: './billerunitary.component.html',
  styleUrls: ['./billerunitary.component.css']
})
export class BillerUnitaryComponent implements OnInit {
  billdata:any={};
  states:any;
  billers:any;
  billerlist:any=[];
  billertype:boolean=true;
  billdetails:boolean=false;
  conf:boolean=false;
  success:boolean=false;
  filename:string;
  samplebill:any=[];
  showsamplebill:boolean=false;
  constructor(private httpService: HttpClient,private _lightbox: Lightbox) { }

  ngOnInit() {
    this.httpService.get('./assets/states.json').subscribe(
      data=>{
        this.states=data;
      }
    )

    
  }

  open(index:any): void {
    // open lightbox
    this._lightbox.open(this.samplebill,index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  showBillSample(){

    this.httpService.get('./assets/bills.json').subscribe(
      data=>{
       console.log(data)
      
        
        this.samplebill=data;
        this.showsamplebill=true;
    
      }
    )
   
  }

  UploadFile(file: HTMLInputElement){
    this.filename = file.value;
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
    this.billdata.initiatedby = "Mr. Mukund javir"
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