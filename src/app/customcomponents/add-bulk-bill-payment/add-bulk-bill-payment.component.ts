import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{LoaderService} from '../../api/loader.service';
import { ExcelService } from '../../excelservice/excel.service'
import { ToastrService } from 'ngx-toastr'
import{CardserviceService} from '../../api/cardservice.service'
import { AuthService } from '../../api/auth.service';
import {PaymentserviceService} from '../../api/paymentservice.service'
@Component({
  selector: 'app-add-bulk-bill-payment',
  templateUrl: './add-bulk-bill-payment.component.html',
  styleUrls: ['./add-bulk-bill-payment.component.css']
})
export class AddBulkBillPaymentComponent implements OnInit {
  tabShow:boolean=true;
  unSuccessTabShow:boolean=false;
  tabSuccessColor:String="paycard shad";
  tabUnsucessColor:String="paycard shad_unsuccess";
  totaSuccessAmount:number=0;
  totaUnSuccessAmount:number=0;
  totalamount:number=0;
  totalpayments:number=0;
  fileUpload:File;
  filename:string="Click to Browse"
  selectedFiles: FileList;
  model: any = {};
  cardData:any=[];
  successpaymentData: any = [];
  uncuccespaymentData: any = [];
  invalipaycount:number;
  validpaycount:number;
  approverlist:any[];
  settings = {};
  _payments:any[]=[];
  isSelected = false;
  step2:number=0;
  optionsModel: number[];
  cardHolder:string="Nick Name"
  cardNumber:string="XXXXXXXXXXXXXXXX";
  cardExpiry:string="MM/YYYY";
  cardId:number;
  rowsOnPage = 2000;
  sortBy = "email";
  sortOrder = "asc";
  currenCard :number=-1;
  sum:number=0;
  downloadList:boolean=false;
  downloadArray:any=[];
  activeElement :number;
  selectall:boolean=false;
  approvedcards:any=[];
  fullCardNumber:string="";
  constructor(private loaderService: LoaderService,private router:Router,private cardservice: CardserviceService, private excelService : ExcelService,private toastr: ToastrService,private auth: AuthService,private payservice:PaymentserviceService,) { }

  ngOnInit() {
    this.loadApprovedCards()
  }

  private loadApprovedCards(){

    this.currenCard=-1;
   this.cardservice.getAll().subscribe(data=>{
      console.log(data["data"])
     this.cardData=data["data"]
      
    //   for(let i = 0; i < this.cardData.length; i++){
    //     if(this.cardData[i].status == 1){
    //         this.approvedcards.push(this.cardData[i]);
    //     }
    // }
  
    if(this.cardData!=null){
      this.approvedcards=this.cardData.filter((card)=>{
        return (card['status']=='Approved')
      })
    }
   
  
    console.log(this.approvedcards)
  
      if(this.currenCard ==-1){
        this.activeElement=this.approvedcards[0]["id"]
        this.cardById(this.approvedcards[0]["id"]);
      }
    },error=>{
      console.log(error)
    })
  }

  cardById(id:number){
     for(var data of this.approvedcards){
       if(data['id']==id){
         this.cardNumber=data['digits']
       this.cardHolder=data['cardholder']
       this.cardExpiry=data['expirymonth']+'/'+data['expiryyear']
       this.cardId=data['id']
       this.fullCardNumber=data['fullcardnumber']
       }
     }
   
       // this.cardNumber=data['data'][0]['digits']
       // this.cardHolder=data['data'][0]['cardholder']
       // this.cardExpiry=data['data'][0]['expirydate']
       // this.cardId=data['data'][0]['id']
       console.log(this.cardNumber+" "+this.cardHolder+" "+this.cardExpiry+" "+this.cardId)
       this.activeElement = id;
     // },error=>{
     //   console.log(error)
     // })
   }


   UploadFile(event){
   this.loaderService.display(true);
    this.selectedFiles = event.target.files;
    this.filename = this.selectedFiles[0].name;
    console.log('selectedFiles: ' + event.target.files[0] );
    this.payservice.uploadpayment(this.selectedFiles[0]).subscribe(
      
      data=>{
         this.step2=1;
       console.log(data)
        this.successpaymentData=data['data']['successbillpaymentdata'];
        this.uncuccespaymentData=data['data']['rejectedbillpaymentdata']
        this.invalipaycount=data['data']['rejectbillpaymentcount']
        this.validpaycount=data['data']['successbillpaymentcount']
        this.loaderService.display(false);
        for( let data of this.successpaymentData){
         // console.log(data['amount'])
          this.totaSuccessAmount +=parseFloat(data['amount']);
        }
       // console.log(this.totaSuccessAmount)
        for( let data of this.uncuccespaymentData){
          // console.log(data['amount'])
           this.totaUnSuccessAmount +=parseFloat(data['amount']);
         }
         console.log(this.totaUnSuccessAmount)
   
      },error=>{
        this.step2=0;
        console.log("Failed to Upload")
      }
    )
  }

