import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import {ExcelService} from '../../excelservice/excel.service'
import { DatePipe } from '@angular/common'
import {Config} from '../../config'
import {AuthService} from '../../api/auth.service';
import{LoaderService} from '../../api/loader.service'
import {RmservicesService} from '../../api/rmservices.service'
const path = new Config().getutilityBaseUrl();
@Component({
  selector: 'app-rmfetchreport',
  templateUrl: './rmfetchreport.component.html',
  styleUrls: ['./rmfetchreport.component.css']
})
export class RmfetchreportComponent implements OnInit {
  public files: Set<File> = new Set()
  select=false;
  billertype:boolean=false;
  billdetails:boolean=true;
  conf:boolean=false;
  currenCard :number=-1;
  success:boolean=false;
  reviewCard:boolean=false;
  cardHolder:string=""
  cardNumber:string="";
  cardExpiry:string="";
  cardinitiatedby:string="";
  cardinitiatedon:string="";
  cardapprovedby:string="";
  cardapprovedon:string="";
  selectedcard:any={}
  public checkedValueArray: any = [];
  public additionaldetails: any = [];
  selectall:boolean=false;
  public temp: any;
  public cntChk: number=0;
  public searchText : string;
  public flag: any;
  display='none'; 
  displayprompt:string='none';
  states:any;
  paymentData : any={};
  billers:any;
  billerlist:any=[];
  bills :any = [];
  payments:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  filename:string;
  sortOrder = "asc";
  activeElement :number;
  amountpay: number=0;
  totalamount: any=0;
  late_pay_charges:any;
  meter_reading:any;
  promt_pay_incentives:any;
  remarks:any;
  attachment_url:any;
  payment_id:any;
  cardid:any;
  public currentCard: any=0;
  pendingPayments:any=[]
  approvedcard:any=[]
  cardData:any=[];
  paymentdata:any={}
  downloadArray:any=[];
  downloadArray1:any=[];
  filteredbills:any=[];
  date:Date;
  currentdate:Date;
  duedatepassd:any=[];
  userdata:any=[];
  public progress: number;
  public message: string;
  public downloadFileName:string;
  fileUpload:File;
  holidays:any=[];
  apprcrd:boolean=true;
  rejcrd:boolean=false;
  pencrd=false;
  validbillsforpay:any=[];
  invalidbillsforpay:any=[];
  validbillamount:number=0;
  invalidbillamount:number=0;
  organisationlist:any=[];
orglist:any=[];
organisationid:any=[];
filterorgid:any=[];
dropdownSettings3 = {};
inorganisationlist:any=[];
inorglist:any=[];
inorganisationid:any=[];
infilterorgid:any=[];
indropdownSettings3 = {};
selectedItems3 = [];
selectedItems4 = [];
  constructor(private loader: LoaderService,public datepipe: DatePipe,private excelservice : ExcelService,private toaster:ToastrService,private rmservice:RmservicesService) { }

