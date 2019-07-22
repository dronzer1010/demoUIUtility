import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient ,HttpEventType} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'
import{LoaderService} from '../../api/loader.service'
import { Router,ActivatedRoute } from '@angular/router';
import {Config} from '../../config'
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from '../../api/billerservice.service'
const path = new Config().getutilityBaseUrl();
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
  apprcrd:boolean=true;
  rejcrd:boolean=false;
  pencrd=false;
  successbill:any=[]
  rejectbill:any=[]
  bulkbilldata=[];
  selectedIndexsuc = -1;
  selectedIndexrej = -1;
downloaddone:boolean=false;
downloadarray:any=[];
successcount:number=0;
rejectcount:number=0;
_bills:any=[];
isSelected = false;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private httpService: HttpClient,private toastr: ToastrService,private loaderService: LoaderService,private route:Router,private router:ActivatedRoute,private excelservice : ExcelService,private billerservice: BillerserviceService) { }

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

  openexpanded(index){
this.selectedIndexsuc=index;
  }

  openexpandedrej(index){
    this.selectedIndexrej=index;
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

    this.reviewfile=true;
    this.billdetails=false;    
    this.conf=false;
    this.success=false;
    this.billertype=false; 
    this.loaderService.display(true);
console.log("File Upload Started")
    if (files.length === 0) {
        return;
      }
   
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
     
      this.httpService.post(path+'api/v1/bill_upload', formData, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            if(event.body['name'])
              this.downloadFileName = event.body['name'];
           // console.log(event.body);
            this.bulkbilldata=event.body['data']
            console.log(this.bulkbilldata)
            this.loaderService.display(false);
            if(this.bulkbilldata){
            for(var i=0;i<this.bulkbilldata.length;i++){
              if(this.bulkbilldata[i].upload_status=='Success'){
                this.successbill.push(this.bulkbilldata[i]);
              }
              console.log(this.bulkbilldata[i]['name'])
            }
            for(var i=0;i<this.bulkbilldata.length;i++){
              if(this.bulkbilldata[i].upload_status=='Reject'){
                this.rejectbill.push(this.bulkbilldata[i]);
              }
            }
            if(this.successbill!=null){
              this.successcount=this.successbill.length;
            }else{
              this.successcount=0
            }

            if(this.rejectbill!=null){
              this.rejectcount=this.rejectbill.length;
            }else{
              this.rejectcount=0
            }
          }
            console.log(this.successbill)
            console.log(this.rejectbill)
            if(this.rejectbill.length==0){
              this.downloaddone=true;
            }else{
              this.downloaddone=false;
            }
            this.loaderService.display(false);
          }
          //this.route.navigate(['/main/dashboard']);
         

         
        },error=>{
          this.loaderService.display(false);
            this.toastr.error("Failed to upload !","Alert",{
                timeOut:8000,
                positionClass:'toast-top-center'
                })
        });
        // this.toastr.success("Bills file has been sent for processing, it will reflect on bill view after processing, !","Alert",{
        //     timeOut:8000,
        //     positionClass:'toast-top-center'
        //     })
   }

   checkAll(checkedState:boolean){
    console.log(checkedState);
    
    if(!checkedState){
      console.log(checkedState);
      this._bills=[];
     
      this.selected=0;
      for(var i=0;i<this.successbill.length;i++){
        this._bills.push(this.successbill[i]);
        this._bills[i]["id"]=i;
      
        this.selected++;
        this.selectall=true;
      }
    }else{
      this._bills=[];
    
      this.selected=0;
    }

    //console.log(this._payments);
    this.isSelected = !checkedState
    console.log(this.isSelected)
  }

  updateBillsList(bill:any , index:number){
    var temp_index=-1;
    console.log(bill.length)
   for(var i=0;i<this._bills.length;i++){
     if(this._bills[i]["id"]==index){
       temp_index=i;
      
     }
   }
 

   if(temp_index>-1){
    
    this.selected--;
    this._bills.splice(temp_index , 1);
    //console.log(this.totalpayments+" "+this.successpaymentData.length)
    if(this.selected<this.successbill.length){
      this.selectall=false
      //console.log(this.selectall)
    }else{
      this.selectall=true;
      //console.log(this.selectall)
    }
   }else{
    bill["id"] = index;
    this._bills.push(bill);
   // console.log(this._payments);
   
    this.selected++;
    //console.log(this.totalpayments+" "+this.successpaymentData.length)
    if(this.selected<this.successbill.length){
      this.selectall=false
      //console.log(this.selectall)
    }else{
      this.selectall=true;
      //console.log(this.selectall)
    }
      
    
   
   }
   
   //console.log(this._payments);
  }

   submitdata(){
     
     console.log(this._bills)
     console.log(JSON.stringify(this._bills))
     if(this.downloaddone==true){
      this.loaderService.display(true)
       this.billerservice.submitbulkbill(this._bills).then(resp=>{
         console.log(resp)
         this.loaderService.display(false)
         this.route.navigate(['/main/successmsg'],{queryParams:{msg:'billsuccess'}});
       },error=>{
        this.loaderService.display(false)
         console.log(error)
         this.toastr.error("Failed to submit !","Alert",{
          timeOut:8000,
          positionClass:'toast-top-center'
          })
       })
      
     }
   
    else{
      this.toastr.warning("Please Download the Rejection List first !","Alert",{
        timeOut:8000,
        positionClass:'toast-top-center'
        })
    }
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

  apprcard(){
   
    this.apprcrd=true;
    this.pencrd=false;

  }

  pencard(){
    
    this.apprcrd=false;
    this.pencrd=true;

  }

  downloadreport(){
    this.downloaddone=true;
    for(let data of this.rejectbill){
      var obj={
        Biller:data['name'],
        Consumer_No:data['consumer_no'],
        Biller_id:data['biller_id'],
        Short_Name:data['short_name'],
        GL_Expense_Code:data['gl_expense_code'],
        Bill_Date:data['bill_date'],
        Due_Date:data['due_date'],
        State:data['state'],
        Reference_no_1:data['bucode_buname'],
        Reference_no_2:data['circle'],
        Contact:data['contact_no'],
          Bill_Address:data['biller_address'],
          Email:data['email'],
          Rejection_Reason:data['reject_reason']
      }
      this.downloadarray.push(obj)
    }
    this.excelservice.exportAsExcelFile( this.downloadarray, 'Reject Bill List');
  }
   private loadmasterbiller(){
     this.masterbillers={
      "Parameter1": [
          {
              "Id": "1",
              "Discom_Name": "Ajmer Vidyut (AVVNL)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "2",
              "Discom_Name": "Andhra Pradesh Eastern Power Distribution Company Limited (APEPDCL)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "3",
              "Discom_Name": "Assam Power (APDCL)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "4",
              "Discom_Name": "Bangalore Electricity  (BESCOM)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "5",
              "Discom_Name": "BEST, Mumbai",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "6",
              "Discom_Name": "Bharatpur Electricity (BESL)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "7",
              "Discom_Name": "Bikaner Electricity Supply",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "8",
              "Discom_Name": "BSES Rajdhani",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "9",
              "Discom_Name": "BSES Yamuna",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "10",
              "Discom_Name": "Calcutta Electric Supply (CESC)",
              "Ref_no": "Enter Consumer Account No. here"
          },
          {
              "Id": "11",
              "Discom_Name": "CESU, Odisha",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "12",
              "Discom_Name": "Chamundeshwari Electricity (CESC,Mysore)",
              "Ref_no": "Enter Consumer ID here"
          },
         
          {
              "Id": "14",
              "Discom_Name": "Chhattisgarh State Power (CSPDCL)",
              "Ref_no": "Enter BP No. here"
          },
          {
              "Id": "15",
              "Discom_Name": "Co-Operative Electric (CESS Ltd),Sircilla",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "16",
              "Discom_Name": "Dakshin Gujarat Vij",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "17",
              "Discom_Name": "Dakshin Haryana Bijli  (DHBVN)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "18",
              "Discom_Name": "Daman and Diu Electricity",
              "Ref_no": "Enter Consumer ID here"
          },
          
         
          {
              "Id": "21",
              "Discom_Name": "Department of Power (Nagaland)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "22",
              "Discom_Name": "DNH Power",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "23",
              "Discom_Name": "Goa Electricity",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "24",
              "Discom_Name": "Gulbarga Electricity  (GESCOM)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "25",
              "Discom_Name": "Himachal Pradesh(HPSEBL)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "26",
              "Discom_Name": "Hubli Electricity  (HESCOM)",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "27",
              "Discom_Name": "India Power Corp (Asansol)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "28",
              "Discom_Name": "Jodhpur Vidyut Vitaran (JDVVNL)",
              "Ref_no": "Enter IVRS No. here"
          },
          {
              "Id": "29",
              "Discom_Name": "mangalore electricity supply company ltd. (mescom)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "30",
              "Discom_Name": "Kanpur Electricity Supply",
              "Ref_no": "Enter Meter Serial No. here"
          },
          {
              "Id": "31",
              "Discom_Name": "Kerala State Electricity(KSEB)",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "32",
              "Discom_Name": "Kota Electricity Distribution (KRDL)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "33",
              "Discom_Name": "Madhya Gujarat Vij",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "34",
              "Discom_Name": "Madhya Pradesh Paschim Kshetra ",
              "Ref_no": "Enter Connection ID here"
          },
          {
              "Id": "35",
              "Discom_Name": "Mangalore Electricity  (MESCOM)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "36",
              "Discom_Name": "Manipur State Power(MSPDCL)",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "37",
              "Discom_Name": "Meghalaya Power",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "38",
              "Discom_Name": "NESCO, Odisha",
              "Ref_no": "Enter Connection ID here"
          },
          {
              "Id": "39",
              "Discom_Name": "New Delhi Muncipal (NDMC)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "40",
              "Discom_Name": "Noida Power Company Ltd (NPCL)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "41",
              "Discom_Name": "North Bihar Power",
              "Ref_no": "Enter Consumer No. here"
          },
       
       
          
          {
              "Id": "50",
              "Discom_Name": "Paschim Gujarat Vij",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "51",
              "Discom_Name": "Punjab State Power (PSPCL)",
              "Ref_no": " Enter Service Number here"
          },
          {
              "Id": "52",
              "Discom_Name": "Sikkim Power",
              "Ref_no": " Enter Service Number here"
          },
          {
              "Id": "53",
              "Discom_Name": "SNDL Nagpur",
              "Ref_no": " Enter Service Number here"
          },
          {
              "Id": "54",
              "Discom_Name": "South Bihar Power",
              "Ref_no": "Enter K No. here"
          },
          {
              "Id": "55",
              "Discom_Name": "SOUTHCO, Odhisha",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "56",
              "Discom_Name": "Southern Power Distribution",
              "Ref_no": "Enter Unique Service No. here"
          },
          {
              "Id": "57",
              "Discom_Name": "Tata Power Delhi",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "58",
              "Discom_Name": "Tata Power Mumbai",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "59",
              "Discom_Name": "Telangana State Southern Power (TSSPDCL)",
              "Ref_no": "Enter Service Connection No. here"
          },
          {
              "Id": "60",
              "Discom_Name": "TP Ajmer Distribution (TPADL)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "61",
              "Discom_Name": "Uttar Gujarat Vij",
              "Ref_no": "Enter Consumer ID here"
          },
          {
              "Id": "62",
              "Discom_Name": "Uttar Haryana Bijli (UHBVN)",
              "Ref_no": "Enter Consumer No. here"
          },
          {
              "Id": "63",
              "Discom_Name": "Uttarakhand Power Corp. (UPCL)",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "64",
              "Discom_Name": "WESCO, Odisha",
              "Ref_no": "Enter Account Number here"
          },
          {
              "Id": "65",
              "Discom_Name": "West Bengal State Electricity (WBSEDCL)",
              "Ref_no": "Enter Account Number here"
          }
      ],
    
      "Parameter2": [
          {
              "id": "1",
              "Discom_Name": "Maharadhtra State Electricity (MSEDCL)"
            
          },
          {
              "id": "2",
              "Discom_Name": "MP Madhya Kshetra - Bhopal"
             
          },
          {
              "id": "3",
              "Discom_Name": "MP Poorv Kshetra - Jabalpur"
             
          },
         
          {
              "id": "5",
              "Discom_Name": "Tamil Nadu (TNEB)"
           
          },
       
          {
              "id": "7",
              "Discom_Name": "Torrent Power"
             
          },
          {
              "id": "8",
              "Discom_Name": "Uttar Pradesh Power (UPPCL) - Urban"
        
          },
          {
              "id": "9",
              "Discom_Name": "Uttar Pradesh Power (UPPCL) -Rural"
            
          },
          {
              "id": "10",
              "Discom_Name": "Uttar Pradesh Power Corporation Ltd ( UPPCL)"
            
          },
          {
              "id": "11",
              "Discom_Name": "Jamshedpur Utilities (JUSCO)"
            
          },
          {
              "id": "12",
              "Discom_Name": "Jaipur Vidyut Vitaran (JVVNL)"
            
          },
          {
              "id": "13",
              "Discom_Name": "Jharkhand Bijli Vitran Nigam"
            
          }
      ],
    
      "Parameter3": [
          {
              "id": "1",
              "Discom_Name": "Northern Power Dist, Telangana (TSNPDCL)",
        
          }
          
      ]
  
  
  }
       this.para1=this.masterbillers['Parameter1']
        this.para2=this.masterbillers['Parameter2']
        this.para3=this.masterbillers['Parameter3']
   }

  
}
