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
  parsedCsv: string[][];
  conf:boolean=false;
  success:boolean=false;
  csvContent:any;
  fileUpload:File;
  collapse:boolean=false;
  collapse1:boolean=false;
  collapse2:boolean=false;
  collapse3:boolean=false;
  collapse4:boolean=false;
  selectheadcheck:boolean=false;
  selectall:boolean=false;
  bulkbill:any=[
    {
      "billaddress":"333/34 Dynna Business Park Marol Andheri Mumbai",
      "billdate":"6th of every month",
      "biller":"BEST-Mumbai",
      "board":"Electricity",
      "consumerno":"34574364763",
      "contact":"9897866565",
      "duedate":"15th of every month",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"BEST",
      "state":"MH",
      "expensecode":"123/223455",
      "status":"Pending",
      "initiatedby":"Ms. Deepali Patekar",
      "approvedby":"--"
    },
    {
      "billaddress":"234 Adani Bhavan Goregaon East",
      "billdate":"6th of every month",
      "biller":"Adani Electricity",
      "board":"Electricity",
      "consumerno":"102096976",
      "contact":"9897866565",
      "duedate":"15th of every month",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"ADAN",
      "state":"MH",
      "expensecode":"123/343454",
      "status":"Pending",
      "initiatedby":"Ms. Deepali Patekar",
      "approvedby":"--"
    },
    {
      "billaddress":"45/11 Desai Road, Ahemdabad",
      "billdate":"6th of every month",
      "biller":"Torrent Power Ltd.-Ahmedabad",
      "board":"Electricity",
      "consumerno":"110413002334",
      "contact":"9897866565",
      "duedate":"15th of every month",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"TPLA",
      "state":"GJ",
      "expensecode":"123/343243",
      "status":"Pending",
      "initiatedby":"Ms. Deepali Patekar",
      "approvedby":"--"
    },
    {
      "billaddress":"Nehru Place, New Delhi, Delhi",
      "billdate":"6th of every month",
      "biller":"BSES Rajdhani-Delhi",
      "board":"Electricity",
      "consumerno":"110413004345",
      "contact":"9897866565",
      "duedate":"15th of every month",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"BSESR",
      "state":"DL",
      "expensecode":"123/334355",
      "status":"Pending",
      "initiatedby":"Ms. Deepali Patekar",
      "approvedby":"--"
    },
    {
      "billaddress":"Shakti Kiran Building,Karkardooma,Vishwas Nagar, New Delhi",
      "billdate":"6th of every month",
      "biller":"BSES Yamuna-Delhi",
      "board":"Electricity",
      "consumerno":"110413023445",
      "contact":"9897866565",
      "duedate":"15th of every month",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"BSESYD",
      "state":"DL",
      "expensecode":"123/334343",
      "status":"Pending",
      "initiatedby":"Ms. Deepali Patekar",
      "approvedby":"--"
    }
  ]
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('./assets/states.json').subscribe(
      data=>{
        this.states=data;
      }
    )
  }

  changeall(){
    this.selectall=!this.selectall;
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
       
  }

  revfile(){
    this.conf=false;
    this.reviewfile=false;    
    this.success=true;
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

  UploadFile(fileLoadedEvent): void {
    // const csvSeparator = ';';
    // const textFromFileLoaded = fileLoadedEvent.target.result;
    // this.csvContent = textFromFileLoaded;
    // // alert(textFromFileLoaded);
   
    // const txt = textFromFileLoaded;
    // const csv = [];
    // const lines = txt.split('\n');
    // lines.forEach(element => {
    //   const cols: string[] = element.split(csvSeparator);
    //   csv.push(cols);
    // });
    // this.parsedCsv = csv;
    // console.log(this.parsedCsv);

    this.reviewfile=true;
    this.billdetails=false;    
    this.conf=false;
    this.success=false;
    this.billertype=false; 
   }

   submitdata(){
    var billerData =[];
    billerData=JSON.parse(localStorage.getItem('billdetails'));
     for (var i=0;i<this.bulkbill.length;i++){
      if(billerData){
        var d =new Date();
        this.bulkbill[i].initiatedon = d.toLocaleString();
        this.bulkbill[i].uploadfilename = "billerbulkfile.csv"
        this.bulkbill[i].id = billerData.length+1;
        billerData.push(this.bulkbill[i]);
      }else{
        billerData=[]
        var d =new Date();
        this.bulkbill[i].initiatedon = d.toLocaleString();
        this.bulkbill[i].uploadfilename = "billerbulkfile.csv"
        this.bulkbill[i].id=i;
        billerData.push(this.bulkbill[i]);

      }
     }
     localStorage.setItem('billdetails', JSON.stringify(billerData));
   }

  
}