  showSuccessTab(){
    this.tabShow=true;
    this.unSuccessTabShow=false;
    this.tabSuccessColor='paycard shad';
    this.tabUnsucessColor="paycard shad_unsuccess";
  }

  showUnsuccessTab(){
    this.tabShow=false;
    this.unSuccessTabShow=true;
    this.tabUnsucessColor="paycard shad";
    this.tabSuccessColor='paycard shad_unsuccess';
  }

  checkAll(checkedState:boolean){
    console.log(checkedState);
    
    if(!checkedState){
      console.log(checkedState);
      this._payments=[];
      this.totalamount=0;
      this.totalpayments=0;
      for(var i=0;i<this.successpaymentData.length;i++){
        this._payments.push(this.successpaymentData[i]);
        this._payments[i]["_id"]=i;
        this.totalamount+=parseFloat( this._payments[i]["amount"]);
        this.totalpayments++;
        this.selectall=true;
      }
    }else{
      this._payments=[];
      this.totalamount=0;
      this.totalpayments=0;
    }

    //console.log(this._payments);
    this.isSelected = !checkedState
    console.log(this.isSelected)
  }


  updatePaymentList(paybulk:any , index:number){
    var temp_index=-1;
    console.log(paybulk.length)
   for(var i=0;i<this._payments.length;i++){
     if(this._payments[i]["_id"]==index){
       temp_index=i;
      
     }
   }
 

   if(temp_index>-1){
    this.totalamount-=parseFloat(this._payments[temp_index]['amount']);
    this.totalpayments--;
    this._payments.splice(temp_index , 1);
    //console.log(this.totalpayments+" "+this.successpaymentData.length)
    if(this.totalpayments<this.successpaymentData.length){
      this.selectall=false
      //console.log(this.selectall)
    }else{
      this.selectall=true;
      //console.log(this.selectall)
    }
   }else{
    paybulk["_id"] = index;
    this._payments.push(paybulk);
   // console.log(this._payments);
    this.totalamount+=parseFloat(paybulk['amount']);
    this.totalpayments++;
    //console.log(this.totalpayments+" "+this.successpaymentData.length)
    if(this.totalpayments<this.successpaymentData.length){
      this.selectall=false
      //console.log(this.selectall)
    }else{
      this.selectall=true;
      //console.log(this.selectall)
    }
      
    
    console.log(this.totalamount)
   }
   
   //console.log(this._payments);
  }


  nextstep(){
    if(this.uncuccespaymentData.length>0){
    if(this.downloadList){
     this.step2=2
    }
    else{
      this.toastr.warning("Please Download the Rejected Payment List first!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }else{
    this.step2=2
  }

  }


  exportAsXLSX():void {
    this.downloadList=true;
    //console.log(this.uncuccespaymentData)
    //this.excelService.exportAsExcelFile( this.uncuccespaymentData, 'Rejected Suppliers');
   // console.log(this.uncuccesssupplierData);
    if(this.uncuccespaymentData.length>=0){
    for(let data of this.uncuccespaymentData){
      var obj={
          ConsumerNo:data['consumerno'],
          BillerName:data['billername'],
          Bank_Account_Number:data['vaccno'],
          BillDate:data['bill_date'],
          Duedate:data['due_date'],
          BillNumber:data['billnumber'],
          Amount:data['amount'],
          RejectionReason:data['rejpayreason']
      }
      this.downloadArray.push(obj)
    }
    this.excelService.exportAsExcelFile( this.downloadArray, 'Rejected Payments');
    this.downloadArray=[];
  }else{
    this.toastr.warning("No Data Available","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  }

  submitBulk(cardId:number,cardno:string){
    
    var paymentData = this._payments.map(payment => {
      payment['cardno'] =cardId;
      payment['ccno']=cardno;
      return payment;
    })
   // this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentnewsuccess'}});
   console.log("This is paymentdata******")
   console.log(paymentData)
    if(paymentData.length>0){
      this.loaderService.display(true);
    this.payservice.regBulkPayment(paymentData).subscribe(data=>{
    //  console.log(data)
    if(data['Msg']=='bulk bill payment save successfully.'){
      this.loaderService.display(false);
      this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentnewsuccess'}});
    }else{
      this.loaderService.display(false);
      this.toastr.warning("Something Went Wrong!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
      
    
    },error=>{
      this.loaderService.display(false);
      console.log(error)
    })
  
  }else{
    this.toastr.warning("Please Select Payments to Send for Approval!",'Alert',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  }




}
