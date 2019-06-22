import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient ,HttpEventType} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'
import{LoaderService} from '../../api/loader.service'
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-billerbulk',
  templateUrl: './billerbulk.component.html',
  styleUrls: ['./billerbulk.component.css']
})
export class BillerBulkComponent implements OnInit {billertype:boolean=true;
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
  showUploadFile:boolean=false; 
  type2:boolean=false;
  type3:boolean=false;
  selected:any=0;
  masterbillers:any=[]
  para1:any=[];
  para2:any=[];
  para3:any=[];
  filename1:string;
  filename2:string;
  filename3:string;
  filename4:string;
  filename5:string;
  public progress: number;
  public message: string;
  public downloadFileName:string;
  bulkbill:any=[
    {
      "billaddress":"333/34 Dynna Business Park Marol Andheri Mumbai",
      "billdate":"6th",
      "biller":"BEST-Mumbai",
      "board":"Electricity",
      "consumerno":"34574364763",
      "contact":"9897866565",
      "duedate":"15th",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"BEST",
      "state":"MH",
      "expensecode":"123/223455",
      "status":"Pending with checker",
      "initiatedby":"Mr. Mukund Javir",
      "approvedby":"--"
    },
    {
      "billaddress":"234 Adani Bhavan Goregaon East",
      "billdate":"6th",
      "biller":"Adani Electricity",
      "board":"Electricity",
      "consumerno":"102096976",
      "contact":"9897866565",
      "duedate":"15th",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"ADAN",
      "state":"MH",
      "expensecode":"123/343454",
      "status":"Pending with checker",
      "initiatedby":"Mr. Mukund Javir",
      "approvedby":"--"
    },
    {
      "billaddress":"45/11 Desai Road, Ahemdabad",
      "billdate":"6th",
      "biller":"Torrent Power Ltd.-Ahmedabad",
      "board":"Electricity",
      "consumerno":"110413002334",
      "contact":"9897866565",
      "duedate":"15th",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"TPLA",
      "state":"GJ",
      "expensecode":"123/343243",
      "status":"Pending with checker",
      "initiatedby":"Mr. Mukund Javir",
      "approvedby":"--"
    },
    {
      "billaddress":"Nehru Place, New Delhi, Delhi",
      "billdate":"6th",
      "biller":"BSES Rajdhani-Delhi",
      "board":"Electricity",
      "consumerno":"110413004345",
      "contact":"9897866565",
      "duedate":"15th",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"BSESR",
      "state":"DL",
      "expensecode":"123/334355",
      "status":"Pending with checker",
      "initiatedby":"Mr. Mukund Javir",
      "approvedby":"--"
    },
    {
      "billaddress":"Shakti Kiran Building,Karkardooma,Vishwas Nagar, New Delhi",
      "billdate":"6th",
      "biller":"BSES Yamuna-Delhi",
      "board":"Electricity",
      "consumerno":"110413023445",
      "contact":"9897866565",
      "duedate":"15th",
      "email":"deepali.patekar@axisbank.com",
      "shortname":"BSESYD",
      "state":"DL",
      "expensecode":"123/334343",
      "status":"Pending with checker",
      "initiatedby":"Mr. Mukund Javir",
      "approvedby":"--"
    }
  ]

  @Output() public onUploadFinished = new EventEmitter();
  constructor(private httpService: HttpClient,private toastr: ToastrService,private loaderService: LoaderService,private route:Router,private router:ActivatedRoute) { }

  ngOnInit() {
    this.httpService.get('./assets/states.json').subscribe(
      data=>{
        this.states=data;
      }
    )

    // this.httpService.get('./assets/billersmasters.json').subscribe(
    //   data=>{
    //     this.masterbillers=data;
    //     console.log(this.masterbillers)
    //     this.para1=this.masterbillers['Parameter1']
    //     this.para2=this.masterbillers['Parameter2']
    //     this.para3=this.masterbillers['Parameter3']
    //   }
    // )

    this.loadmasterbiller();
    
  }

  showUpldView(){
    this.showUploadFile=true;
  }
  twoparams(){
    this.type2=false;
    this.type3=false;
  }

  threeparams(){
    this.type2=true;
    this.type3=false;
  }

  fourparams(){
    this.type2=false;
    this.type3=true;
  }

  changeall(){
    this.selectall=!this.selectall;
    if(this.selectall==true)
    this.selected=5
    else
    this.selected=0
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

  UploadFile(files): void {
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

    // this.reviewfile=true;
    // this.billdetails=false;    
    // this.conf=false;
    // this.success=false;
    // this.billertype=false; 
    this.loaderService.display(true);
console.log("File Upload Started")
    if (files.length === 0) {
        return;
      }
   
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      var version = localStorage.getItem('version')
      this.httpService.post('https://billtree.aquapay.in:3002/api/v1/bill_upload', formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            if(event.body['name'])
              this.downloadFileName = event.body['name'];
            console.log(event.body);
          }
          this.route.navigate(['/main/dashboard']);
          this.loaderService.display(false);

         
        },error=>{
            this.toastr.error("Failed to upload !","Alert",{
                timeOut:8000,
                positionClass:'toast-top-center'
                })
        });
        this.toastr.success("Bills file has been sent for processing, it will reflect on bill view after processing, !","Alert",{
            timeOut:8000,
            positionClass:'toast-top-center'
            })
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

   UploadFileAttach1(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename1 = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }
  UploadFileAttach2(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename2 = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }
  UploadFileAttach3(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename3 = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }
  UploadFileAttach4(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename4 = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }
  UploadFileAttach5(file: HTMLInputElement){
    //this.filename = file.value;
    var filenm = file.value;
    this.filename5 = filenm.split(/[\\\/]/).pop()
    //this.filename = filenm.substr(fileNameIndex);
  }

