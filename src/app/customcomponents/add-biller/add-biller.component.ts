import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import { BillerserviceService } from '../../api/billerservice.service'
import { ToastrService } from 'ngx-toastr'
import{LoaderService} from '../../api/loader.service'
import { Router,ActivatedRoute } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'
import {AuthService} from '../../api/auth.service'
import {Config} from '../../config'
import { e } from '@angular/core/src/render3';
const path = new Config().getutilityBaseUrl();
const gravitaOrgId = new Config().getGravitaOrgId()
const gravitUserId = new Config().getGravitaUserId()
@Component({
  selector: 'app-add-biller',
  templateUrl: './add-biller.component.html',
  styleUrls: ['./add-biller.component.css']
})
export class AddBillerComponent implements OnInit {
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
  public downloadFileName:string;
  fileUpload:File;
  users: any[] = [];
  dropdownSettings1 = {};
  selectedItems1 = [];
  dropdownCat = [];
  params:string;
  updatebiller:boolean=false;
  orgId:any;
  constructor(private httpService: HttpClient,private _lightbox: Lightbox,private billerservice: BillerserviceService,private toastr: ToastrService,private loaderService: LoaderService,private router: Router,private activatedRoute: ActivatedRoute,private userservice:UserserviceService,private auth:AuthService) { }

