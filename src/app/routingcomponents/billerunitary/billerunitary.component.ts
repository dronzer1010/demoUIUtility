import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import { BillerserviceService } from '../../api/billerservice.service'
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
  parameters:any=[];
  bus:any=[];
  circles:any=[];
  para1:any;
  para2:any;
  para3:any;
  showcircles:boolean=false;
  showbus:boolean=false;
  statename:string;
  
  constructor(private httpService: HttpClient,private _lightbox: Lightbox,private billerservice: BillerserviceService) { }

  ngOnInit() {
    // this.httpService.get('./assets/states.json').subscribe(
    //   data=>{
    //     this.states=data;
    //   }
    // )
this.getallStates()

    
  }

  open(index:any): void {
    // open lightbox
    this._lightbox.open(this.samplebill,index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }


private getallStates(){
    this.billerservice.getAllStates().then(resp=>{
        console.log(resp)
        this.states=resp;
    },error=>{
        console.log(error)
    })
}

  showBillSample(){

    // this.httpService.get('./assets/bills.json').subscribe(
    //   data=>{
    //    console.log(data)
      
        
    //     this.samplebill=data;
    //     this.showsamplebill=true;
    
    //   }
    // )

    this.samplebill=[
      {
          "id":1,
          "src":"assets/samplebills/Image (1).jpg",
          "thumb":"assets/samplebills/thumbs/Image (2)_tn.jpg",
          "caption":"Eastern Power Distribution Company of A.P. Ltd.",
          "state":"Andhra Pradesh"
      },
      {
          "id":2,
          "src":"assets/samplebills/Image (2).jpg",
          "thumb":"assets/samplebills/thumbs/Image (2)_tn.jpg",
          "caption":"Southern Power Distribution Company of A.P Ltd (APSPDCL)",
          "state":"Andhra Pradesh"
      },
      {
          "id":3,
          "src":"assets/samplebills/Image (3).jpg",
          "thumb":"assets/samplebills/thumbs/Image (3)_tn.jpg",
          "caption":"Ajmer Vidyut Vitran Nigam Limited (AVVNL)",
          "state":"Rajasthan"
      },
      {
          "id":4,
          "src":"assets/samplebills/Image (4).jpg",
          "thumb":"assets/samplebills/thumbs/Image (4)_tn.jpg",
          "caption":"Bangalore Electricity supply company Ltd.",
          "state":"Karnataka"
      },
      {
          "id":5,
          "src":"assets/samplebills/Image (5).jpg",
          "thumb":"assets/samplebills/thumbs/Image (5)_tn.jpg",
          "caption":"Bharatpur Electricity Services Limited",
          "state":"Rajasthan"
      },
      {
          "id":6,
          "src":"assets/samplebills/Image (6).jpg",
          "thumb":"assets/samplebills/thumbs/Image (6)_tn.jpg",
          "caption":"BSES Rajdhani",
          "state":"New Delhi"
      },
      {
          "id":7,
          "src":"assets/samplebills/Image (7).jpg",
          "thumb":"assets/samplebills/thumbs/Image (7)_tn.jpg",
          "caption":"BSES Yamuna",
          "state":"New Delhi"
      },
      {
          "id":8,
          "src":"assets/samplebills/Image (8).jpg",
          "thumb":"assets/samplebills/thumbs/Image (8)_tn.jpg",
          "caption":"CESU, Odisha",
          "state":"Odisha"
      },
      {
          "id":9,
          "src":"assets/samplebills/Image (9).jpg",
          "thumb":"assets/samplebills/thumbs/Image (9)_tn.jpg",
          "caption":"Gulbarga Electricity Supply Company Limited (GESCOM)",
          "state":"Karnataka"
      },
      {
          "id":10,
          "src":"assets/samplebills/Image (10).jpg",
          "thumb":"assets/samplebills/thumbs/Image (10)_tn.jpg",
          "caption":"Hubli Electricity Supply Company Ltd. (HESCOM)",
          "state":"Karnataka"
      },
      {
          "id":11,
          "src":"assets/samplebills/Image (11).jpg",
          "thumb":"assets/samplebills/thumbs/Image (11)_tn.jpg",
          "caption":"Brihanmumbai Electricity Supply and Transport Undertaking (BEST Undertaking)",
          "state":"Maharashtra"
      },
      {
          "id":12,
          "src":"assets/samplebills/Image (12).jpg",
          "thumb":"assets/samplebills/thumbs/Image (12)_tn.jpg",
          "caption":"Jodhpur Vidyut Vitran Nigam Limited (JDVVNL)",
          "state":"Rajasthan"
      },
      {
          "id":13,
          "src":"assets/samplebills/Image (13).jpg",
          "thumb":"assets/samplebills/thumbs/Image (13)_tn.jpg",
          "caption":"JAMSHEDPUR UTILITIES &SERVICES COMPANY LTD (JUSCO)",
          "state":"Jharkhand"
      },
      {
          "id":14,
          "src":"assets/samplebills/Image (14).jpg",
          "thumb":"assets/samplebills/thumbs/Image (14)_tn.jpg",
          "caption":"Kota Electricity Distribution Limited(KEDL)",
          "state":"Rajasthan"
      },
      {
          "id":15,
          "src":"assets/samplebills/Image (15).jpg",
          "thumb":"assets/samplebills/thumbs/Image (15)_tn.jpg",
          "caption":"Kerala State Electricity Board Ltd (KSEB Ltd)",
          "state":"Kerala"
      },
      {
          "id":16,
          "src":"assets/samplebills/Image (16).jpg",
          "thumb":"assets/samplebills/thumbs/Image (16)_tn.jpg",
          "caption":"Calcutta Electric Supply Corporation (India) Limited",
          "state":"West Bengal"
      },
      {
          "id":17,
          "src":"assets/samplebills/Image (17).jpg",
          "thumb":"assets/samplebills/thumbs/Image (17)_tn.jpg",
          "caption":"Meghalaya Power Dist Corp Ltd",
          "state":"Meghalaya"
      },
      {
          "id":18,
          "src":"assets/samplebills/Image (18).jpg",
          "thumb":"assets/samplebills/thumbs/Image (18)_tn.jpg",
          "caption":"Madhya Pradesh Madhya Kshetra Vidyut Vitran Company Limited (MPCZ)",
          "state":"Madhya Pradesh"
      },
      {
          "id":19,
          "src":"assets/samplebills/Image (19).jpg",
          "thumb":"assets/samplebills/thumbs/Image (19)_tn.jpg",
          "caption":"MP Poorv Kshetra Vidyut Vitaran-Jabalpur",
          "state":"Madhya Pradesh"
      },
      {
          "id":20,
          "src":"assets/samplebills/Image (20).jpg",
          "thumb":"assets/samplebills/thumbs/Image (20)_tn.jpg",
          "caption":"MSEDCL",
          "state":"Maharashtra"
      },
      {
          "id":21,
          "src":"assets/samplebills/Image (21).jpg",
          "thumb":"assets/samplebills/thumbs/Image (21)_tn.jpg",
          "caption":"New Delhi Municipal Council (NDMC) - Electricity",
          "state":"New Delhi"
      },
      {
          "id":22,
          "src":"assets/samplebills/Image (22).jpg",
          "thumb":"assets/samplebills/thumbs/Image (22)_tn.jpg",
          "caption":"NESCO Utility",
          "state":"Odisha"
      },
      {
          "id":23,
          "src":"assets/samplebills/Image (23).jpg",
          "thumb":"assets/samplebills/thumbs/Image (23)_tn.jpg",
          "caption":"North Bihar Power Distribution Co. Ltd (NBPDCL)",
          "state":"Bihar"
      },
      {
          "id":24,
          "src":"assets/samplebills/Image (24).jpg",
          "thumb":"assets/samplebills/thumbs/Image (24)_tn.jpg",
          "caption":"NOIDA POWER COMPANY LTD (NPCL)",
          "state":"Uttar Pradesh"
      },
      {
          "id":25,
          "src":"assets/samplebills/Image (25).jpg",
          "thumb":"assets/samplebills/thumbs/Image (25)_tn.jpg",
          "caption":"Punjab State Power Corporation Limited (PSPCL)",
          "state":"Punjab"
      },
      {
          "id":26,
          "src":"assets/samplebills/Image (26).jpg",
          "thumb":"assets/samplebills/thumbs/Image (26)_tn.jpg",
          "caption":"Reliance Energy - Mumbai",
          "state":"Maharashtra"
      },
      {
          "id":27,
          "src":"assets/samplebills/Image (27).jpg",
          "thumb":"assets/samplebills/thumbs/Image (27)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Maharashtra"
      },
      {
          "id":28,
          "src":"assets/samplebills/Image (28).jpg",
          "thumb":"assets/samplebills/thumbs/Image (28)_tn.jpg",
          "caption":"Madhya Pradesh Paschim Kshetra Vidyut Vitaran Company Ltd. (MPPKVVCL)",
          "state":"Madhya Pradesh"
      },
      {
          "id":29,
          "src":"assets/samplebills/Image (29).jpg",
          "thumb":"assets/samplebills/thumbs/Image (29)_tn.jpg",
          "caption":"SNDL Nagpur",
          "state":"Maharashtra"
      },
      {
          "id":30,
          "src":"assets/samplebills/Image (30).jpg",
          "thumb":"assets/samplebills/thumbs/Image (30)_tn.jpg",
          "caption":"South Bihar Power Distribution",
          "state":"Bihar"
      },
      {
          "id":31,
          "src":"assets/samplebills/Image (31).jpg",
          "thumb":"assets/samplebills/thumbs/Image (31)_tn.jpg",
          "caption":"Southern Electricity Supply Company Of Odisha Limited (SOUTHCO)",
          "state":"Odisha"
      },
      {
          "id":32,
          "src":"assets/samplebills/Image (32).jpg",
          "thumb":"assets/samplebills/thumbs/Image (32)_tn.jpg",
          "caption":"TATA POWER-MUMBAI",
          "state":"Maharashtra"
      },
      {
          "id":33,
          "src":"assets/samplebills/Image (33).jpg",
          "thumb":"assets/samplebills/thumbs/Image (33)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Gujarat"
      },
      {
          "id":34,
          "src":"assets/samplebills/Image (34).jpg",
          "thumb":"assets/samplebills/thumbs/Image (34)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Uttar Pradesh"
      },
      {
          "id":35,
          "src":"assets/samplebills/Image (35).jpg",
          "thumb":"assets/samplebills/thumbs/Image (35)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Gujarat"
      },
      {
          "id":36,
          "src":"assets/samplebills/Image (36).jpg",
          "thumb":"assets/samplebills/thumbs/Image (36)_tn.jpg",
          "caption":"TATA POWER DELHI DISTRIBUTION LIMITED",
          "state":"New Delhi"
      },
      {
          "id":37,
          "src":"assets/samplebills/Image (37).jpg",
          "thumb":"assets/samplebills/thumbs/Image (37)_tn.jpg",
          "caption":"Northern Power Distribution Company Limited: Warrangal (TSNPDCL)",
          "state":"Telangana"
      },
      {
          "id":38,
          "src":"assets/samplebills/Image (38).jpg",
          "thumb":"assets/samplebills/thumbs/Image (38)_tn.jpg",
          "caption":"TSSPDCL",
          "state":"Telangana"
      },
      {
          "id":39,
          "src":"assets/samplebills/Image (39).jpg",
          "thumb":"assets/samplebills/thumbs/Image (39)_tn.jpg",
          "caption":"Uttar Pradesh Power Corporation Ltd. (UPPCL)",
          "state":"Uttar Pradesh"
      },
      {
          "id":40,
          "src":"assets/samplebills/Image (40).jpg",
          "thumb":"assets/samplebills/thumbs/Image (40)_tn.jpg",
          "caption":"Uttrakhand Power Corporation Limited",
          "state":"Uttarakhand"
      },
      {
          "id":41,
          "src":"assets/samplebills/Image (41).jpg",
          "thumb":"assets/samplebills/thumbs/Image (41)_tn.jpg",
          "caption":"West Bengal State Electricity Distribution Company Limited (WBSEDCL)",
          "state":"West Bengal"
      },
      
      {
          "id":42,
          "src":"assets/samplebills/Image (42).jpg",
          "thumb":"assets/samplebills/thumbs/Image (42)_tn.jpg",
          "caption":"Dakshin Haryana Bijli Vitran Nigam (DHBVN)",
          "state":"Haryana"
      }
  ]
  this.showsamplebill=true;
   
  }

  UploadFile(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }

  getBiller(stateid){
  this.billerlist=[];
   this.billerservice.getbillersbystate(stateid).then(resp=>{
       console.log(resp)
       this.billerlist=resp;
   },error=>{
       console.log(error)
   })
  
  }

  getBillerDetails(billername){
      this.para1="";
      this.para2="";
      this.para3="";
      this.showbus=false;
      this.showcircles=false;
this.billerservice.getbillerdetails(billername).then(resp=>{
    console.log(resp)
    this.parameters=resp['data'];
    
    if(this.parameters['bus'].length>0){
        this.bus=this.parameters.bus;
       this.showbus=true;
        
        console.log(this.bus)
    }else{
        this.bus=[];
        this.showbus=false;
        console.log(this.bus)
    }
    if(this.parameters['circles'].length>0){
        this.circles=this.parameters.circles
        this.showcircles=true;
        console.log(this.circles)
    }else{
        this.circles=[];
        this.showcircles=false;
        console.log(this.circles)
    }
    if(this.parameters['parameter'].length>0){
        this.para1=this.parameters['parameter']
        console.log(this.para1)
    }else{
        
        console.log(this.para1)
    }
    if(this.parameters['display_name_bu']!=null){
        this.showbus=true;
        this.para2=this.parameters['display_name_bu']
        
    }else{
        this.showbus=false;
    }
    if(this.parameters['display_name_circle']!=null){
        this.showcircles=true;
        this.para3=this.parameters['display_name_circle']
    }else{
        this.showcircles=false;
    }
},error=>{
    console.log(error)
})
  }

  getStateName(id:any){
      console.log(id)
      console.log(this.states)
for(var i=0;i<=this.states.length;i++){
    if(this.states[i]['_id']==id){
        this.statename=this.states[i]['name']
        break;
    }else{
        this.statename="Statename"
    }
}
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

//   submitbilldata(){
//     console.log(this.billdata)
//     this.billdata.status = "Pending with checker";
//     this.billdata.initiatedby = "Mr. Mukund javir"
//     this.billdata.approvedby="--"
//     this.billdata.approvedon="--"
//     var d =new Date();
//     this.billdata.initiatedon = d.toLocaleString();
//     this.billdata.uploadfilename = "Unitary"
//     var billerData =[];
//     billerData=JSON.parse(localStorage.getItem('billdetails'));
//     if(billerData){
//       this.billdata.id = billerData.length+1;
//       billerData.push(this.billdata);
//     }else{
//       billerData=[]
//       this.billdata.id=1;
//       billerData.push(this.billdata);

//     }
//     localStorage.setItem('billdetails', JSON.stringify(billerData));
//     console.log(JSON.parse(localStorage.getItem('billdetails')))
//   }

  submitbilldata(){
    console.log(this.billdata)
this.billerservice.registerbills(this.billdata).then(resp=>{
    console.log(resp)
},error=>{
    console.log(error)
})
  }



}