   private loadmasterbiller(){
     this.masterbillers={
      "Parameter1": [
          {
              "Id": "1",
              "Discom_Name": "ajmer vidyut vitran nigam limited (avvnl)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "2",
              "Discom_Name": "apepdcl",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "3",
              "Discom_Name": "assam power distribution company ltd. (apdcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "4",
              "Discom_Name": "bangalore electricity supply company ltd.",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "5",
              "Discom_Name": "bharatpur electricity services limited",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "6",
              "Discom_Name": "bikaner electricity supply limited",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "7",
              "Discom_Name": "brihanmumbai electricity supply and transport undertaking (best undertaking)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "8",
              "Discom_Name": "bses rajdhani",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "9",
              "Discom_Name": "bses yamuna",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "10",
              "Discom_Name": "bsesr",
              "Ref_no": "Enter Consumer Account No. here"
          },
          {
              "Id": "11",
              "Discom_Name": "calcutta electric supply corporation (india) limited",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "12",
              "Discom_Name": "chamundeshwari electricity supply corporation ltd mysore",
              "Ref_no": "Enter Consumer ID here"
          },
         
          {
              "Id": "14",
              "Discom_Name": "chhattisgarh state power distribution company ltd (cspdcl)",
              "Ref_no": "Enter BP No. here"
          },
          {
              "Id": "15",
              "Discom_Name": "dakshin gujarat vij company ltd (dgvcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "16",
              "Discom_Name": "dakshin haryana bijli vitran nigam (dhbvn)",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "17",
              "Discom_Name": "gulbarga electricity supply company limited (gescom)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "18",
              "Discom_Name": "gulbarga electricity supply company limited (gescom)",
              "Ref_no": "Enter Consumer ID here"
          },
          
         
          {
              "Id": "21",
              "Discom_Name": "himachal pradesh state electricity board ltd (hpsebl)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "22",
              "Discom_Name": "hubli electricity supply company ltd. (hescom)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "23",
              "Discom_Name": "india power corporation ltd. (ipcl) - asansol",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "24",
              "Discom_Name": "jodhpur vidyut vitran nigam limited (jdvvnl)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "25",
              "Discom_Name": "kerala state electricity board ltd (kseb ltd)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "26",
              "Discom_Name": "kota electricity distribution limited(kedl)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "27",
              "Discom_Name": "madhya gujarat vij company ltd (mgvcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "28",
              "Discom_Name": "madhya pradesh paschim kshetra vidyut vitaran company ltd. (mppkvvcl)",
              "Ref_no": "Enter IVRS No. here"
          },
          {
              "Id": "29",
              "Discom_Name": "mangalore electricity supply company ltd. (mescom)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "30",
              "Discom_Name": "manipur state power distribution company limited (mspdcl)",
              "Ref_no": "Enter Meter Serial No. here"
          },
          {
              "Id": "31",
              "Discom_Name": "meghalaya power dist corp ltd",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "32",
              "Discom_Name": "nesco utility",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "33",
              "Discom_Name": "noida power company ltd (npcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "34",
              "Discom_Name": "north bihar power distribution co. ltd (nbpdcl)",
              "Ref_no": "Enter Connection ID here"
          },
          {
              "Id": "35",
              "Discom_Name": "paschim gujarat vij company ltd (pgvcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "36",
              "Discom_Name": "punjab state power corporation limited (pspcl)",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "37",
              "Discom_Name": "sndl nagpur",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "38",
              "Discom_Name": "south bihar power distribution",
              "Ref_no": "Enter Connection ID here"
          },
          {
              "Id": "39",
              "Discom_Name": "southern electricity supply company of odisha limited (southco)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "40",
              "Discom_Name": "southern power distribution company of a.p ltd (apspdcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "41",
              "Discom_Name": "tamil nadu electricity board (tneb)",
              "Ref_no": "Enter Consumer No. here"
          },
       
       
          
          {
              "Id": "50",
              "Discom_Name": "tata power delhi distribution limited",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "51",
              "Discom_Name": "tata power-mumbai",
              "Ref_no": " Enter Service Number here"
          },
          {
              "Id": "52",
              "Discom_Name": "torrent power limited",
              "Ref_no": " Enter Service Number here"
          },
          {
              "Id": "53",
              "Discom_Name": "torrent power limited",
              "Ref_no": " Enter Service Number here"
          },
          {
              "Id": "54",
              "Discom_Name": "tp ajmer distribution limited (tpadl)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "55",
              "Discom_Name": "tripura electricity corp ltd",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "56",
              "Discom_Name": "tsspdcl",
              "Ref_no": "Enter Unique Service No. here"
          },
          {
              "Id": "57",
              "Discom_Name": "uttar gujarat vij company ltd (ugvcl)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "58",
              "Discom_Name": "uttar haryana bijli vitran nigam(uhbvn)",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "59",
              "Discom_Name": "uttrakhand power corporation limited",
              "Ref_no": "Enter Service Connection No. here"
          },
          {
              "Id": "60",
              "Discom_Name": "wesco utility",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "61",
              "Discom_Name": "west bengal state electricity distribution company limited (wbsedcl)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "62",
              "Discom_Name": "daman and diu electricity (dded)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "63",
              "Discom_Name": "dnh power distribution company limited",
              "Ref_no": "Enter Account Number here"
          }
      ],
    
      "Parameter2": [
          {
              "id": "1",
              "Discom_Name": "jaipur vidyut vitran nigam ltd. (jvvnl)",
              "Ref_no1": "Enter FNB (HT) or Regular",
              "Ref_no2": "Enter K No. here"
          },
          {
              "id": "2",
              "Discom_Name": "jamshedpur utilities &services company ltd (jusco)",
              "Ref_no1": "Enter District Here",
              "Ref_no2": "Enter BP No. here"
          },
          {
              "id": "3",
              "Discom_Name": "madhya pradesh madhya kshetra vidyut vitran company limited (mpcz)",
              "Ref_no1": "Enter Rural or Urban here",
              "Ref_no2": "Enter IVRS No. Here"
          },
         
          {
              "id": "5",
              "Discom_Name": "mp poorv kshetra vidyut vitaran-jabalpur",
              "Ref_no1": "Enter Rural or Urban here",
              "Ref_no2": "Enter IVRS No. Here"
          },
       
          {
              "id": "7",
              "Discom_Name": "torrent power limited",
              "Ref_no1": "Enter City name (Ahmedabad /Surat)",
              "Ref_no2": " Enter Service Number here"
          },
          {
              "id": "8",
              "Discom_Name": "torrent power limited",
              "Ref_no1": "Enter City name (Agra)",
              "Ref_no2": " Enter Service Number here"
          },
          {
              "id": "9",
              "Discom_Name": "uttar pradesh power corporation ltd. (uppcl)",
              "Ref_no1": "Enter Rural or Urban here",
              "Ref_no2": " Enter (Account ID (Rural) | Consumer No. (Urban)) here"
          }
      ],
    
      "Parameter3": [
          {
              "id": "1",
              "Discom_Name": "msedcl",
              "Bu_Code": "2801",
              "BU_Name": "  AKOLA (R) SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "2",
              "Discom_Name": "msedcl",
              "Bu_Code": "2836",
              "BU_Name": "  MURTIZAPUR SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "3",
              "Discom_Name": "msedcl",
              "Bu_Code": "2810",
              "BU_Name": "  AKOT SUB DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "4",
              "Discom_Name": "msedcl",
              "Bu_Code": "4756",
              "BU_Name": "  BARSHI TAKLI SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "5",
              "Discom_Name": "msedcl",
              "Bu_Code": "2844",
              "BU_Name": "  BALAPUR SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "6",
              "Discom_Name": "msedcl",
              "Bu_Code": "4814",
              "BU_Name": "  PATUR SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "7",
              "Discom_Name": "msedcl",
              "Bu_Code": "2828",
              "BU_Name": "  TELHARA SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "8",
              "Discom_Name": "msedcl",
              "Bu_Code": "4275",
              "BU_Name": "  AKOLA U-I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "9",
              "Discom_Name": "msedcl",
              "Bu_Code": "4570",
              "BU_Name": "  AKOLA U-II S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "10",
              "Discom_Name": "msedcl",
              "Bu_Code": "4592",
              "BU_Name": "  AKOLA U-III S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "11",
              "Discom_Name": "msedcl",
              "Bu_Code": "2852",
              "BU_Name": "  BULDANA SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "12",
              "Discom_Name": "msedcl",
              "Bu_Code": "2861",
              "BU_Name": "  CHIKHLI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "13",
              "Discom_Name": "msedcl",
              "Bu_Code": "2879",
              "BU_Name": "  D'RAJA SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "14",
              "Discom_Name": "msedcl",
              "Bu_Code": "4668",
              "BU_Name": "  DHAD S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "15",
              "Discom_Name": "msedcl",
              "Bu_Code": "974",
              "BU_Name": "  SHINDKHED S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "16",
              "Discom_Name": "msedcl",
              "Bu_Code": "1406",
              "BU_Name": "  KHAMGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "17",
              "Discom_Name": "msedcl",
              "Bu_Code": "2917",
              "BU_Name": "  KHAMGAON(R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "18",
              "Discom_Name": "msedcl",
              "Bu_Code": "4809",
              "BU_Name": "  SANGRAMPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "19",
              "Discom_Name": "msedcl",
              "Bu_Code": "2941",
              "BU_Name": "  MEHEKAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "20",
              "Discom_Name": "msedcl",
              "Bu_Code": "4551",
              "BU_Name": "  LONAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "21",
              "Discom_Name": "msedcl",
              "Bu_Code": "5282",
              "BU_Name": "  SHEGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "22",
              "Discom_Name": "msedcl",
              "Bu_Code": "2933",
              "BU_Name": "  JALGAON JALMOD SDIV",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "23",
              "Discom_Name": "msedcl",
              "Bu_Code": "2887",
              "BU_Name": "  MALKAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "24",
              "Discom_Name": "msedcl",
              "Bu_Code": "2895",
              "BU_Name": "  MOTALA S. DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "25",
              "Discom_Name": "msedcl",
              "Bu_Code": "2925",
              "BU_Name": "  NANDURA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "26",
              "Discom_Name": "msedcl",
              "Bu_Code": "1546",
              "BU_Name": "  KARANJA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "27",
              "Discom_Name": "msedcl",
              "Bu_Code": "1562",
              "BU_Name": "  MALEGAON S DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "28",
              "Discom_Name": "msedcl",
              "Bu_Code": "1538",
              "BU_Name": "  MANGRULPEER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "29",
              "Discom_Name": "msedcl",
              "Bu_Code": "1554",
              "BU_Name": "  MANORA DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "30",
              "Discom_Name": "msedcl",
              "Bu_Code": "1520",
              "BU_Name": "  RISOD S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "31",
              "Discom_Name": "msedcl",
              "Bu_Code": "1511",
              "BU_Name": "  WASHIM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "32",
              "Discom_Name": "msedcl",
              "Bu_Code": "306",
              "BU_Name": "  ACHALPUR CAMP S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "33",
              "Discom_Name": "msedcl",
              "Bu_Code": "3077",
              "BU_Name": "  ACHALPUR CITY SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "34",
              "Discom_Name": "msedcl",
              "Bu_Code": "1627",
              "BU_Name": "  ANJANGAON SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "35",
              "Discom_Name": "msedcl",
              "Bu_Code": "4767",
              "BU_Name": "  ACHALPUR II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "36",
              "Discom_Name": "msedcl",
              "Bu_Code": "4847",
              "BU_Name": "  CHIKHALDARA S/Dn",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "37",
              "Discom_Name": "msedcl",
              "Bu_Code": "1635",
              "BU_Name": "  DARYAPUR SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "38",
              "Discom_Name": "msedcl",
              "Bu_Code": "2984",
              "BU_Name": "  AMRAVATI (R) SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "39",
              "Discom_Name": "msedcl",
              "Bu_Code": "1678",
              "BU_Name": "  BADNERA SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "40",
              "Discom_Name": "msedcl",
              "Bu_Code": "4790",
              "BU_Name": "  BHATKULI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "41",
              "Discom_Name": "msedcl",
              "Bu_Code": "3000",
              "BU_Name": "  CHANDUR RLY SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "42",
              "Discom_Name": "msedcl",
              "Bu_Code": "2992",
              "BU_Name": "  DHAMANGAON SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "43",
              "Discom_Name": "msedcl",
              "Bu_Code": "1686",
              "BU_Name": "  NANDGAON KH SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "44",
              "Discom_Name": "msedcl",
              "Bu_Code": "1694",
              "BU_Name": "  TIWASA SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "45",
              "Discom_Name": "msedcl",
              "Bu_Code": "4295",
              "BU_Name": "  AMRAVATI U. I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "46",
              "Discom_Name": "msedcl",
              "Bu_Code": "4296",
              "BU_Name": "  AMRAVATI U. II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "47",
              "Discom_Name": "msedcl",
              "Bu_Code": "4297",
              "BU_Name": "  AMRAVATI U. IIIS/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "48",
              "Discom_Name": "msedcl",
              "Bu_Code": "1643",
              "BU_Name": "  CHANDUR BAZAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "49",
              "Discom_Name": "msedcl",
              "Bu_Code": "1660",
              "BU_Name": "  MORSHI I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "50",
              "Discom_Name": "msedcl",
              "Bu_Code": "4760",
              "BU_Name": "  MORSHI II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "51",
              "Discom_Name": "msedcl",
              "Bu_Code": "1651",
              "BU_Name": "  SHENDURGANAGHAT S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "52",
              "Discom_Name": "msedcl",
              "Bu_Code": "3093",
              "BU_Name": "  WARUD (I)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "53",
              "Discom_Name": "msedcl",
              "Bu_Code": "5258",
              "BU_Name": "  GHANTAJI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "54",
              "Discom_Name": "msedcl",
              "Bu_Code": "3107",
              "BU_Name": "  WARUD II S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "55",
              "Discom_Name": "msedcl",
              "Bu_Code": "1724",
              "BU_Name": "  PANDHARKAWADA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "56",
              "Discom_Name": "msedcl",
              "Bu_Code": "1716",
              "BU_Name": "  WANI S DIV",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "57",
              "Discom_Name": "msedcl",
              "Bu_Code": "3085",
              "BU_Name": "  DHARNI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "58",
              "Discom_Name": "msedcl",
              "Bu_Code": "4817",
              "BU_Name": "  MAREGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "59",
              "Discom_Name": "msedcl",
              "Bu_Code": "4818",
              "BU_Name": "  ZARI-JAMANI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "60",
              "Discom_Name": "msedcl",
              "Bu_Code": "1767",
              "BU_Name": "  DHANKI S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "61",
              "Discom_Name": "msedcl",
              "Bu_Code": "1759",
              "BU_Name": "  DIGRAS S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "62",
              "Discom_Name": "msedcl",
              "Bu_Code": "3191",
              "BU_Name": "  DHARWAH S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "63",
              "Discom_Name": "msedcl",
              "Bu_Code": "5266",
              "BU_Name": "  MAHAGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "64",
              "Discom_Name": "msedcl",
              "Bu_Code": "1732",
              "BU_Name": "  PUSAD SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "65",
              "Discom_Name": "msedcl",
              "Bu_Code": "1741",
              "BU_Name": "  UMERKHED S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "66",
              "Discom_Name": "msedcl",
              "Bu_Code": "3174",
              "BU_Name": "  YAVATMAL (R) SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "67",
              "Discom_Name": "msedcl",
              "Bu_Code": "3204",
              "BU_Name": "  NER S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "68",
              "Discom_Name": "msedcl",
              "Bu_Code": "5274",
              "BU_Name": "  ARNI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "69",
              "Discom_Name": "msedcl",
              "Bu_Code": "1708",
              "BU_Name": "  YEOTMAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "70",
              "Discom_Name": "msedcl",
              "Bu_Code": "3166",
              "BU_Name": "  KALAMB S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "71",
              "Discom_Name": "msedcl",
              "Bu_Code": "4815",
              "BU_Name": "  BABHULGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "72",
              "Discom_Name": "msedcl",
              "Bu_Code": "4816",
              "BU_Name": "  RALEGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "73",
              "Discom_Name": "msedcl",
              "Bu_Code": "4394",
              "BU_Name": "  A'BAD POWER HOUSE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "74",
              "Discom_Name": "msedcl",
              "Bu_Code": "4673",
              "BU_Name": "  SHAHGANJ S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "75",
              "Discom_Name": "msedcl",
              "Bu_Code": "3222",
              "BU_Name": "  AURANGABAD U. DN II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "76",
              "Discom_Name": "msedcl",
              "Bu_Code": "4578",
              "BU_Name": "  CHAWANI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "77",
              "Discom_Name": "msedcl",
              "Bu_Code": "4395",
              "BU_Name": "  CHIKALDHANA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "78",
              "Discom_Name": "msedcl",
              "Bu_Code": "4672",
              "BU_Name": "  WALUNJ S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "79",
              "Discom_Name": "msedcl",
              "Bu_Code": "2224",
              "BU_Name": "  GANGAPUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "80",
              "Discom_Name": "msedcl",
              "Bu_Code": "4396",
              "BU_Name": "  KRANTICHOWK S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "81",
              "Discom_Name": "msedcl",
              "Bu_Code": "2241",
              "BU_Name": "  AURANGABAD  R-I S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "82",
              "Discom_Name": "msedcl",
              "Bu_Code": "4675",
              "BU_Name": "  GHARGHED S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "83",
              "Discom_Name": "msedcl",
              "Bu_Code": "2267",
              "BU_Name": "  AURANGBAD R-II S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "84",
              "Discom_Name": "msedcl",
              "Bu_Code": "7242",
              "BU_Name": "  AJANTHA(R) S/SN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "85",
              "Discom_Name": "msedcl",
              "Bu_Code": "4803",
              "BU_Name": "  PHULAMBRI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "86",
              "Discom_Name": "msedcl",
              "Bu_Code": "2232",
              "BU_Name": "  PAITHAN  (R) S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "87",
              "Discom_Name": "msedcl",
              "Bu_Code": "2275",
              "BU_Name": "  KHULATABAD (R) S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "88",
              "Discom_Name": "msedcl",
              "Bu_Code": "7226",
              "BU_Name": "  KANNAD (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "89",
              "Discom_Name": "msedcl",
              "Bu_Code": "7234",
              "BU_Name": "  SILLOD(R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "90",
              "Discom_Name": "msedcl",
              "Bu_Code": "4743",
              "BU_Name": "  VAIJAPUR-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "91",
              "Discom_Name": "msedcl",
              "Bu_Code": "7218",
              "BU_Name": "  VAIJAPUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "92",
              "Discom_Name": "msedcl",
              "Bu_Code": "4873",
              "BU_Name": "  PISHOR SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "93",
              "Discom_Name": "msedcl",
              "Bu_Code": "2721",
              "BU_Name": "  JALNA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "94",
              "Discom_Name": "msedcl",
              "Bu_Code": "5681",
              "BU_Name": "  JAFARABAD(R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "95",
              "Discom_Name": "msedcl",
              "Bu_Code": "2712",
              "BU_Name": "  JALNA    (U) S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "96",
              "Discom_Name": "msedcl",
              "Bu_Code": "2739",
              "BU_Name": "  BADNAPUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "97",
              "Discom_Name": "msedcl",
              "Bu_Code": "4674",
              "BU_Name": "  A'BAD CIDCO S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "98",
              "Discom_Name": "msedcl",
              "Bu_Code": "2763",
              "BU_Name": "  BHOKARDHAN (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "99",
              "Discom_Name": "msedcl",
              "Bu_Code": "2755",
              "BU_Name": "  PARTUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "100",
              "Discom_Name": "msedcl",
              "Bu_Code": "2747",
              "BU_Name": "  AMBAD (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "101",
              "Discom_Name": "msedcl",
              "Bu_Code": "4796",
              "BU_Name": "  MANTHA SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "102",
              "Discom_Name": "msedcl",
              "Bu_Code": "5860",
              "BU_Name": "  BARAMATI (R)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "103",
              "Discom_Name": "msedcl",
              "Bu_Code": "4723",
              "BU_Name": "  WALCHANDNAGAR SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "104",
              "Discom_Name": "msedcl",
              "Bu_Code": "5851",
              "BU_Name": "  BARAMATI (U)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "105",
              "Discom_Name": "msedcl",
              "Bu_Code": "4702",
              "BU_Name": "  GHANSAWANGI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "106",
              "Discom_Name": "msedcl",
              "Bu_Code": "5894",
              "BU_Name": "  INDAPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "107",
              "Discom_Name": "msedcl",
              "Bu_Code": "841",
              "BU_Name": "  BHOR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "108",
              "Discom_Name": "msedcl",
              "Bu_Code": "5886",
              "BU_Name": "  DOUND",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "109",
              "Discom_Name": "msedcl",
              "Bu_Code": "5878",
              "BU_Name": "  NIRA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "110",
              "Discom_Name": "msedcl",
              "Bu_Code": "4699",
              "BU_Name": "  SHIKRAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "111",
              "Discom_Name": "msedcl",
              "Bu_Code": "5801",
              "BU_Name": "  SASWAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "112",
              "Discom_Name": "msedcl",
              "Bu_Code": "833",
              "BU_Name": "  SHIRUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "113",
              "Discom_Name": "msedcl",
              "Bu_Code": "4722",
              "BU_Name": "  SOMESHWAR SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "114",
              "Discom_Name": "msedcl",
              "Bu_Code": "4701",
              "BU_Name": "  KEDGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "115",
              "Discom_Name": "msedcl",
              "Bu_Code": "5916",
              "BU_Name": "  KARAD-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "116",
              "Discom_Name": "msedcl",
              "Bu_Code": "5941",
              "BU_Name": "  MALHAR PETH S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "117",
              "Discom_Name": "msedcl",
              "Bu_Code": "5959",
              "BU_Name": "  PATAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "118",
              "Discom_Name": "msedcl",
              "Bu_Code": "990",
              "BU_Name": "  KARAD -I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "119",
              "Discom_Name": "msedcl",
              "Bu_Code": "5975",
              "BU_Name": "  PHALTAN (U)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "120",
              "Discom_Name": "msedcl",
              "Bu_Code": "4819",
              "BU_Name": "  KHANDALA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "121",
              "Discom_Name": "msedcl",
              "Bu_Code": "5932",
              "BU_Name": "  UMBRAJ S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "122",
              "Discom_Name": "msedcl",
              "Bu_Code": "5983",
              "BU_Name": "  LONAND",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "123",
              "Discom_Name": "msedcl",
              "Bu_Code": "5967",
              "BU_Name": "  PHALTAN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "124",
              "Discom_Name": "msedcl",
              "Bu_Code": "4831",
              "BU_Name": "  RAHIMATPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "125",
              "Discom_Name": "msedcl",
              "Bu_Code": "981",
              "BU_Name": "  WATHAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "126",
              "Discom_Name": "msedcl",
              "Bu_Code": "914",
              "BU_Name": "  SATARA (U)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "127",
              "Discom_Name": "msedcl",
              "Bu_Code": "949",
              "BU_Name": "  KOREGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "128",
              "Discom_Name": "msedcl",
              "Bu_Code": "6912",
              "BU_Name": "  AUNDH",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "129",
              "Discom_Name": "msedcl",
              "Bu_Code": "5991",
              "BU_Name": "  DAHIWADI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "130",
              "Discom_Name": "msedcl",
              "Bu_Code": "5924",
              "BU_Name": "  VADUJ",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "131",
              "Discom_Name": "msedcl",
              "Bu_Code": "4835",
              "BU_Name": "  MAHABALESHWAR SDN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "132",
              "Discom_Name": "msedcl",
              "Bu_Code": "4830",
              "BU_Name": "  KHATAV S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "133",
              "Discom_Name": "msedcl",
              "Bu_Code": "922",
              "BU_Name": "  KARAD URBAN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "134",
              "Discom_Name": "msedcl",
              "Bu_Code": "965",
              "BU_Name": "  MEDHA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "135",
              "Discom_Name": "msedcl",
              "Bu_Code": "957",
              "BU_Name": "  WAI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "136",
              "Discom_Name": "msedcl",
              "Bu_Code": "931",
              "BU_Name": "  SATARA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "137",
              "Discom_Name": "msedcl",
              "Bu_Code": "973",
              "BU_Name": "  PACHGANI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "138",
              "Discom_Name": "msedcl",
              "Bu_Code": "4808",
              "BU_Name": "  MALSHIRAS S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "139",
              "Discom_Name": "msedcl",
              "Bu_Code": "6335",
              "BU_Name": "  AKLUJ I SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "140",
              "Discom_Name": "msedcl",
              "Bu_Code": "1384",
              "BU_Name": "  BARSHI (U) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "141",
              "Discom_Name": "msedcl",
              "Bu_Code": "4716",
              "BU_Name": "  AKLUJ II SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "142",
              "Discom_Name": "msedcl",
              "Bu_Code": "6360",
              "BU_Name": "  NATEPUTE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "143",
              "Discom_Name": "msedcl",
              "Bu_Code": "1376",
              "BU_Name": "  KARMALA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "144",
              "Discom_Name": "msedcl",
              "Bu_Code": "1392",
              "BU_Name": "  BARSHI (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "145",
              "Discom_Name": "msedcl",
              "Bu_Code": "1368",
              "BU_Name": "  KURDUWADI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "146",
              "Discom_Name": "msedcl",
              "Bu_Code": "4806",
              "BU_Name": "  MADHA SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "147",
              "Discom_Name": "msedcl",
              "Bu_Code": "4821",
              "BU_Name": "  TERMBHURNI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "148",
              "Discom_Name": "msedcl",
              "Bu_Code": "6351",
              "BU_Name": "  MANGALVEDHA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "149",
              "Discom_Name": "msedcl",
              "Bu_Code": "4757",
              "BU_Name": "  JEUR SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "150",
              "Discom_Name": "msedcl",
              "Bu_Code": "4715",
              "BU_Name": "  PANDHARPUR R-II S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "151",
              "Discom_Name": "msedcl",
              "Bu_Code": "6343",
              "BU_Name": "  SANGOLA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "152",
              "Discom_Name": "msedcl",
              "Bu_Code": "6327",
              "BU_Name": "  PANDHARPUR R-I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "153",
              "Discom_Name": "msedcl",
              "Bu_Code": "1341",
              "BU_Name": "  AKKALKOT S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "154",
              "Discom_Name": "msedcl",
              "Bu_Code": "1350",
              "BU_Name": "  MOHOL S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "155",
              "Discom_Name": "msedcl",
              "Bu_Code": "6319",
              "BU_Name": "  PANDHARPUR (U)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "156",
              "Discom_Name": "msedcl",
              "Bu_Code": "1325",
              "BU_Name": "  SOLAPUR R-I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "157",
              "Discom_Name": "msedcl",
              "Bu_Code": "4086",
              "BU_Name": "  SOLAPUR (A) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "158",
              "Discom_Name": "msedcl",
              "Bu_Code": "1333",
              "BU_Name": "  SOLAPUR R-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "159",
              "Discom_Name": "msedcl",
              "Bu_Code": "4143",
              "BU_Name": "  BHIWANDI I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "160",
              "Discom_Name": "msedcl",
              "Bu_Code": "4087",
              "BU_Name": "  SOLAPUR (B) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "161",
              "Discom_Name": "msedcl",
              "Bu_Code": "4089",
              "BU_Name": "  SOLAPUR (D) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "162",
              "Discom_Name": "msedcl",
              "Bu_Code": "4145",
              "BU_Name": "  BHIWANDI III S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "163",
              "Discom_Name": "msedcl",
              "Bu_Code": "4088",
              "BU_Name": "  SOLAPUR (C) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "164",
              "Discom_Name": "msedcl",
              "Bu_Code": "4146",
              "BU_Name": "  BHIWANDI IV S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "165",
              "Discom_Name": "msedcl",
              "Bu_Code": "4147",
              "BU_Name": "  BHIWANDI V S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "166",
              "Discom_Name": "msedcl",
              "Bu_Code": "4148",
              "BU_Name": "  BHIWANDI VI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "167",
              "Discom_Name": "msedcl",
              "Bu_Code": "4579",
              "BU_Name": "  SOLAPUR (E) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "168",
              "Discom_Name": "msedcl",
              "Bu_Code": "4367",
              "BU_Name": "  BHIWANDI-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "169",
              "Discom_Name": "msedcl",
              "Bu_Code": "4144",
              "BU_Name": "  BHIWANDI II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "170",
              "Discom_Name": "msedcl",
              "Bu_Code": "4732",
              "BU_Name": "  ISHWAR NAGAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "171",
              "Discom_Name": "msedcl",
              "Bu_Code": "4332",
              "BU_Name": "  BHIWANDI-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "172",
              "Discom_Name": "msedcl",
              "Bu_Code": "4645",
              "BU_Name": "  BHIWANDI VII S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "173",
              "Discom_Name": "msedcl",
              "Bu_Code": "4733",
              "BU_Name": "  BHANDUP (E) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "174",
              "Discom_Name": "msedcl",
              "Bu_Code": "4868",
              "BU_Name": "  BHIWANDI AUX. S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "175",
              "Discom_Name": "msedcl",
              "Bu_Code": "4705",
              "BU_Name": "  NEELAM NAGAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "176",
              "Discom_Name": "msedcl",
              "Bu_Code": "4704",
              "BU_Name": "  PACH RASTA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "177",
              "Discom_Name": "msedcl",
              "Bu_Code": "4734",
              "BU_Name": "  PANNALAL S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "178",
              "Discom_Name": "msedcl",
              "Bu_Code": "4703",
              "BU_Name": "  SARVODAY S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "179",
              "Discom_Name": "msedcl",
              "Bu_Code": "4870",
              "BU_Name": "  SIMTOOL DF",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "180",
              "Discom_Name": "msedcl",
              "Bu_Code": "4871",
              "BU_Name": "  HDIL DF",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "181",
              "Discom_Name": "msedcl",
              "Bu_Code": "4540",
              "BU_Name": "  KISAN NAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "182",
              "Discom_Name": "msedcl",
              "Bu_Code": "4261",
              "BU_Name": "  KALWA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "183",
              "Discom_Name": "msedcl",
              "Bu_Code": "4727",
              "BU_Name": "  POWER HOUSE S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "184",
              "Discom_Name": "msedcl",
              "Bu_Code": "4655",
              "BU_Name": "  THANE (E) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "185",
              "Discom_Name": "msedcl",
              "Bu_Code": "4728",
              "BU_Name": "  GADKARI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "186",
              "Discom_Name": "msedcl",
              "Bu_Code": "4726",
              "BU_Name": "  VIKAS COMPLEX S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "187",
              "Discom_Name": "msedcl",
              "Bu_Code": "4391",
              "BU_Name": "  MUMBRA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "188",
              "Discom_Name": "msedcl",
              "Bu_Code": "4541",
              "BU_Name": "  KOLSHETH URBAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "189",
              "Discom_Name": "msedcl",
              "Bu_Code": "4591",
              "BU_Name": "  LOKMANYA NAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "190",
              "Discom_Name": "msedcl",
              "Bu_Code": "4739",
              "BU_Name": "  IP/COM PACHRASTA SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "191",
              "Discom_Name": "msedcl",
              "Bu_Code": "4643",
              "BU_Name": "  SHIL SUB DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "192",
              "Discom_Name": "msedcl",
              "Bu_Code": "4542",
              "BU_Name": "  WAGLE ESTATE S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "193",
              "Discom_Name": "msedcl",
              "Bu_Code": "4652",
              "BU_Name": "  CBD BELAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "194",
              "Discom_Name": "msedcl",
              "Bu_Code": "4892",
              "BU_Name": "  M/S BSEL TECH PREMISES CO-OP SOCIETY LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "195",
              "Discom_Name": "msedcl",
              "Bu_Code": "4877",
              "BU_Name": "  M/S INORBIT MALL PVT. LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "196",
              "Discom_Name": "msedcl",
              "Bu_Code": "4752",
              "BU_Name": "  PALM BEACH S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "197",
              "Discom_Name": "msedcl",
              "Bu_Code": "4642",
              "BU_Name": "  NERUL S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "198",
              "Discom_Name": "msedcl",
              "Bu_Code": "311",
              "BU_Name": "  PANVEL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "199",
              "Discom_Name": "msedcl",
              "Bu_Code": "345",
              "BU_Name": "  KALAOMBOLI SUB DIVN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "200",
              "Discom_Name": "msedcl",
              "Bu_Code": "4881",
              "BU_Name": "  M/S GREEN VALLY  HOMES DEVELOPER PVT.LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "201",
              "Discom_Name": "msedcl",
              "Bu_Code": "4795",
              "BU_Name": "  KHARGHAR SUB-DIVN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "202",
              "Discom_Name": "msedcl",
              "Bu_Code": "329",
              "BU_Name": "  PANVEL I (BHINGARI)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "203",
              "Discom_Name": "msedcl",
              "Bu_Code": "4641",
              "BU_Name": "  AIROLI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "204",
              "Discom_Name": "msedcl",
              "Bu_Code": "4882",
              "BU_Name": "  M/S NANDKAMAL INFOTECH PVT.LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "205",
              "Discom_Name": "msedcl",
              "Bu_Code": "4753",
              "BU_Name": "  KOPARKHAIRENE S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "206",
              "Discom_Name": "msedcl",
              "Bu_Code": "337",
              "BU_Name": "  URAN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "207",
              "Discom_Name": "msedcl",
              "Bu_Code": "2127",
              "BU_Name": "  BALLARSHA URBAN SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "208",
              "Discom_Name": "msedcl",
              "Bu_Code": "4329",
              "BU_Name": "  GONDPIPRI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "209",
              "Discom_Name": "msedcl",
              "Bu_Code": "4834",
              "BU_Name": "  JIWATI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "210",
              "Discom_Name": "msedcl",
              "Bu_Code": "4330",
              "BU_Name": "  GADCHANDUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "211",
              "Discom_Name": "msedcl",
              "Bu_Code": "4876",
              "BU_Name": "  M/S RELIABLE EXPORTS",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "212",
              "Discom_Name": "msedcl",
              "Bu_Code": "4328",
              "BU_Name": "  RAJURA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "213",
              "Discom_Name": "msedcl",
              "Bu_Code": "4127",
              "BU_Name": "  WASHI O&M S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "214",
              "Discom_Name": "msedcl",
              "Bu_Code": "2119",
              "BU_Name": "  CHANDRAPUR I (U)S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "215",
              "Discom_Name": "msedcl",
              "Bu_Code": "4833",
              "BU_Name": "  POMBHURNA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "216",
              "Discom_Name": "msedcl",
              "Bu_Code": "4327",
              "BU_Name": "  CHANDRAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "217",
              "Discom_Name": "msedcl",
              "Bu_Code": "4832",
              "BU_Name": "  SAOLI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "218",
              "Discom_Name": "msedcl",
              "Bu_Code": "2160",
              "BU_Name": "  CHANDRAPUR-II(U)SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "219",
              "Discom_Name": "msedcl",
              "Bu_Code": "2178",
              "BU_Name": "  WARORA (U) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "220",
              "Discom_Name": "msedcl",
              "Bu_Code": "2186",
              "BU_Name": "  BHADRAVATI URBAN SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "221",
              "Discom_Name": "msedcl",
              "Bu_Code": "4335",
              "BU_Name": "  MUL S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "222",
              "Discom_Name": "msedcl",
              "Bu_Code": "4337",
              "BU_Name": "  CHIMUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "223",
              "Discom_Name": "msedcl",
              "Bu_Code": "4343",
              "BU_Name": "  ALLAPALI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "224",
              "Discom_Name": "msedcl",
              "Bu_Code": "4344",
              "BU_Name": "  CHAMORSHI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "225",
              "Discom_Name": "msedcl",
              "Bu_Code": "4828",
              "BU_Name": "  BHAMARAGAD S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "226",
              "Discom_Name": "msedcl",
              "Bu_Code": "4345",
              "BU_Name": "  ETAPALLI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "227",
              "Discom_Name": "msedcl",
              "Bu_Code": "4334",
              "BU_Name": "  SIRONCHA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "228",
              "Discom_Name": "msedcl",
              "Bu_Code": "4331",
              "BU_Name": "  BRAMHAPURI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "229",
              "Discom_Name": "msedcl",
              "Bu_Code": "4336",
              "BU_Name": "  NAGBHID S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "230",
              "Discom_Name": "msedcl",
              "Bu_Code": "4827",
              "BU_Name": "  MULCHERA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "231",
              "Discom_Name": "msedcl",
              "Bu_Code": "4339",
              "BU_Name": "  ARMORI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "232",
              "Discom_Name": "msedcl",
              "Bu_Code": "4346",
              "BU_Name": "  SINDEWAHI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "233",
              "Discom_Name": "msedcl",
              "Bu_Code": "4646",
              "BU_Name": "  DHANORA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "234",
              "Discom_Name": "msedcl",
              "Bu_Code": "4338",
              "BU_Name": "  GADCHIROLI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "235",
              "Discom_Name": "msedcl",
              "Bu_Code": "4826",
              "BU_Name": "  KORCHI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "236",
              "Discom_Name": "msedcl",
              "Bu_Code": "2655",
              "BU_Name": "  GADCHIROLI CIR. IP",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "237",
              "Discom_Name": "msedcl",
              "Bu_Code": "4342",
              "BU_Name": "  KULKHEDA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "238",
              "Discom_Name": "msedcl",
              "Bu_Code": "4340",
              "BU_Name": "  WADSA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "239",
              "Discom_Name": "msedcl",
              "Bu_Code": "384",
              "BU_Name": "  BHANDARA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "240",
              "Discom_Name": "msedcl",
              "Bu_Code": "383",
              "BU_Name": "  MOHADI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "241",
              "Discom_Name": "msedcl",
              "Bu_Code": "386",
              "BU_Name": "  PAONI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "242",
              "Discom_Name": "msedcl",
              "Bu_Code": "4719",
              "BU_Name": "  LAKNI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "243",
              "Discom_Name": "msedcl",
              "Bu_Code": "1929",
              "BU_Name": "  BHANDARA URBAN S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "244",
              "Discom_Name": "msedcl",
              "Bu_Code": "385",
              "BU_Name": "  LAKHANDUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "245",
              "Discom_Name": "msedcl",
              "Bu_Code": "391",
              "BU_Name": "  SAKOLI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "246",
              "Discom_Name": "msedcl",
              "Bu_Code": "565",
              "BU_Name": "  MORGAON ARJUNI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "247",
              "Discom_Name": "msedcl",
              "Bu_Code": "389",
              "BU_Name": "  DEORI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "248",
              "Discom_Name": "msedcl",
              "Bu_Code": "388",
              "BU_Name": "  AMGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "249",
              "Discom_Name": "msedcl",
              "Bu_Code": "4812",
              "BU_Name": "  SALEKASA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "250",
              "Discom_Name": "msedcl",
              "Bu_Code": "2020",
              "BU_Name": "  TUMSAR S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "251",
              "Discom_Name": "msedcl",
              "Bu_Code": "4811",
              "BU_Name": "  SADAK ARJUNI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "252",
              "Discom_Name": "msedcl",
              "Bu_Code": "1937",
              "BU_Name": "  GONDIA URBAN S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "253",
              "Discom_Name": "msedcl",
              "Bu_Code": "574",
              "BU_Name": "  DHULE (R)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "254",
              "Discom_Name": "msedcl",
              "Bu_Code": "390",
              "BU_Name": "  GONDIA (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "255",
              "Discom_Name": "msedcl",
              "Bu_Code": "582",
              "BU_Name": "  PIMPALNER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "256",
              "Discom_Name": "msedcl",
              "Bu_Code": "392",
              "BU_Name": "  TIRORA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "257",
              "Discom_Name": "msedcl",
              "Bu_Code": "467",
              "BU_Name": "  CC O&M DHULE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "258",
              "Discom_Name": "msedcl",
              "Bu_Code": "5568",
              "BU_Name": "  DEOPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "259",
              "Discom_Name": "msedcl",
              "Bu_Code": "515",
              "BU_Name": "  DHULE (U-I)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "260",
              "Discom_Name": "msedcl",
              "Bu_Code": "4810",
              "BU_Name": "  GOREGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "261",
              "Discom_Name": "msedcl",
              "Bu_Code": "523",
              "BU_Name": "  SAKRI S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "262",
              "Discom_Name": "msedcl",
              "Bu_Code": "558",
              "BU_Name": "  SHINDKHEDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "263",
              "Discom_Name": "msedcl",
              "Bu_Code": "5525",
              "BU_Name": "  DONDAICHA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "264",
              "Discom_Name": "msedcl",
              "Bu_Code": "566",
              "BU_Name": "  NARDANA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "265",
              "Discom_Name": "msedcl",
              "Bu_Code": "5576",
              "BU_Name": "  SHIRPUR-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "266",
              "Discom_Name": "msedcl",
              "Bu_Code": "5550",
              "BU_Name": "  SHIRPUR-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "267",
              "Discom_Name": "msedcl",
              "Bu_Code": "621",
              "BU_Name": "  BHUSAWAL U-I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "268",
              "Discom_Name": "msedcl",
              "Bu_Code": "4713",
              "BU_Name": "  BHUSAWAL U-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "269",
              "Discom_Name": "msedcl",
              "Bu_Code": "612",
              "BU_Name": "  BHUSAWAL (E&M)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "270",
              "Discom_Name": "msedcl",
              "Bu_Code": "671",
              "BU_Name": "  EDLABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "271",
              "Discom_Name": "msedcl",
              "Bu_Code": "698",
              "BU_Name": "  BODWAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "272",
              "Discom_Name": "msedcl",
              "Bu_Code": "8176",
              "BU_Name": "  PAHUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "273",
              "Discom_Name": "msedcl",
              "Bu_Code": "680",
              "BU_Name": "  JAMNER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "274",
              "Discom_Name": "msedcl",
              "Bu_Code": "580",
              "BU_Name": "  CHALISGAON R-III",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "275",
              "Discom_Name": "msedcl",
              "Bu_Code": "8150",
              "BU_Name": "  CHALISGAON-R-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "276",
              "Discom_Name": "msedcl",
              "Bu_Code": "5606",
              "BU_Name": "  VARANGAON S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "277",
              "Discom_Name": "msedcl",
              "Bu_Code": "8141",
              "BU_Name": "  CHALISGAON-R-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "278",
              "Discom_Name": "msedcl",
              "Bu_Code": "240",
              "BU_Name": "  CHALISGAON-U",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "279",
              "Discom_Name": "msedcl",
              "Bu_Code": "5622",
              "BU_Name": "  AMALNER (U) S/DIVN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "280",
              "Discom_Name": "msedcl",
              "Bu_Code": "233",
              "BU_Name": "  CHOPDA I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "281",
              "Discom_Name": "msedcl",
              "Bu_Code": "5657",
              "BU_Name": "  AMALNER-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "282",
              "Discom_Name": "msedcl",
              "Bu_Code": "5614",
              "BU_Name": "  DHARANGAON DIVISION.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "283",
              "Discom_Name": "msedcl",
              "Bu_Code": "8192",
              "BU_Name": "  CHOPDA-II S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "284",
              "Discom_Name": "msedcl",
              "Bu_Code": "236",
              "BU_Name": "  JALGAON (U)-I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "285",
              "Discom_Name": "msedcl",
              "Bu_Code": "235",
              "BU_Name": "  ERANDOL S/DIVN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "286",
              "Discom_Name": "msedcl",
              "Bu_Code": "4656",
              "BU_Name": "  JALGAON DN. HP CT",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "287",
              "Discom_Name": "msedcl",
              "Bu_Code": "4848",
              "BU_Name": "  JALGAON ENERGY (P) LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "288",
              "Discom_Name": "msedcl",
              "Bu_Code": "5690",
              "BU_Name": "  NASHIRABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "289",
              "Discom_Name": "msedcl",
              "Bu_Code": "5673",
              "BU_Name": "  JALGAON U DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "290",
              "Discom_Name": "msedcl",
              "Bu_Code": "5665",
              "BU_Name": "  JALGAON-R",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "291",
              "Discom_Name": "msedcl",
              "Bu_Code": "4237",
              "BU_Name": "  JALGAON U-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "292",
              "Discom_Name": "msedcl",
              "Bu_Code": "4236",
              "BU_Name": "  JALGAON U-I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "293",
              "Discom_Name": "msedcl",
              "Bu_Code": "8125",
              "BU_Name": "  BHADGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "294",
              "Discom_Name": "msedcl",
              "Bu_Code": "590",
              "BU_Name": "  NAGAR DEOLA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "295",
              "Discom_Name": "msedcl",
              "Bu_Code": "8168",
              "BU_Name": "  PACHORA-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "296",
              "Discom_Name": "msedcl",
              "Bu_Code": "663",
              "BU_Name": "  SAVADA SUB DIVISION.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "297",
              "Discom_Name": "msedcl",
              "Bu_Code": "8184",
              "BU_Name": "  PACHORA-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "298",
              "Discom_Name": "msedcl",
              "Bu_Code": "639",
              "BU_Name": "  YAWAL I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "299",
              "Discom_Name": "msedcl",
              "Bu_Code": "8133",
              "BU_Name": "  PAROLA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "300",
              "Discom_Name": "msedcl",
              "Bu_Code": "5517",
              "BU_Name": "  NANDURBAR-R",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "301",
              "Discom_Name": "msedcl",
              "Bu_Code": "655",
              "BU_Name": "  RAVER S/DIVISION.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "302",
              "Discom_Name": "msedcl",
              "Bu_Code": "591",
              "BU_Name": "  NANDURBAR-U",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "303",
              "Discom_Name": "msedcl",
              "Bu_Code": "647",
              "BU_Name": "  YAWAL II SUBDN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "304",
              "Discom_Name": "msedcl",
              "Bu_Code": "5584",
              "BU_Name": "  NANDURBAR-R",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "305",
              "Discom_Name": "msedcl",
              "Bu_Code": "5533",
              "BU_Name": "  SHAHADA-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "306",
              "Discom_Name": "msedcl",
              "Bu_Code": "540",
              "BU_Name": "  SHAHADA - II S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "307",
              "Discom_Name": "msedcl",
              "Bu_Code": "546",
              "BU_Name": "  NAVAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "308",
              "Discom_Name": "msedcl",
              "Bu_Code": "5541",
              "BU_Name": "  TALODA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "309",
              "Discom_Name": "msedcl",
              "Bu_Code": "4837",
              "BU_Name": "  AKKALKUWA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "310",
              "Discom_Name": "msedcl",
              "Bu_Code": "4768",
              "BU_Name": "  DOMBIVALI(W) S/DN-IV",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "311",
              "Discom_Name": "msedcl",
              "Bu_Code": "4167",
              "BU_Name": "  DOMBIVALI (W) SN-III",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "312",
              "Discom_Name": "msedcl",
              "Bu_Code": "4166",
              "BU_Name": "  DOMBIVALI (E) S/DN-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "313",
              "Discom_Name": "msedcl",
              "Bu_Code": "4720",
              "BU_Name": "  DOMBIVALI WEST IISDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "314",
              "Discom_Name": "msedcl",
              "Bu_Code": "4861",
              "BU_Name": "   M/S LODHA DWELLERS PVT.LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "315",
              "Discom_Name": "msedcl",
              "Bu_Code": "4151",
              "BU_Name": "  KALYAN (E) S/DN.I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "316",
              "Discom_Name": "msedcl",
              "Bu_Code": "4875",
              "BU_Name": "  CASA RIO",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "317",
              "Discom_Name": "msedcl",
              "Bu_Code": "4577",
              "BU_Name": "  KALYAN (E) S/DN.III",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "318",
              "Discom_Name": "msedcl",
              "Bu_Code": "4169",
              "BU_Name": "  KALYAN (E) S/DN.II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "319",
              "Discom_Name": "msedcl",
              "Bu_Code": "4879",
              "BU_Name": " WEST PIONEERS PROPERTIES (INDIA) PVT. LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "320",
              "Discom_Name": "msedcl",
              "Bu_Code": "4751",
              "BU_Name": "  KALYAN (W) S/DN-III",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "321",
              "Discom_Name": "msedcl",
              "Bu_Code": "4405",
              "BU_Name": "  BADLAPUR (E) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "322",
              "Discom_Name": "msedcl",
              "Bu_Code": "4696",
              "BU_Name": "  KALYAN (W) S/DN-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "323",
              "Discom_Name": "msedcl",
              "Bu_Code": "4838",
              "BU_Name": "  DHADGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "324",
              "Discom_Name": "msedcl",
              "Bu_Code": "4168",
              "BU_Name": "  KALYAN (W) S/DN-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "325",
              "Discom_Name": "msedcl",
              "Bu_Code": "4073",
              "BU_Name": "  KALYAN CC O&M S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "326",
              "Discom_Name": "msedcl",
              "Bu_Code": "4755",
              "BU_Name": "  BADLAPUR (W) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "327",
              "Discom_Name": "msedcl",
              "Bu_Code": "4456",
              "BU_Name": "  MURBAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "328",
              "Discom_Name": "msedcl",
              "Bu_Code": "4448",
              "BU_Name": "  SHAHAPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "329",
              "Discom_Name": "msedcl",
              "Bu_Code": "4175",
              "BU_Name": "  AMBERNATH(WEST)S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "330",
              "Discom_Name": "msedcl",
              "Bu_Code": "4172",
              "BU_Name": "  ULHASNAGAR III S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "331",
              "Discom_Name": "msedcl",
              "Bu_Code": "4754",
              "BU_Name": "  AMBERNATH(EAST)S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "332",
              "Discom_Name": "msedcl",
              "Bu_Code": "4171",
              "BU_Name": "  ULHASNAGAR II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "333",
              "Discom_Name": "msedcl",
              "Bu_Code": "4174",
              "BU_Name": "  ULHASNAGAR  V S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "334",
              "Discom_Name": "msedcl",
              "Bu_Code": "4173",
              "BU_Name": "  ULHASNAGAR IV S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "335",
              "Discom_Name": "msedcl",
              "Bu_Code": "4137",
              "BU_Name": "  ALIBAG-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "336",
              "Discom_Name": "msedcl",
              "Bu_Code": "4142",
              "BU_Name": "  PEN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "337",
              "Discom_Name": "msedcl",
              "Bu_Code": "4130",
              "BU_Name": "  MAHAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "338",
              "Discom_Name": "msedcl",
              "Bu_Code": "4129",
              "BU_Name": "  GOREGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "339",
              "Discom_Name": "msedcl",
              "Bu_Code": "4131",
              "BU_Name": "  MHASALA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "340",
              "Discom_Name": "msedcl",
              "Bu_Code": "4138",
              "BU_Name": "  ALIBAG-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "341",
              "Discom_Name": "msedcl",
              "Bu_Code": "4136",
              "BU_Name": "  SHRIWARDHAN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "342",
              "Discom_Name": "msedcl",
              "Bu_Code": "4813",
              "BU_Name": "  KHALAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "343",
              "Discom_Name": "msedcl",
              "Bu_Code": "4139",
              "BU_Name": "  KARJAT",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "344",
              "Discom_Name": "msedcl",
              "Bu_Code": "4140",
              "BU_Name": "  KHOPOLI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "345",
              "Discom_Name": "msedcl",
              "Bu_Code": "4805",
              "BU_Name": "  MANGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "346",
              "Discom_Name": "msedcl",
              "Bu_Code": "4141",
              "BU_Name": "  PANVEL-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "347",
              "Discom_Name": "msedcl",
              "Bu_Code": "4132",
              "BU_Name": "  MURUD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "348",
              "Discom_Name": "msedcl",
              "Bu_Code": "4133",
              "BU_Name": "  PALI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "349",
              "Discom_Name": "msedcl",
              "Bu_Code": "4804",
              "BU_Name": "  TALA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "350",
              "Discom_Name": "msedcl",
              "Bu_Code": "4159",
              "BU_Name": "  BOISAR (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "351",
              "Discom_Name": "msedcl",
              "Bu_Code": "4160",
              "BU_Name": "  DAHANU S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "352",
              "Discom_Name": "msedcl",
              "Bu_Code": "4161",
              "BU_Name": "  JAWHAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "353",
              "Discom_Name": "msedcl",
              "Bu_Code": "4135",
              "BU_Name": "  ROHA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "354",
              "Discom_Name": "msedcl",
              "Bu_Code": "4163",
              "BU_Name": "  MIDC(BOISAR) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "355",
              "Discom_Name": "msedcl",
              "Bu_Code": "4162",
              "BU_Name": "  PALGHAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "356",
              "Discom_Name": "msedcl",
              "Bu_Code": "4825",
              "BU_Name": "  VIKRAMAGAD S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "357",
              "Discom_Name": "msedcl",
              "Bu_Code": "4164",
              "BU_Name": "  SAFALA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "358",
              "Discom_Name": "msedcl",
              "Bu_Code": "4698",
              "BU_Name": "  VASAI RD. AG/ST.S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "359",
              "Discom_Name": "msedcl",
              "Bu_Code": "4880",
              "BU_Name": "  M/S DATTANI ESTATE DEVELOPERS",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "360",
              "Discom_Name": "msedcl",
              "Bu_Code": "4165",
              "BU_Name": "  TALASARI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "361",
              "Discom_Name": "msedcl",
              "Bu_Code": "27",
              "BU_Name": "  VASAI E. AG/STR S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "362",
              "Discom_Name": "msedcl",
              "Bu_Code": "4341",
              "BU_Name": "  VASAI RD. URBAN S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "363",
              "Discom_Name": "msedcl",
              "Bu_Code": "4134",
              "BU_Name": "  POLADPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "364",
              "Discom_Name": "msedcl",
              "Bu_Code": "4359",
              "BU_Name": "  VASAI RD. EAST S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "365",
              "Discom_Name": "msedcl",
              "Bu_Code": "4824",
              "BU_Name": "  MOKHADA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "366",
              "Discom_Name": "msedcl",
              "Bu_Code": "4697",
              "BU_Name": "  VASAI RD. WEST S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "367",
              "Discom_Name": "msedcl",
              "Bu_Code": "19",
              "BU_Name": "  VASAI U. AG/STR S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "368",
              "Discom_Name": "msedcl",
              "Bu_Code": "4867",
              "BU_Name": "  ACHOLE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "369",
              "Discom_Name": "msedcl",
              "Bu_Code": "35",
              "BU_Name": "  NALASOPARA AG/ST.SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "370",
              "Discom_Name": "msedcl",
              "Bu_Code": "4158",
              "BU_Name": "  WADA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "371",
              "Discom_Name": "msedcl",
              "Bu_Code": "4709",
              "BU_Name": "  NALASOPARA(E)IP.S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "372",
              "Discom_Name": "msedcl",
              "Bu_Code": "4708",
              "BU_Name": "  NALASOPARA EAST S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "373",
              "Discom_Name": "msedcl",
              "Bu_Code": "4375",
              "BU_Name": "  NALASOPARA WEST S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "374",
              "Discom_Name": "msedcl",
              "Bu_Code": "43",
              "BU_Name": "  VIRAR AG/STR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "375",
              "Discom_Name": "msedcl",
              "Bu_Code": "4706",
              "BU_Name": "  VIRAR EAST S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "376",
              "Discom_Name": "msedcl",
              "Bu_Code": "4464",
              "BU_Name": "  VIRAR WEST S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "377",
              "Discom_Name": "msedcl",
              "Bu_Code": "4177",
              "BU_Name": "  CHIPLUN (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "378",
              "Discom_Name": "msedcl",
              "Bu_Code": "4717",
              "BU_Name": "  SAWARDA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "379",
              "Discom_Name": "msedcl",
              "Bu_Code": "4176",
              "BU_Name": "  CHIPLUN (U) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "380",
              "Discom_Name": "msedcl",
              "Bu_Code": "4178",
              "BU_Name": "  DAPOLI I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "381",
              "Discom_Name": "msedcl",
              "Bu_Code": "4761",
              "BU_Name": "  DAPOLI II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "382",
              "Discom_Name": "msedcl",
              "Bu_Code": "4179",
              "BU_Name": "  GUGHAGAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "383",
              "Discom_Name": "msedcl",
              "Bu_Code": "4181",
              "BU_Name": "  MANDANGAD S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "384",
              "Discom_Name": "msedcl",
              "Bu_Code": "4762",
              "BU_Name": "  LOTE(MIDC) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "385",
              "Discom_Name": "msedcl",
              "Bu_Code": "4180",
              "BU_Name": "  KHED S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "386",
              "Discom_Name": "msedcl",
              "Bu_Code": "4189",
              "BU_Name": "  DEORUKH S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "387",
              "Discom_Name": "msedcl",
              "Bu_Code": "4572",
              "BU_Name": "  LANJA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "388",
              "Discom_Name": "msedcl",
              "Bu_Code": "4191",
              "BU_Name": "  RAJAPUR I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "389",
              "Discom_Name": "msedcl",
              "Bu_Code": "4763",
              "BU_Name": "  RAJAPUR II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "390",
              "Discom_Name": "msedcl",
              "Bu_Code": "4190",
              "BU_Name": "  RATNAGIRI R-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "391",
              "Discom_Name": "msedcl",
              "Bu_Code": "4192",
              "BU_Name": "  RATNAGIRI R-I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "392",
              "Discom_Name": "msedcl",
              "Bu_Code": "4193",
              "BU_Name": "  RATANAGIRI (U)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "393",
              "Discom_Name": "msedcl",
              "Bu_Code": "4766",
              "BU_Name": "  ACHARA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "394",
              "Discom_Name": "msedcl",
              "Bu_Code": "4183",
              "BU_Name": "  DEOGAD S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "395",
              "Discom_Name": "msedcl",
              "Bu_Code": "4184",
              "BU_Name": "  KANKAVALI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "396",
              "Discom_Name": "msedcl",
              "Bu_Code": "4186",
              "BU_Name": "  MALWAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "397",
              "Discom_Name": "msedcl",
              "Bu_Code": "4185",
              "BU_Name": "  KUDAL I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "398",
              "Discom_Name": "msedcl",
              "Bu_Code": "4764",
              "BU_Name": "  SANGAMESHWAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "399",
              "Discom_Name": "msedcl",
              "Bu_Code": "4532",
              "BU_Name": "  VAIBHAVWADI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "400",
              "Discom_Name": "msedcl",
              "Bu_Code": "1155",
              "BU_Name": "  AJARA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "401",
              "Discom_Name": "msedcl",
              "Bu_Code": "4765",
              "BU_Name": "  KUDAL II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "402",
              "Discom_Name": "msedcl",
              "Bu_Code": "4187",
              "BU_Name": "  SAWANTWADI (U) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "403",
              "Discom_Name": "msedcl",
              "Bu_Code": "4188",
              "BU_Name": "  SAWANTWADI (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "404",
              "Discom_Name": "msedcl",
              "Bu_Code": "4182",
              "BU_Name": "  VENGURLA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "405",
              "Discom_Name": "msedcl",
              "Bu_Code": "1147",
              "BU_Name": "  CHANDGAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "406",
              "Discom_Name": "msedcl",
              "Bu_Code": "1121",
              "BU_Name": "  GADHINGLAJ",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "407",
              "Discom_Name": "msedcl",
              "Bu_Code": "9121",
              "BU_Name": "  ICHALKARANJI(RURAL)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "408",
              "Discom_Name": "msedcl",
              "Bu_Code": "4710",
              "BU_Name": "  ICHALKARNJI A S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "409",
              "Discom_Name": "msedcl",
              "Bu_Code": "1139",
              "BU_Name": "  NESARI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "410",
              "Discom_Name": "msedcl",
              "Bu_Code": "1180",
              "BU_Name": "  KURUNDWAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "411",
              "Discom_Name": "msedcl",
              "Bu_Code": "4711",
              "BU_Name": "  ICHALKARNJI B S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "412",
              "Discom_Name": "msedcl",
              "Bu_Code": "1163",
              "BU_Name": "  HATKANANGALE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "413",
              "Discom_Name": "msedcl",
              "Bu_Code": "9148",
              "BU_Name": "  SHIROL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "414",
              "Discom_Name": "msedcl",
              "Bu_Code": "1171",
              "BU_Name": "  JAYSINGPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "415",
              "Discom_Name": "msedcl",
              "Bu_Code": "4170",
              "BU_Name": "  ULHASNAGAR I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "416",
              "Discom_Name": "msedcl",
              "Bu_Code": "1198",
              "BU_Name": "  VADGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "417",
              "Discom_Name": "msedcl",
              "Bu_Code": "4807",
              "BU_Name": "  GAGANBAWADA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "418",
              "Discom_Name": "msedcl",
              "Bu_Code": "6173",
              "BU_Name": "  KADAMWADI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "419",
              "Discom_Name": "msedcl",
              "Bu_Code": "6149",
              "BU_Name": "  KALE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "420",
              "Discom_Name": "msedcl",
              "Bu_Code": "6181",
              "BU_Name": "  PHULEWADI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "421",
              "Discom_Name": "msedcl",
              "Bu_Code": "6190",
              "BU_Name": "  MALKAPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "422",
              "Discom_Name": "msedcl",
              "Bu_Code": "6165",
              "BU_Name": "  PARITE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "423",
              "Discom_Name": "msedcl",
              "Bu_Code": "6157",
              "BU_Name": "  KODOLI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "424",
              "Discom_Name": "msedcl",
              "Bu_Code": "6131",
              "BU_Name": "  PANHALA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "425",
              "Discom_Name": "msedcl",
              "Bu_Code": "7129",
              "BU_Name": "  KAGAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "426",
              "Discom_Name": "msedcl",
              "Bu_Code": "7145",
              "BU_Name": "  RADHANAGARI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "427",
              "Discom_Name": "msedcl",
              "Bu_Code": "7111",
              "BU_Name": "  HUPARI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "428",
              "Discom_Name": "msedcl",
              "Bu_Code": "7137",
              "BU_Name": "  GARGOTI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "429",
              "Discom_Name": "msedcl",
              "Bu_Code": "7153",
              "BU_Name": "  MURGUD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "430",
              "Discom_Name": "msedcl",
              "Bu_Code": "4016",
              "BU_Name": "  KOLHAPUR U.(E) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "431",
              "Discom_Name": "msedcl",
              "Bu_Code": "4884",
              "BU_Name": "  M/S SANJAY D. PATIL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "432",
              "Discom_Name": "msedcl",
              "Bu_Code": "4018",
              "BU_Name": "  KOLHAPUR U.(W) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "433",
              "Discom_Name": "msedcl",
              "Bu_Code": "4019",
              "BU_Name": "  KOLHAPUR U.(N) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "434",
              "Discom_Name": "msedcl",
              "Bu_Code": "4017",
              "BU_Name": "  KOLHAPUR U. CENTRAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "435",
              "Discom_Name": "msedcl",
              "Bu_Code": "4021",
              "BU_Name": "  KOLHAPUR U.MARKET Y.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "436",
              "Discom_Name": "msedcl",
              "Bu_Code": "6246",
              "BU_Name": "  ASTHA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "437",
              "Discom_Name": "msedcl",
              "Bu_Code": "6211",
              "BU_Name": "  ISLAMPUR (I)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "438",
              "Discom_Name": "msedcl",
              "Bu_Code": "6220",
              "BU_Name": "  ISLAMPUR (II)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "439",
              "Discom_Name": "msedcl",
              "Bu_Code": "6238",
              "BU_Name": "  SHIRALA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "440",
              "Discom_Name": "msedcl",
              "Bu_Code": "4788",
              "BU_Name": "  MIRAJ RURAL-II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "441",
              "Discom_Name": "msedcl",
              "Bu_Code": "1295",
              "BU_Name": "  K.MAHANKAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "442",
              "Discom_Name": "msedcl",
              "Bu_Code": "4721",
              "BU_Name": "  SANKH S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "443",
              "Discom_Name": "msedcl",
              "Bu_Code": "1287",
              "BU_Name": "  JATH",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "444",
              "Discom_Name": "msedcl",
              "Bu_Code": "4789",
              "BU_Name": "  SAVLAJ S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "445",
              "Discom_Name": "msedcl",
              "Bu_Code": "1261",
              "BU_Name": "  TASGAON (I)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "446",
              "Discom_Name": "msedcl",
              "Bu_Code": "4068",
              "BU_Name": "  CENTRAL ZONE,SANGLI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "447",
              "Discom_Name": "msedcl",
              "Bu_Code": "1236",
              "BU_Name": "  MADHAVNAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "448",
              "Discom_Name": "msedcl",
              "Bu_Code": "1228",
              "BU_Name": "  MIRAJ urban",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "449",
              "Discom_Name": "msedcl",
              "Bu_Code": "1279",
              "BU_Name": "  TASGAON (II)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "450",
              "Discom_Name": "msedcl",
              "Bu_Code": "4067",
              "BU_Name": "  SANGLIWADI WEST ZONE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "451",
              "Discom_Name": "msedcl",
              "Bu_Code": "1252",
              "BU_Name": "  VISHRAMBAG",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "452",
              "Discom_Name": "msedcl",
              "Bu_Code": "4069",
              "BU_Name": "  SOUTH ZONE,SANGLI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "453",
              "Discom_Name": "msedcl",
              "Bu_Code": "4066",
              "BU_Name": "  VISHRAMBAG NORTH ZN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "454",
              "Discom_Name": "msedcl",
              "Bu_Code": "6289",
              "BU_Name": "  ATPADI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "455",
              "Discom_Name": "msedcl",
              "Bu_Code": "6262",
              "BU_Name": "  VITA II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "456",
              "Discom_Name": "msedcl",
              "Bu_Code": "6254",
              "BU_Name": "  VITA I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "457",
              "Discom_Name": "msedcl",
              "Bu_Code": "6271",
              "BU_Name": "  KIRLOSKARWADI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "458",
              "Discom_Name": "msedcl",
              "Bu_Code": "4836",
              "BU_Name": "  KHANAPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "459",
              "Discom_Name": "msedcl",
              "Bu_Code": "4744",
              "BU_Name": "  DHARUR SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "460",
              "Discom_Name": "msedcl",
              "Bu_Code": "2593",
              "BU_Name": "  MAJALGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "461",
              "Discom_Name": "msedcl",
              "Bu_Code": "2569",
              "BU_Name": "  AMBEJOGAI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "462",
              "Discom_Name": "msedcl",
              "Bu_Code": "5631",
              "BU_Name": "  TALEGAON S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "463",
              "Discom_Name": "msedcl",
              "Bu_Code": "2518",
              "BU_Name": "  BEED     (U) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "464",
              "Discom_Name": "msedcl",
              "Bu_Code": "2534",
              "BU_Name": "  GEORAI (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "465",
              "Discom_Name": "msedcl",
              "Bu_Code": "2542",
              "BU_Name": "  BEED RURAL S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "466",
              "Discom_Name": "msedcl",
              "Bu_Code": "2551",
              "BU_Name": "  ASHTI (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "467",
              "Discom_Name": "msedcl",
              "Bu_Code": "2585",
              "BU_Name": "  PARALI (R) S-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "468",
              "Discom_Name": "msedcl",
              "Bu_Code": "2526",
              "BU_Name": "  PATODA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "469",
              "Discom_Name": "msedcl",
              "Bu_Code": "5126",
              "BU_Name": "  LATUR (R) S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "470",
              "Discom_Name": "msedcl",
              "Bu_Code": "4802",
              "BU_Name": "  SHIRUR(KASAR) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "471",
              "Discom_Name": "msedcl",
              "Bu_Code": "5118",
              "BU_Name": "  LATUR   (U)  S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "472",
              "Discom_Name": "msedcl",
              "Bu_Code": "2680",
              "BU_Name": "  LATUR CIRCLE HP",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "473",
              "Discom_Name": "msedcl",
              "Bu_Code": "4640",
              "BU_Name": "  LATUR (U) S/D(SOUTH)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "474",
              "Discom_Name": "msedcl",
              "Bu_Code": "5134",
              "BU_Name": "  MURURD (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "475",
              "Discom_Name": "msedcl",
              "Bu_Code": "2577",
              "BU_Name": "  KAIJ (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "476",
              "Discom_Name": "msedcl",
              "Bu_Code": "5185",
              "BU_Name": "  AUSA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "477",
              "Discom_Name": "msedcl",
              "Bu_Code": "4718",
              "BU_Name": "  KILLARI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "478",
              "Discom_Name": "msedcl",
              "Bu_Code": "5177",
              "BU_Name": "  NILANGA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "479",
              "Discom_Name": "msedcl",
              "Bu_Code": "5649",
              "BU_Name": "  RENAPUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "480",
              "Discom_Name": "msedcl",
              "Bu_Code": "5151",
              "BU_Name": "  AHMEDPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "481",
              "Discom_Name": "msedcl",
              "Bu_Code": "5169",
              "BU_Name": "  CHAKUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "482",
              "Discom_Name": "msedcl",
              "Bu_Code": "4823",
              "BU_Name": "  SHIRUR ANANTPAL S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "483",
              "Discom_Name": "msedcl",
              "Bu_Code": "4822",
              "BU_Name": "  DEVANI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "484",
              "Discom_Name": "msedcl",
              "Bu_Code": "5193",
              "BU_Name": "  SHIRUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "485",
              "Discom_Name": "msedcl",
              "Bu_Code": "5142",
              "BU_Name": "  UDGIR(R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "486",
              "Discom_Name": "msedcl",
              "Bu_Code": "4742",
              "BU_Name": "  UDGIR URBAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "487",
              "Discom_Name": "msedcl",
              "Bu_Code": "2666",
              "BU_Name": "  KALAM (R)S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "488",
              "Discom_Name": "msedcl",
              "Bu_Code": "2640",
              "BU_Name": "  BHOOM (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "489",
              "Discom_Name": "msedcl",
              "Bu_Code": "4783",
              "BU_Name": "  AHMEDPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "490",
              "Discom_Name": "msedcl",
              "Bu_Code": "2615",
              "BU_Name": "  OSMANABAD (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "491",
              "Discom_Name": "msedcl",
              "Bu_Code": "2658",
              "BU_Name": "  PARANDA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "492",
              "Discom_Name": "msedcl",
              "Bu_Code": "4758",
              "BU_Name": "  LOHARA S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "493",
              "Discom_Name": "msedcl",
              "Bu_Code": "4741",
              "BU_Name": "  OSMANABAD (U) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "494",
              "Discom_Name": "msedcl",
              "Bu_Code": "2623",
              "BU_Name": "  TER (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "495",
              "Discom_Name": "msedcl",
              "Bu_Code": "2674",
              "BU_Name": "  OMERGA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "496",
              "Discom_Name": "msedcl",
              "Bu_Code": "2631",
              "BU_Name": "  TULJAPUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "497",
              "Discom_Name": "msedcl",
              "Bu_Code": "560",
              "BU_Name": "  JALALKHEDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "498",
              "Discom_Name": "msedcl",
              "Bu_Code": "353",
              "BU_Name": "  NARKHED S DIV",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "499",
              "Discom_Name": "msedcl",
              "Bu_Code": "354",
              "BU_Name": "  MOHAPPA (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "500",
              "Discom_Name": "msedcl",
              "Bu_Code": "561",
              "BU_Name": "  SAWARGAON S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "501",
              "Discom_Name": "msedcl",
              "Bu_Code": "1945",
              "BU_Name": "  KATOL RURAL S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "502",
              "Discom_Name": "msedcl",
              "Bu_Code": "1953",
              "BU_Name": "  kondhali RURAL s/dn",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "503",
              "Discom_Name": "msedcl",
              "Bu_Code": "4820",
              "BU_Name": "  WASHI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "504",
              "Discom_Name": "msedcl",
              "Bu_Code": "358",
              "BU_Name": "  BHIVAPURA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "505",
              "Discom_Name": "msedcl",
              "Bu_Code": "1911",
              "BU_Name": "  KAMTEE URBAN  SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "506",
              "Discom_Name": "msedcl",
              "Bu_Code": "359",
              "BU_Name": "  MOUDA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "507",
              "Discom_Name": "msedcl",
              "Bu_Code": "361",
              "BU_Name": "  KUHI (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "508",
              "Discom_Name": "msedcl",
              "Bu_Code": "356",
              "BU_Name": "  RAMTEKE S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "509",
              "Discom_Name": "msedcl",
              "Bu_Code": "363",
              "BU_Name": "  KALMESHWAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "510",
              "Discom_Name": "msedcl",
              "Bu_Code": "360",
              "BU_Name": "  KANHAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "511",
              "Discom_Name": "msedcl",
              "Bu_Code": "357",
              "BU_Name": "  UMRER S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "512",
              "Discom_Name": "msedcl",
              "Bu_Code": "364",
              "BU_Name": "  KHAPARKHEDA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "513",
              "Discom_Name": "msedcl",
              "Bu_Code": "3654",
              "BU_Name": "  NAGPUR DN.-I CT",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "514",
              "Discom_Name": "msedcl",
              "Bu_Code": "366",
              "BU_Name": "  KHAPA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "515",
              "Discom_Name": "msedcl",
              "Bu_Code": "4854",
              "BU_Name": "  RAMNATH CITY S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "516",
              "Discom_Name": "msedcl",
              "Bu_Code": "531",
              "BU_Name": "  PARSIONI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "517",
              "Discom_Name": "msedcl",
              "Bu_Code": "365",
              "BU_Name": "  SAONER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "518",
              "Discom_Name": "msedcl",
              "Bu_Code": "3905",
              "BU_Name": "  NAGPUR (U) S/DN.I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "519",
              "Discom_Name": "msedcl",
              "Bu_Code": "4691",
              "BU_Name": "  MIDC - II S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "520",
              "Discom_Name": "msedcl",
              "Bu_Code": "4690",
              "BU_Name": "  MIDC - I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "521",
              "Discom_Name": "msedcl",
              "Bu_Code": "562",
              "BU_Name": "  BUTIBORI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "522",
              "Discom_Name": "msedcl",
              "Bu_Code": "3956",
              "BU_Name": "  HINGANA S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "523",
              "Discom_Name": "msedcl",
              "Bu_Code": "7986",
              "BU_Name": "  MIDC CT METER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "524",
              "Discom_Name": "msedcl",
              "Bu_Code": "4681",
              "BU_Name": "  SHANKAR NAGAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "525",
              "Discom_Name": "msedcl",
              "Bu_Code": "4682",
              "BU_Name": "  REGENT S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "526",
              "Discom_Name": "msedcl",
              "Bu_Code": "7943",
              "BU_Name": "  A DN. CT METER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "527",
              "Discom_Name": "msedcl",
              "Bu_Code": "4683",
              "BU_Name": "  TRIMURTI NAGAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "528",
              "Discom_Name": "msedcl",
              "Bu_Code": "4678",
              "BU_Name": "  CIVIL LINE S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "529",
              "Discom_Name": "msedcl",
              "Bu_Code": "7951",
              "BU_Name": "  B DN. CT METER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "530",
              "Discom_Name": "msedcl",
              "Bu_Code": "4679",
              "BU_Name": "  MRS S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "531",
              "Discom_Name": "msedcl",
              "Bu_Code": "4680",
              "BU_Name": "  LASHKARIBAG S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "532",
              "Discom_Name": "msedcl",
              "Bu_Code": "4689",
              "BU_Name": "  BINAKI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "533",
              "Discom_Name": "msedcl",
              "Bu_Code": "4688",
              "BU_Name": "  WARDHAMAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "534",
              "Discom_Name": "msedcl",
              "Bu_Code": "7978",
              "BU_Name": "  D DN. CT METER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "535",
              "Discom_Name": "msedcl",
              "Bu_Code": "7960",
              "BU_Name": "  C DN. CT METER",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "536",
              "Discom_Name": "msedcl",
              "Bu_Code": "4687",
              "BU_Name": "  ITWARI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "537",
              "Discom_Name": "msedcl",
              "Bu_Code": "4872",
              "BU_Name": "  SUBHEDAR SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "538",
              "Discom_Name": "msedcl",
              "Bu_Code": "4684",
              "BU_Name": "  MANEWADA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "539",
              "Discom_Name": "msedcl",
              "Bu_Code": "4685",
              "BU_Name": "  TULSHIBAG S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "540",
              "Discom_Name": "msedcl",
              "Bu_Code": "4686",
              "BU_Name": "  NANDANWAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "541",
              "Discom_Name": "msedcl",
              "Bu_Code": "1848",
              "BU_Name": "  ARVI URBAN S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "542",
              "Discom_Name": "msedcl",
              "Bu_Code": "4379",
              "BU_Name": "  KARANJA SUB DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "543",
              "Discom_Name": "msedcl",
              "Bu_Code": "1244",
              "BU_Name": "  MIRAJ RURAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "544",
              "Discom_Name": "msedcl",
              "Bu_Code": "4380",
              "BU_Name": "  KHARANGANA (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "545",
              "Discom_Name": "msedcl",
              "Bu_Code": "1830",
              "BU_Name": "  HINGANGHAT (U) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "546",
              "Discom_Name": "msedcl",
              "Bu_Code": "1881",
              "BU_Name": "  PULGAON  URBAN S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "547",
              "Discom_Name": "msedcl",
              "Bu_Code": "4377",
              "BU_Name": "  ASHTI SUB DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "548",
              "Discom_Name": "msedcl",
              "Bu_Code": "1856",
              "BU_Name": "  DEOLI RURAL S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "549",
              "Discom_Name": "msedcl",
              "Bu_Code": "1864",
              "BU_Name": "  SAMUDRAPUR RURAL SDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "550",
              "Discom_Name": "msedcl",
              "Bu_Code": "3808",
              "BU_Name": "  SELU RURAL S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "551",
              "Discom_Name": "msedcl",
              "Bu_Code": "4372",
              "BU_Name": "  WARDHA S/DN. R-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "552",
              "Discom_Name": "msedcl",
              "Bu_Code": "4371",
              "BU_Name": "  WARDHA S/DN. R-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "553",
              "Discom_Name": "msedcl",
              "Bu_Code": "1813",
              "BU_Name": "  WARDHA URBAN S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "554",
              "Discom_Name": "msedcl",
              "Bu_Code": "4373",
              "BU_Name": "  HINGHANGHAT S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "555",
              "Discom_Name": "msedcl",
              "Bu_Code": "4798",
              "BU_Name": "  AUNDHA NAGNATH S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "556",
              "Discom_Name": "msedcl",
              "Bu_Code": "2364",
              "BU_Name": "  BASMAT (R) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "557",
              "Discom_Name": "msedcl",
              "Bu_Code": "2399",
              "BU_Name": "  KALAMNURI (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "558",
              "Discom_Name": "msedcl",
              "Bu_Code": "2381",
              "BU_Name": "  HINGOLI (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "559",
              "Discom_Name": "msedcl",
              "Bu_Code": "7412",
              "BU_Name": "  BHOKAR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "560",
              "Discom_Name": "msedcl",
              "Bu_Code": "4750",
              "BU_Name": "  HIMAYATNAGAR S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "561",
              "Discom_Name": "msedcl",
              "Bu_Code": "4797",
              "BU_Name": "  SENGAON SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "562",
              "Discom_Name": "msedcl",
              "Bu_Code": "7439",
              "BU_Name": "  HADGAON (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "563",
              "Discom_Name": "msedcl",
              "Bu_Code": "4792",
              "BU_Name": "  BILOLISUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "564",
              "Discom_Name": "msedcl",
              "Bu_Code": "2488",
              "BU_Name": "  DEGLOOR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "565",
              "Discom_Name": "msedcl",
              "Bu_Code": "4794",
              "BU_Name": "  UMRI SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "566",
              "Discom_Name": "msedcl",
              "Bu_Code": "4793",
              "BU_Name": "  MAHUR SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "567",
              "Discom_Name": "msedcl",
              "Bu_Code": "7421",
              "BU_Name": "  KINWAT (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "568",
              "Discom_Name": "msedcl",
              "Bu_Code": "2470",
              "BU_Name": "  DHARMABAD (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "569",
              "Discom_Name": "msedcl",
              "Bu_Code": "2496",
              "BU_Name": "  MUKHED (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "570",
              "Discom_Name": "msedcl",
              "Bu_Code": "2445",
              "BU_Name": "  NAIGAON (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "571",
              "Discom_Name": "msedcl",
              "Bu_Code": "4724",
              "BU_Name": "  NANDED (U) MIDC SDN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "572",
              "Discom_Name": "msedcl",
              "Bu_Code": "2411",
              "BU_Name": "  NANDED   (U) S/DN-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "573",
              "Discom_Name": "msedcl",
              "Bu_Code": "4445",
              "BU_Name": "  NANDED (U) S/DN-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "574",
              "Discom_Name": "msedcl",
              "Bu_Code": "2429",
              "BU_Name": "  NANDED RURAL-I S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "575",
              "Discom_Name": "msedcl",
              "Bu_Code": "2453",
              "BU_Name": "  LOHA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "576",
              "Discom_Name": "msedcl",
              "Bu_Code": "2461",
              "BU_Name": "  KANDHAR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "577",
              "Discom_Name": "msedcl",
              "Bu_Code": "2437",
              "BU_Name": "  NANDED RURAL II S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "578",
              "Discom_Name": "msedcl",
              "Bu_Code": "4791",
              "BU_Name": "  MUDKHED SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "579",
              "Discom_Name": "msedcl",
              "Bu_Code": "2330",
              "BU_Name": "  GANGAKHED (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "580",
              "Discom_Name": "msedcl",
              "Bu_Code": "4801",
              "BU_Name": "  MANWAT SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "581",
              "Discom_Name": "msedcl",
              "Bu_Code": "2321",
              "BU_Name": "  PARBHANI (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "582",
              "Discom_Name": "msedcl",
              "Bu_Code": "2313",
              "BU_Name": "  PARBHANI (U) S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "583",
              "Discom_Name": "msedcl",
              "Bu_Code": "2372",
              "BU_Name": "  JINTUR (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "584",
              "Discom_Name": "msedcl",
              "Bu_Code": "4800",
              "BU_Name": "  PALAM SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "585",
              "Discom_Name": "msedcl",
              "Bu_Code": "2348",
              "BU_Name": "  PATHRI (R) S-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "586",
              "Discom_Name": "msedcl",
              "Bu_Code": "6734",
              "BU_Name": "  GHODEGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "587",
              "Discom_Name": "msedcl",
              "Bu_Code": "2356",
              "BU_Name": "  SAILU   (R)  S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "588",
              "Discom_Name": "msedcl",
              "Bu_Code": "7323",
              "BU_Name": "  PURNA (R) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "589",
              "Discom_Name": "msedcl",
              "Bu_Code": "4799",
              "BU_Name": "  SONPETH SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "590",
              "Discom_Name": "msedcl",
              "Bu_Code": "5738",
              "BU_Name": "  NEWASA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "591",
              "Discom_Name": "msedcl",
              "Bu_Code": "6718",
              "BU_Name": "  PARNER NGR RSD (I)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "592",
              "Discom_Name": "msedcl",
              "Bu_Code": "5746",
              "BU_Name": "  PATHARDI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "593",
              "Discom_Name": "msedcl",
              "Bu_Code": "6726",
              "BU_Name": "  AHMEDNAGAR (R)-II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "594",
              "Discom_Name": "msedcl",
              "Bu_Code": "5754",
              "BU_Name": "  SHEVGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "595",
              "Discom_Name": "msedcl",
              "Bu_Code": "4204",
              "BU_Name": "  AHMEDNAGAR U-I S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "596",
              "Discom_Name": "msedcl",
              "Bu_Code": "4759",
              "BU_Name": "  BELWANDI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "597",
              "Discom_Name": "msedcl",
              "Bu_Code": "5720",
              "BU_Name": "  KARJAT",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "598",
              "Discom_Name": "msedcl",
              "Bu_Code": "5711",
              "BU_Name": "  JAMKHED",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "599",
              "Discom_Name": "msedcl",
              "Bu_Code": "4200",
              "BU_Name": "  AHMEDNAGAR U-IIS/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "600",
              "Discom_Name": "msedcl",
              "Bu_Code": "5762",
              "BU_Name": "  SHRIGONDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "601",
              "Discom_Name": "msedcl",
              "Bu_Code": "5789",
              "BU_Name": "  AKOLE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "602",
              "Discom_Name": "msedcl",
              "Bu_Code": "6742",
              "BU_Name": "  RAJUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "603",
              "Discom_Name": "msedcl",
              "Bu_Code": "744",
              "BU_Name": "  KOPARGAON (U) S/DIV.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "604",
              "Discom_Name": "msedcl",
              "Bu_Code": "5797",
              "BU_Name": "  SANGAMNER - II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "605",
              "Discom_Name": "msedcl",
              "Bu_Code": "787",
              "BU_Name": "  SANGAMNER (U) S/DIV.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "606",
              "Discom_Name": "msedcl",
              "Bu_Code": "5771",
              "BU_Name": "  RAHATA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "607",
              "Discom_Name": "msedcl",
              "Bu_Code": "795",
              "BU_Name": "  KOPARGAON (R)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "608",
              "Discom_Name": "msedcl",
              "Bu_Code": "4840",
              "BU_Name": "  BABHALESHWAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "609",
              "Discom_Name": "msedcl",
              "Bu_Code": "4842",
              "BU_Name": "  RAHURI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "610",
              "Discom_Name": "msedcl",
              "Bu_Code": "4843",
              "BU_Name": "  BELAPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "611",
              "Discom_Name": "msedcl",
              "Bu_Code": "418",
              "BU_Name": "  KALWAN S/DIV",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "612",
              "Discom_Name": "msedcl",
              "Bu_Code": "4748",
              "BU_Name": "  (U)S/DN.III MALEGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "613",
              "Discom_Name": "msedcl",
              "Bu_Code": "4841",
              "BU_Name": "  RAHURI FACTORY S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "614",
              "Discom_Name": "msedcl",
              "Bu_Code": "434",
              "BU_Name": "  DABHADI (R) SUBDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "615",
              "Discom_Name": "msedcl",
              "Bu_Code": "4839",
              "BU_Name": "  SHRIRAMPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "616",
              "Discom_Name": "msedcl",
              "Bu_Code": "6416",
              "BU_Name": "  DEOLA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "617",
              "Discom_Name": "msedcl",
              "Bu_Code": "485",
              "BU_Name": "  MALEGAON CC(O&M)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "618",
              "Discom_Name": "msedcl",
              "Bu_Code": "426",
              "BU_Name": "  MALEGAON (U) DIV.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "619",
              "Discom_Name": "msedcl",
              "Bu_Code": "6424",
              "BU_Name": "  MALEGAON (RSD)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "620",
              "Discom_Name": "msedcl",
              "Bu_Code": "6459",
              "BU_Name": "  NANDGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "621",
              "Discom_Name": "msedcl",
              "Bu_Code": "5444",
              "BU_Name": "  MANMAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "622",
              "Discom_Name": "msedcl",
              "Bu_Code": "6441",
              "BU_Name": "  YEOLA (U) S/DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "623",
              "Discom_Name": "msedcl",
              "Bu_Code": "5291",
              "BU_Name": "  YEOLA-R",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "624",
              "Discom_Name": "msedcl",
              "Bu_Code": "4265",
              "BU_Name": "  MALEGAON (U) S/DN II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "625",
              "Discom_Name": "msedcl",
              "Bu_Code": "5479",
              "BU_Name": "  SATANA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "626",
              "Discom_Name": "msedcl",
              "Bu_Code": "442",
              "BU_Name": "  LASALGAON (R) S/DIV.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "627",
              "Discom_Name": "msedcl",
              "Bu_Code": "5428",
              "BU_Name": "  NIPHAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "628",
              "Discom_Name": "msedcl",
              "Bu_Code": "5436",
              "BU_Name": "  NAMPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "629",
              "Discom_Name": "msedcl",
              "Bu_Code": "5461",
              "BU_Name": "  CHANDWAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "630",
              "Discom_Name": "msedcl",
              "Bu_Code": "5487",
              "BU_Name": "  PIMPALGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "631",
              "Discom_Name": "msedcl",
              "Bu_Code": "5410",
              "BU_Name": "  DINDORI (R) SUBDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "632",
              "Discom_Name": "msedcl",
              "Bu_Code": "469",
              "BU_Name": "  OZAR (R) SUBDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "633",
              "Discom_Name": "msedcl",
              "Bu_Code": "5452",
              "BU_Name": "  SINNAR-I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "634",
              "Discom_Name": "msedcl",
              "Bu_Code": "5401",
              "BU_Name": "  IGATPURI (R) SUBDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "635",
              "Discom_Name": "msedcl",
              "Bu_Code": "4669",
              "BU_Name": "  CIDCO S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "636",
              "Discom_Name": "msedcl",
              "Bu_Code": "5495",
              "BU_Name": "  PEINTH",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "637",
              "Discom_Name": "msedcl",
              "Bu_Code": "477",
              "BU_Name": "  SINNAR-II (R) SUBDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "638",
              "Discom_Name": "msedcl",
              "Bu_Code": "4829",
              "BU_Name": "  SURGANA SUB-DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "639",
              "Discom_Name": "msedcl",
              "Bu_Code": "4250",
              "BU_Name": "  CITY S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "640",
              "Discom_Name": "msedcl",
              "Bu_Code": "4253",
              "BU_Name": "  SATPUR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "641",
              "Discom_Name": "msedcl",
              "Bu_Code": "493",
              "BU_Name": "  CCO&M (R) SDN NSKRD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "642",
              "Discom_Name": "msedcl",
              "Bu_Code": "4252",
              "BU_Name": "  PANCHAVATI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "643",
              "Discom_Name": "msedcl",
              "Bu_Code": "4670",
              "BU_Name": "  DWARKA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "644",
              "Discom_Name": "msedcl",
              "Bu_Code": "451",
              "BU_Name": "  NASIK (R) SUBDN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "645",
              "Discom_Name": "msedcl",
              "Bu_Code": "4251",
              "BU_Name": "  NASIK RD (U) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "646",
              "Discom_Name": "msedcl",
              "Bu_Code": "4749",
              "BU_Name": "  GANGAPUR N.(U) S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "647",
              "Discom_Name": "msedcl",
              "Bu_Code": "4595",
              "BU_Name": "  AKURDI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "648",
              "Discom_Name": "msedcl",
              "Bu_Code": "4671",
              "BU_Name": "  DEOLALI S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "649",
              "Discom_Name": "msedcl",
              "Bu_Code": "4676",
              "BU_Name": "  ALANDI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "650",
              "Discom_Name": "msedcl",
              "Bu_Code": "4596",
              "BU_Name": "  BHOSARI I SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "651",
              "Discom_Name": "msedcl",
              "Bu_Code": "4310",
              "BU_Name": "  BHOSARI DN. (AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "652",
              "Discom_Name": "msedcl",
              "Bu_Code": "4615",
              "BU_Name": "  BHOSARI II SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "653",
              "Discom_Name": "msedcl",
              "Bu_Code": "4849",
              "BU_Name": "  M/S ICC Reality - I",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "654",
              "Discom_Name": "msedcl",
              "Bu_Code": "4851",
              "BU_Name": "  GANESHKHIND CIRCLE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "655",
              "Discom_Name": "msedcl",
              "Bu_Code": "4858",
              "BU_Name": "  M/s Chitrali Pvt Ltd",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "656",
              "Discom_Name": "msedcl",
              "Bu_Code": "4859",
              "BU_Name": "  M/s Vansum Industries Pune",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "657",
              "Discom_Name": "msedcl",
              "Bu_Code": "4850",
              "BU_Name": "  M/S ICC Reality - II",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "658",
              "Discom_Name": "msedcl",
              "Bu_Code": "4613",
              "BU_Name": "  KOTHRUD SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "659",
              "Discom_Name": "msedcl",
              "Bu_Code": "4611",
              "BU_Name": "  DECCAN GYMAKHANA S/D",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "660",
              "Discom_Name": "msedcl",
              "Bu_Code": "4316",
              "BU_Name": "  KOTHRUD DN. (AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "661",
              "Discom_Name": "msedcl",
              "Bu_Code": "4614",
              "BU_Name": "  WARGE SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "662",
              "Discom_Name": "msedcl",
              "Bu_Code": "4635",
              "BU_Name": "  CHINCHWAD SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "663",
              "Discom_Name": "msedcl",
              "Bu_Code": "4593",
              "BU_Name": "  DAPODI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "664",
              "Discom_Name": "msedcl",
              "Bu_Code": "4594",
              "BU_Name": "  KHERALWADI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "665",
              "Discom_Name": "msedcl",
              "Bu_Code": "4887",
              "BU_Name": "  M/S QUADRON BUSINESS PARK LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "666",
              "Discom_Name": "msedcl",
              "Bu_Code": "4599",
              "BU_Name": "  AUNDH SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "667",
              "Discom_Name": "msedcl",
              "Bu_Code": "3115",
              "BU_Name": "  PIMPRI DN. (AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "668",
              "Discom_Name": "msedcl",
              "Bu_Code": "4636",
              "BU_Name": "  SANGHVI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "669",
              "Discom_Name": "msedcl",
              "Bu_Code": "4600",
              "BU_Name": "  KHADKI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "670",
              "Discom_Name": "msedcl",
              "Bu_Code": "4888",
              "BU_Name": "  M/S BAJAJ AUTO LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "671",
              "Discom_Name": "msedcl",
              "Bu_Code": "3123",
              "BU_Name": "  SHIVAJINAGAR DN.(AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "672",
              "Discom_Name": "msedcl",
              "Bu_Code": "4891",
              "BU_Name": "  M/S VANSUM INDUSTRIES",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "673",
              "Discom_Name": "msedcl",
              "Bu_Code": "4598",
              "BU_Name": "  GANESH KHIND SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "674",
              "Discom_Name": "msedcl",
              "Bu_Code": "4597",
              "BU_Name": "  SHIVAJINAGAR S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "675",
              "Discom_Name": "msedcl",
              "Bu_Code": "4770",
              "BU_Name": "  ALE PHATA S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "676",
              "Discom_Name": "msedcl",
              "Bu_Code": "4714",
              "BU_Name": "  GHODEGAON SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "677",
              "Discom_Name": "msedcl",
              "Bu_Code": "5843",
              "BU_Name": "  JUNNAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "678",
              "Discom_Name": "msedcl",
              "Bu_Code": "5819",
              "BU_Name": "  MANCHAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "679",
              "Discom_Name": "msedcl",
              "Bu_Code": "817",
              "BU_Name": "  HADAPSAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "680",
              "Discom_Name": "msedcl",
              "Bu_Code": "5835",
              "BU_Name": "  NARAYANGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "681",
              "Discom_Name": "msedcl",
              "Bu_Code": "4853",
              "BU_Name": "  PUNE (R) CIRCLE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "682",
              "Discom_Name": "msedcl",
              "Bu_Code": "850",
              "BU_Name": "  MULSHI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "683",
              "Discom_Name": "msedcl",
              "Bu_Code": "868",
              "BU_Name": "  NASARAPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "684",
              "Discom_Name": "msedcl",
              "Bu_Code": "876",
              "BU_Name": "  URALIKANCHAN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "685",
              "Discom_Name": "msedcl",
              "Bu_Code": "4700",
              "BU_Name": "  CHAKAN S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "686",
              "Discom_Name": "msedcl",
              "Bu_Code": "892",
              "BU_Name": "  TALEGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "687",
              "Discom_Name": "msedcl",
              "Bu_Code": "4845",
              "BU_Name": "  M/S LAVASA CORPORATION LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "688",
              "Discom_Name": "msedcl",
              "Bu_Code": "5827",
              "BU_Name": "  RAJGURUNAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "689",
              "Discom_Name": "msedcl",
              "Bu_Code": "4769",
              "BU_Name": "  WADGAON MAVAL S/DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "690",
              "Discom_Name": "msedcl",
              "Bu_Code": "884",
              "BU_Name": "  LONAVALA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "691",
              "Discom_Name": "msedcl",
              "Bu_Code": "4603",
              "BU_Name": "  HADAPSAR SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "692",
              "Discom_Name": "msedcl",
              "Bu_Code": "4745",
              "BU_Name": "  HADAPSAR (I) SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "693",
              "Discom_Name": "msedcl",
              "Bu_Code": "4844",
              "BU_Name": "  M/S CITY CORP.LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "694",
              "Discom_Name": "msedcl",
              "Bu_Code": "3131",
              "BU_Name": "  BAND GARDEN DN. (AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "695",
              "Discom_Name": "msedcl",
              "Bu_Code": "4862",
              "BU_Name": "  M/S EON HADAPSAR INFRA PVT LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "696",
              "Discom_Name": "msedcl",
              "Bu_Code": "4856",
              "BU_Name": "  M/S MAGARPATTA TOWNSHIP LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "697",
              "Discom_Name": "msedcl",
              "Bu_Code": "4601",
              "BU_Name": "  WADIA SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "698",
              "Discom_Name": "msedcl",
              "Bu_Code": "4855",
              "BU_Name": "  MANJRI STUD FIRM Pvt LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "699",
              "Discom_Name": "msedcl",
              "Bu_Code": "4874",
              "BU_Name": "  M/S  TRION PROPERTIES PVT. LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "700",
              "Discom_Name": "msedcl",
              "Bu_Code": "4883",
              "BU_Name": " ZERO G APARTMENTS PVT.LD.(EON WATERFRONT)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "701",
              "Discom_Name": "msedcl",
              "Bu_Code": "3312",
              "BU_Name": "  NAGAR ROAD DIVISION",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "702",
              "Discom_Name": "msedcl",
              "Bu_Code": "4878",
              "BU_Name": "  M/S PANCHSHIL TECH PARK PVT. LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "703",
              "Discom_Name": "msedcl",
              "Bu_Code": "4857",
              "BU_Name": "  M/S VAMONA DEVELOPERS PVT LTD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "704",
              "Discom_Name": "msedcl",
              "Bu_Code": "4863",
              "BU_Name": "  M/S K. RAHEJA CORP.PVT.LTD.(BU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "705",
              "Discom_Name": "msedcl",
              "Bu_Code": "4604",
              "BU_Name": "  NAGAR ROAD SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "706",
              "Discom_Name": "msedcl",
              "Bu_Code": "4637",
              "BU_Name": "  DHANKAWADI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "707",
              "Discom_Name": "msedcl",
              "Bu_Code": "4746",
              "BU_Name": "  WADGAON SHERI SUB-DN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "708",
              "Discom_Name": "msedcl",
              "Bu_Code": "4607",
              "BU_Name": "  FIRE BRIGADE SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "709",
              "Discom_Name": "msedcl",
              "Bu_Code": "4602",
              "BU_Name": "  VISHRANTWADI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "710",
              "Discom_Name": "msedcl",
              "Bu_Code": "4606",
              "BU_Name": "  MARKET YARD SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "711",
              "Discom_Name": "msedcl",
              "Bu_Code": "3140",
              "BU_Name": "  PADMAVATI DN. (AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "712",
              "Discom_Name": "msedcl",
              "Bu_Code": "3311",
              "BU_Name": "  PARVATI DN. AG/CT",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "713",
              "Discom_Name": "msedcl",
              "Bu_Code": "4692",
              "BU_Name": "  MANDAI SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "714",
              "Discom_Name": "msedcl",
              "Bu_Code": "4677",
              "BU_Name": "  WADGAON SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "715",
              "Discom_Name": "msedcl",
              "Bu_Code": "4860",
              "BU_Name": "  M/s Nanded City Co. Ltd.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "716",
              "Discom_Name": "msedcl",
              "Bu_Code": "4605",
              "BU_Name": "  SWARGATE SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "717",
              "Discom_Name": "msedcl",
              "Bu_Code": "4612",
              "BU_Name": "  PESHWE PARK SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "718",
              "Discom_Name": "msedcl",
              "Bu_Code": "4865",
              "BU_Name": "  M/S K. RAHEJA CORP.PVT.LTD.(BU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "719",
              "Discom_Name": "msedcl",
              "Bu_Code": "4864",
              "BU_Name": "  M/S K. RAHEJA CORP.PVT.LTD.(BU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "720",
              "Discom_Name": "msedcl",
              "Bu_Code": "4852",
              "BU_Name": "  RASTAPETH(U) CIRCLE",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "721",
              "Discom_Name": "msedcl",
              "Bu_Code": "4869",
              "BU_Name": "  M/S N.V.REALTY PVT. LTD.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "722",
              "Discom_Name": "msedcl",
              "Bu_Code": "4866",
              "BU_Name": "  M/S K. RAHEJA CORP.PVT.LTD.(BU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "723",
              "Discom_Name": "msedcl",
              "Bu_Code": "4609",
              "BU_Name": "  KASBA SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "724",
              "Discom_Name": "msedcl",
              "Bu_Code": "3158",
              "BU_Name": "  RASTA PETH DN. (AG)",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "725",
              "Discom_Name": "msedcl",
              "Bu_Code": "4610",
              "BU_Name": "  ST. MARRY SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "726",
              "Discom_Name": "msedcl",
              "Bu_Code": "4608",
              "BU_Name": "  RASTA PETH SUB-DN.",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "727",
              "Discom_Name": "msedcl",
              "Bu_Code": "4846",
              "BU_Name": "  M/S Aamby Valley Ltd",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "728",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2421",
              "BU_Name": "TOWN ADILABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "729",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2426",
              "BU_Name": "RURAL ADILABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "730",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2427",
              "BU_Name": "UTNOOR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "731",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2425",
              "BU_Name": "S.KAGAZ NAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "732",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3421",
              "BU_Name": "ASIFABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "733",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2521",
              "BU_Name": "MANUGURU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "734",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2523",
              "BU_Name": "ASWARAOPETA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "735",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1927",
              "BU_Name": "YELLANDU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "736",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2522",
              "BU_Name": "PALVONCHA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "737",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1922",
              "BU_Name": "BHADRACHALAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "738",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1925",
              "BU_Name": "KOTHAGUDEM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "739",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2231",
              "BU_Name": "ERO KORATLA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "740",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2226",
              "BU_Name": "ERO METPALLY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "741",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2225",
              "BU_Name": "ERO JAGITYAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "742",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3022",
              "BU_Name": "RURAL JAGITYAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "743",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3021",
              "BU_Name": "MALLIAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "744",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2722",
              "BU_Name": "BACHANNAPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "745",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2721",
              "BU_Name": "PALAKURTHY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "746",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2128",
              "BU_Name": "GHANPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "747",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2124",
              "BU_Name": "JANGAON",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "748",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2130",
              "BU_Name": "MULUGU",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "749",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2821",
              "BU_Name": "ETURNAGARAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "750",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2134",
              "BU_Name": "BHOOPALPALLY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "751",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2327",
              "BU_Name": "YELLAREDDY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "752",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3221",
              "BU_Name": "RURAL KAMAREDDY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "753",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2324",
              "BU_Name": "KAMAREDDY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "754",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2328",
              "BU_Name": "BANSWADA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "755",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2331",
              "BU_Name": "DOMAKONDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "756",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3222",
              "BU_Name": "BHICHKUNDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "757",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2223",
              "BU_Name": "HUZURABADB",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "758",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2222",
              "BU_Name": "RURAL KARINANGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "759",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2230",
              "BU_Name": "JAMMIKUNTA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "760",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2221",
              "BU_Name": "TOWN KARIMNAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "761",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2233",
              "BU_Name": "GUNDI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "762",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2234",
              "BU_Name": "ALUGUNUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "763",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2232",
              "BU_Name": "TOWN-II KARIMNAGAR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "764",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1924",
              "BU_Name": "RURAL KHAMMAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "765",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1926",
              "BU_Name": "MADHIRA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "766",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1921",
              "BU_Name": "TOWN KHAMMAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "767",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1923",
              "BU_Name": "SATHUPALLY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "768",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1928",
              "BU_Name": "THALLADA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "769",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1931",
              "BU_Name": "KUSUMANCHI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "770",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1932",
              "BU_Name": "WYRA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "771",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1930",
              "BU_Name": "KOTHALINGALA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "772",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "1929",
              "BU_Name": "TOWN-II KHAMMAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "773",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2921",
              "BU_Name": "KORIVI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "774",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2125",
              "BU_Name": "MAHABUBABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "775",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2133",
              "BU_Name": "THORRUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "776",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3523",
              "BU_Name": "BELLAMPALLY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "777",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2423",
              "BU_Name": "MANCHERIAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "778",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3521",
              "BU_Name": "LUXETTIPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "779",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3522",
              "BU_Name": "CHENNUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "780",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2424",
              "BU_Name": "BHAINSA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "781",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3321",
              "BU_Name": "KHANAPUR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "782",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2422",
              "BU_Name": "NIRMAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "783",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2321",
              "BU_Name": "TOWN NIZAMABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "784",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2325",
              "BU_Name": "BHEEMGAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "785",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2322",
              "BU_Name": "BODHAN",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "786",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2329",
              "BU_Name": "MORTHAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "787",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2330",
              "BU_Name": "NANDIPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "788",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2326",
              "BU_Name": "RURAL NIZAMABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "789",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2323",
              "BU_Name": "ARMOOR",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "790",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2333",
              "BU_Name": "NAVIPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "791",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2332",
              "BU_Name": "TOWN-II NIZAMABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "792",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2334",
              "BU_Name": "PERKIT",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "793",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3121",
              "BU_Name": "DHARMARAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "794",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3123",
              "BU_Name": "RAMAGUNDAM",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "795",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2224",
              "BU_Name": "PEDDAPALLY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "796",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2229",
              "BU_Name": "MANTHANI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "797",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "3122",
              "BU_Name": "SULTHANABAD",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "798",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2228",
              "BU_Name": "GODAVARI KHANI",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "799",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2131",
              "BU_Name": "NARSAMPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "800",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2123",
              "BU_Name": "RURAL HANAMKONDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "801",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2132",
              "BU_Name": "WARDHANNAPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "802",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2621",
              "BU_Name": "NEKKONDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "803",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2126",
              "BU_Name": "PARKAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "804",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2136",
              "BU_Name": "KAZIPET",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "805",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2122",
              "BU_Name": "TOWN HANAMKONDA",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "806",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2137",
              "BU_Name": "BHEEMADEVARAPALLY",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "807",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2135",
              "BU_Name": "A J MILLS WARANGAL",
              "Ref_no3": "Enter Consumer No. here"
          },
          {
              "id": "808",
              "Discom_Name": "northern power distribution company limited: warrangal (tsnpdcl)",
              "Bu_Code": "2121",
              "BU_Name": "Warangal",
              "Ref_no3": "Enter Consumer No. here"
          }
      ]
  
  
  }
       this.para1=this.masterbillers['Parameter1']
        this.para2=this.masterbillers['Parameter2']
        this.para3=this.masterbillers['Parameter3']
   }

  
}