  ngOnInit() {
    
    // this.httpService.get('./assets/states.json').subscribe(
    //   data=>{
    //     this.states=data;
    //   }
    // )
// this.billdata={
//     "contact":"8960777767",
//     "accno":"873779734973",
//     "ifsc":"SBIN0000539",
//     "bank":"State Bank of India",
//     "consumerno":"8458499545",
//     "email":"deepanshu@aquapay.in",
//     "glexpensecode":"484849/333",
//     "branch":"Andheri East MIDC",
// }

    this.params = this.activatedRoute.snapshot.queryParams["id"];  
this.getallStates()
this.loadCurrentUserDetails()
if(this.params!=undefined || this.params!=null){
    this.loaderService.display(true)
    this.updatebiller=true
    this.billerservice.getBillerDetailsByiId(this.params).then(resp=>{
      //console.log(resp)
      if(resp['msg']=='succes'){
        this.loaderService.display(true)
        this.billdata['utilitytype']=resp['billers']['utilitytype']
        this.billdata['state']=resp['billers']['state']
        this.billdata['billername']=resp['billers']['billername']
        this.billdata['circle']=resp['billers']['circle']
        this.billdata['contact']=resp['billers']['contact']
        this.billdata['accno']=resp['billers']['accno']
        this.billdata['ifsc']=resp['billers']['ifsc']
        this.billdata['bank']=resp['billers']['bank']
        this.billdata['consumerno']=resp['billers']['consumerno']
        this.billdata['bucode']=resp['billers']['bucode']
        this.billdata['email']=resp['billers']['email']
        this.billdata['branch']=resp['billers']['branch']
        this.billdata['glexpensecode']=resp['billers']['glexpensecode']
        this.billdata['id']=resp['billers']['id']
        this.loaderService.display(false)
        this.getBiller(resp['billers']['state'])
        this.getBillerDetails(resp['billers']['billername'])
        
      }else{
          console.log("Unable to fetch Details")
      }
      
    },error=>{
      console.log(error)
      this.loaderService.display(false)
    })
  }else{
    this.updatebiller=false;
  }
this.dropdownSettings1 = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: false,
    enableCheckAll:true
  };
//   this.dropdownCat = [
//     { item_id: "6f6af57a-5c48-442e-b5b8-8b3559b10cd9", item_text: 'Electricity' }
//   ];
    
  }

  open(index:any): void {
    // open lightbox
    this._lightbox.open(this.samplebill,index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  

private loadCurrentUserDetails(){
    this.userservice.getUserDetails().subscribe(resp=>{
       // console.log(resp)
        this.orgId=resp['Data']['orgid']
        this.loadAllUsers()
    },error=>{
        console.log(error)
    })
}
private getallStates(){
    this.billerservice.getAllStates_new().then(resp=>{
       // console.log(resp)
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

  UploadFile(files): void {
    this.loaderService.display(true);
    //console.log("File Upload Started")
    if (files.length === 0) {
        return;
      }
      let fileToUpload =  files.target.files[0];
      const formData = new FormData();
      this.downloadFileName=fileToUpload['name']
      formData.append('file', fileToUpload, fileToUpload.name);
      this.httpService.post(path+`api/v2/bill_attachment_upload`, formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
            
           // console.log(event['body'])
            if(event['body']!=undefined){
            var attachment = Object.values(event['body'])[1]
             this.billdata['bill_attachment']=attachment
             //console.log(this.billdata['bill_attachment'])
             this.loaderService.display(false);
            }else{
                this.billdata['bill_attachment']="Not Uploaded yet"; 
                //console.log(this.billdata['bill_attachment'])
            }
            
        },error=>{
          this.loaderService.display(false);
            this.toastr.error(error['error']['msg'],"Alert",{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
        });
   }

  getBiller(stateid){
  this.billerlist=[];
   this.billerservice.getbillersbystateNew(stateid).then(resp=>{
       //console.log(resp)
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
this.billerservice.getbillerdetailsNew(billername).then(resp=>{
    //console.log(resp)
    this.parameters=resp['data'];
    
    if(this.parameters['bus'].length>0){
        this.bus=this.parameters.bus;
       this.showbus=true;
        
        //console.log(this.bus)
    }else{
        this.bus=[];
        this.showbus=false;
       // console.log(this.bus)
    }
    if(this.parameters['circles'].length>0){
        this.circles=this.parameters.circles
        this.showcircles=true;
       // console.log(this.circles)
    }else{
        this.circles=[];
        this.showcircles=false;
       // console.log(this.circles)
    }
    if(this.parameters['parameter'].length>0){
        this.para1=this.parameters['parameter']
       // console.log(this.para1)
    }else{
        
      //  console.log(this.para1)
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
     // console.log(id)
      //console.log(this.states)
for(var i=0;i<=this.states.length;i++){
    if(this.states[i]['id']==id){
        this.statename=this.states[i]['name']
        break;
    }else{
        this.statename="Statename"
    }
}
  }

  onCatSelect(approver:any){
    //  console.log("Single Selection")
    //console.log(approver)
   // console.log(this.selectedItems1)
    //var checkerid=approver.map(checker=>checker['item_id']).join(',');
   // console.log(checkerid)
    //this.supplierData['selectcheckertemp'] = this.supplierData['selectchecker'].map(checker => checker['id']).join(','); 
  }

  onSelectAll(approver:any){
    //  console.log("Select All")
     // console.log(approver)
     // console.log(this.selectedItems1)
  }

  billrdetails(){
    
    if(this.billdata['billername']==undefined|| this.billdata['billername']==null){
        this.toastr.warning("Select biller first!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }else if(this.billdata['state']==undefined|| this.billdata['state']==null){
        this.toastr.warning("Select state first!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }else if(this.billdata['utilitytype']==undefined|| this.billdata['utilitytype']==null){
        this.toastr.warning("Select category first!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }else{
        this.billertype=false;
        this.billdetails=true;
    }
  }

  cnfsend(){
     // console.log(this.selectedItems1)
       var checkerid=this.selectedItems1.map(checker=>checker['item_id']).join(',');
   //console.log(checkerid)
   this.billdata['selectcheckertemp']=checkerid
//    console.log(this.billdata['selectcheckertemp'])
//    console.log(this.showbus)
//    console.log(this.showcircles)
   if(this.showbus==true){
   if(this.billdata['consumerno']==undefined && this.billdata['glexpensecode']==undefined && this.billdata['email']==undefined && this.billdata['ifsc']==undefined && this.billdata['accno']==undefined && this.billdata['contact']==undefined && this.billdata['bucode']==undefined ){
    this.toastr.warning("Please fill all the details first!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
   }else{
    this.billdetails=false;
    this.conf=true;
    this.billertype=false;
   }
}else if(this.showcircles==true){
    if(this.billdata['consumerno']==undefined && this.billdata['glexpensecode']==undefined && this.billdata['email']==undefined && this.billdata['ifsc']==undefined && this.billdata['accno']==undefined && this.billdata['contact']==undefined && this.billdata['cirle']==undefined){
        this.toastr.warning("Please fill all the details first!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }else{
        this.billdetails=false;
        this.conf=true;
        this.billertype=false;
    }
}else{
    if(this.billdata['consumerno']==undefined && this.billdata['glexpensecode']==undefined && this.billdata['email']==undefined && this.billdata['ifsc']==undefined && this.billdata['accno']==undefined && this.billdata['contact']==undefined){
        this.toastr.warning("Please fill all the details first!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }else{
        this.billdetails=false;
        this.conf=true;
        this.billertype=false;
    }
}
//    console.log(this.billdata['consumerno'])
//    console.log(this.billdata['glexpensecode'])
//    console.log(this.billdata['email'])
//    console.log(this.billdata['ifsc'])
//    console.log(this.billdata['accno'])
//    console.log(this.billdata['contact'])
//    console.log(this.billdata['circle'])
//    console.log(this.billdata['bucode'])
//    console.log(this.billdata['selectcheckertemp'])

  }

  succesadd(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    

  }

  backbilltype(){
    this.billdetails=false;
    this.billertype=true;
    this.conf=false;

  }

  backbilldetails(){
    this.billdetails=true;
    this.billertype=false;
    this.conf=false;

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
      
    this.loaderService.display(true);
this.billdata['parameter']=this.para1
this.billdata['state']=parseInt(this.billdata['state'])
this.billdata['utilitytype']=parseInt(this.billdata['utilitytype'])
if(this.billdata['bucode']==undefined || this.billdata['bucode']==null){
    this.billdata['bucode']="";
}else{
    this.billdata['bucode']=this.billdata['bucode']
}
if(this.billdata['circle']==undefined || this.billdata['circle']==null){
    //console.log("set Circle blank")
    this.billdata['circle']="";
}else{
    this.billdata['circle']=this.billdata['circle']
}
   // console.log(this.billdata)
    var array=[
        this.billdata
    ]
this.billerservice.registerbillsNew(array).then(resp=>{
    //console.log(resp)
    if(resp['msg']=='BillerDetails Added successfully' || resp['msg']=='BillerDetails Added Successfully'){
        this.loaderService.display(false);
        this.router.navigate(['/main/successmsg'],{queryParams:{msg:'billnewsuccess'}});
        this.billdetails=false;
        this.billertype=false;
        this.conf=false;
    }else{
        this.loaderService.display(false);
        this.toastr.error("Something went wrong!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }
   
   
},(error: HttpErrorResponse)=>{
    console.log(error['error']['msg'])
    
    if(error['error']['msg']=='Biller Details Already Exists'){
        this.loaderService.display(false);
        this.toastr.error(error['error']['msg'],"Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            }) 
            this.billdetails=false;
            this.conf=true;
            this.billertype=false;
    }else if(error['error']['msg']=='Biller Details Not Available'){
        this.loaderService.display(false);
        this.toastr.error(error['error']['msg'],"Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            }) 
            this.billdetails=false;
            this.conf=true;
            this.billertype=false;
    }else{
        this.toastr.error("Failed to register biller!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
            this.billdetails=false;
            this.conf=true;
            this.billertype=false;
    }
  
   
  
   
})
  }


  updatetbilldata(){
      
    this.loaderService.display(true);
this.billdata['parameter']=this.para1
this.billdata['state']=parseInt(this.billdata['state'])
this.billdata['utilitytype']=parseInt(this.billdata['utilitytype'])
if(this.billdata['bucode']==undefined || this.billdata['bucode']==null){
    this.billdata['bucode']="";
}else{
    this.billdata['bucode']=this.billdata['bucode']
}
if(this.billdata['circle']==undefined || this.billdata['circle']==null){
   // console.log("set Circle blank")
    this.billdata['circle']="";
}else{
    this.billdata['circle']=this.billdata['circle']
}
    //console.log(this.billdata)
    var array=[
        this.billdata
    ]
this.billerservice.updatebillsNew(array).then(resp=>{
    //console.log(resp)
    if(resp['msg']=='BillerDetails Added successfully' || resp['msg']=='BillerDetails Added Successfully'){
        this.loaderService.display(false);
        this.router.navigate(['/main/successmsg'],{queryParams:{msg:'billnewsuccess'}});
        this.billdetails=false;
        this.billertype=false;
        this.conf=false;
    }else{
        this.loaderService.display(false);
        this.toastr.error("Something went wrong!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
    }
   
   
},(error: HttpErrorResponse)=>{
    console.log(error['error']['msg'])
    
    if(error['error']['msg']=='Biller Details Already Exists'){
        this.loaderService.display(false);
        this.toastr.error(error['error']['msg'],"Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            }) 
            this.billdetails=false;
            this.conf=true;
            this.billertype=false;
    }else if(error['error']['msg']=='Biller Details Not Available, Please fill all the details, All fields are mandatory'){
        this.loaderService.display(false);
        this.toastr.error(error['error']['msg'],"Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            }) 
            this.billdetails=false;
            this.conf=true;
            this.billertype=false;
    }else{
        this.toastr.error("Failed to register biller!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
            this.billdetails=false;
            this.conf=true;
            this.billertype=false;
    }
  
   
  
   
})
  }

  getIfsc(ifsc:string){
    //ifsc=this.supplierData['ifsc']
    //console.log(ifsc);
    this.billerservice.getIfscDetailsnew(ifsc).subscribe(data=>{
      //console.log(data['data'])
    //   this.billdata['bank']=data['data']['bank']
    //   this.billdata['branch']=data['data']['branch']
         /**New API Response**/
    // console.log(data['msg'])
    // console.log(data['data'][0])
    if(data['data'].length>0 && data['msg']=='success'){
        this.billdata['bank']=data['data'][0]['bank']
        this.billdata['branch']=data['data'][0]['branch']
    }else{
       
        this.toastr.warning("Bank Details not available","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
    }
    },error=>{
      console.log(error)
    })
  }

  private loadAllUsers() {
    this.loaderService.display(true);
    this.userservice.getAll().subscribe(users => {
     // console.log(users);
      this.loaderService.display(false);
      var userlist=users['data']; 
      if(this.orgId==gravitaOrgId){
        this.users=userlist.filter((user)=>{
            return (user['status']=='Approved' && user['id']==gravitUserId)
          })
      }else{
        this.users=userlist.filter((user)=>{
            return (user['status']=='Approved' && (user['dualrole']=='checker' || user['dualrole']=='ccchecker' || user['dualrole']=='aschecker'))
          })
      }
      
      for(var data of this.users){
          var obj={
            item_id:data['id'],
            item_text:data['employeename']
          }
          this.dropdownCat.push(obj)
      }
      },error=>{
        if(error['status']==401){
          this.auth.expiresession();
        }
      });
    

      this.loaderService.display(false);
}

}