  ngOnInit() {
    this.getAllOrg();
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'OrgId',
      textField: 'CompanyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll:true
    };
    this.indropdownSettings3 = {
      singleSelection: false,
      idField: 'OrgId',
      textField: 'CompanyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll:true
    };
  }
  apprcard(){
   
    this.apprcrd=true;
    this.pencrd=false;

  }

  pencard(){
    
    this.apprcrd=false;
    this.pencrd=true;

  }
  private getAllOrg(){
    this.rmservice.getAllOrganizations().then(resp => {
      this.organisationlist = resp.data;
      console.log(this.organisationlist);
      for(var data of this.organisationlist){
        var obj={
          OrgId:data['OrgId'],
          CompanyName:data['CompanyName']
        }
        this.orglist.push(obj)
      }
      for(var data of this.organisationlist){
        var obj1={
          OrgId:data['OrgId']
        
        }
        this.organisationid.push(obj1)
      }
      this.getValidBillers();
      console.log(this.organisationid)
     
    });
    console.log(this.orglist)
  }

  private getValidBillers(){
    this.selectedItems3=[]
    this.validbillamount=0
    this.loader.display(true);
    console.log(this.organisationid)
    this.filterorgid = this.organisationid.map(function(val) {
      return val.OrgId;
    })
    console.log(this.filterorgid)
    var payparams={
      "org_ids":this.filterorgid,
     
    }
    this.rmservice.getValidFetchBills(payparams).then(resp=>{
      console.log(resp)
      this.validbillsforpay=resp
      if(this.validbillsforpay!=null){
        for(var total of this.validbillsforpay){
          this.validbillamount+=parseFloat(total['amount'])
        }
      }
      this.loader.display(false);
    },error=>{
      console.log(error)
      this.loader.display(false);
      if(error['error']['msg']=='Payment not found'){
        this.paymentData=[];
        this.toaster.error("Payment not found for these organisations!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    })
  }

  getfilterdata(){
    this.loader.display(true);
  this.validbillsforpay=[];
  this.validbillamount=0


    var payparams={
      "org_ids":this.filterorgid
    
    }
    this.rmservice.getValidFetchBills(payparams).then(resp=>{
     
      console.log(resp)
      this.validbillsforpay=resp
      if(this.validbillsforpay!=null){
        for(var total of this.validbillsforpay){
          this.validbillamount+=parseFloat(total['amount'])
        }
      }
      this.loader.display(false);
    },error=>{
      console.log(error)
      this.loader.display(false);
      if(error['error']['msg']=='Payment not found'){
        this.paymentData=[];
        this.toaster.error("Payment not found for your filtered criteria!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    })
  }

  // getValidBillers(){
  //   this.loader.display(true)
  //   this.billertype=false;
  //   this.billdetails=true;
  //   this.reviewCard=false;
  //   this.currentdate= new Date((new Date()).getTime() + 24*60*60*1000);
  //   // this.billservice.getvalidbillsforpay().then(resp=>{
  //   //   console.log(resp)
  //   //   if(resp!=null){
  //   //     this.validbillsforpay=resp;
  //   //     for(var i=0;i<this.validbillsforpay.length;i++){
  //   //       if(this.validbillsforpay[i]['amount']!=null)
  //   //       this.validbillamount+=parseInt(this.validbillsforpay[i]['amount'])
  //   //     }

  //   //     this.loader.display(false)
  //   //   }
  //   // },error=>{
  //   //   console.log(error)
     
  //   // })
  // }

  onSelectAllOrg(org:any){
   
    console.log(org)
    this.filterorgid = org.map(function(val) {
      return val.OrgId;
    })
    console.log(this.filterorgid)
  }

  onSelectAllInOrg(org:any){
   
    console.log(org)
    this.infilterorgid = org.map(function(val) {
      return val.OrgId;
    })
    console.log(this.infilterorgid)
  }

  onOrgSelect(org:any){

  
    console.log(this.selectedItems3)
        this.filterorgid = this.selectedItems3.map(function(val) {
          return val.OrgId;
        })
    
      
        console.log(this.filterorgid)
      }

      onOrgSelectIn(org:any){

  
        console.log(this.selectedItems4)
            this.infilterorgid = this.selectedItems4.map(function(val) {
              return val.OrgId;
            })
        
          
            console.log(this.infilterorgid)
          }
    
          onItemDeSelect(org:any){
            this.filterorgid.pop(org)
            console.log(this.filterorgid)
          }

          onItemDeinSelect(org:any){
            this.infilterorgid.pop(org)
            console.log(this.infilterorgid)
          }
      getInValidBillers(){
        this.selectedItems4=[]
        this.loader.display(true);
        console.log(this.organisationid)
        this.infilterorgid = this.organisationid.map(function(val) {
          return val.OrgId;
        })
        console.log(this.infilterorgid)
        var payparams={
          "org_ids":this.infilterorgid,
         
        }
        this.rmservice.getinValidFetchBills(payparams).then(resp=>{
          console.log(resp)
          this.invalidbillsforpay=resp
          // if(this.invalidbillsforpay!=null){
          //   for(var total of this.invalidbillsforpay){
          //     this.invalidbillamount+=parseFloat(total['amount'])
          //   }
          // }
          this.loader.display(false);
        },error=>{
          console.log(error)
          this.loader.display(false);
          if(error['error']['msg']=='Payment not found'){
            this.paymentData=[];
            this.toaster.error("Payment not found for these organisations!",'Alert',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }
        })
      }

      getInfilterdata(){
        this.loader.display(true);
      this.invalidbillsforpay=[];
      this.invalidbillamount=0
    
    
        var payparams={
          "org_ids":this.infilterorgid
        
        }
        this.rmservice.getinValidFetchBills(payparams).then(resp=>{
         
          console.log(resp)
          this.invalidbillsforpay=resp
          // if(this.invalidbillsforpay!=null){
          //   for(var total of this.invalidbillsforpay){
          //     this.invalidbillamount+=parseFloat(total['amount'])
          //   }
          // }
          this.loader.display(false);
        },error=>{
          console.log(error)
          this.loader.display(false);
          if(error['error']['msg']=='Payment not found'){
            this.paymentData=[];
            this.toaster.error("Payment not found for your filtered criteria!",'Alert',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }
        })
      }


    onItemSelectDown(){
      this.downloadArray=[];
      
        for(let data of this.validbillsforpay){
          var obj={
            Organisation:data['organization_name'],
            Biller:data['biller_name'],
            Amount:data['amount'],
            Consumer_No:data['consumer_no'],
           
            Status:data['transaction_status'],
            Payment_Status:data['payment_status'],
            Short_Name:data['short_name'],
            GL_Expense_Code:data['gl_expense_code'],
          
            State:data['state'],
            Bill_Number:String(data['fetch_bill_no']),
            Card_Number:data['card_last_digits'],
            Order_Id:data['order_id'],
            Contact:data['contact_no'],
            Bill_Address:data['contact_address'],
            Email:data['email'],
           
            Initiated_by:data['initiated_by'],
            Initiated_On:data['initiated_date'],
         Due_date:data['fetch_due_date'],
         Bill_date:data['fetch_bill_date'],
        
    
          }
          this.downloadArray.push(obj)
        }
        this.excelservice.exportAsExcelFile( this.downloadArray, 'Payable Bills list List');
      
    }
  
  
    onItemSelectDowninvalid(){
      this.downloadArray1=[];
      
      for(let data of this.invalidbillsforpay){
        var obj={
          Organisation:data['organization_name'],
          Biller:data['biller_name'],
          Amount:data['amount'],
          Consumer_No:data['consumer_no'],
         
          Status:data['transaction_status'],
          Payment_Status:data['payment_status'],
          Short_Name:data['short_name'],
          GL_Expense_Code:data['gl_expense_code'],
        
          State:data['state'],
          Bill_Number:String(data['fetch_bill_no']),
          Card_Number:data['card_last_digits'],
          Order_Id:data['order_id'],
          Contact:data['contact_no'],
          Bill_Address:data['contact_address'],
          Email:data['email'],
         
          Initiated_by:data['initiated_by'],
          Initiated_On:data['initiated_date'],
       Due_date:data['fetch_due_date'],
       Bill_date:data['fetch_bill_date'],
          Comment:data['front_end_error']
  
        }
        this.downloadArray1.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray1, 'Non Payable Bills List');
    
  }

}
