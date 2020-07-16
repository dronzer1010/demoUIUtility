import { Component, OnInit } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {ExcelService} from '../../excelservice/excel.service'
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import { DatePipe } from '@angular/common'
import { Http, ResponseContentType , Headers,RequestOptions} from '@angular/http';
import { AuthService } from '../../api/auth.service';
import {Config} from '../../config'
const path = new Config().getutilityBaseUrl();
import {saveAs as importedSaveAs} from "file-saver";
import {Observable} from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-biller',
  templateUrl: './view-biller.component.html',
  styleUrls: ['./view-biller.component.css']
})
export class ViewBillerComponent implements OnInit {
  display='none'; 
  billdata:any=[];
  billerdata:any={};
  billerlength:number=0;
  noofrole="No bills available"
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  dropdownList = [];
  dropdownCat = [];
  dropdownDownload = [];
  dropdownStatus = [];
  selectedItems = [];
  selectedItems1 = [];
  selectedItems2 = [];
  selectedStatus = [];
  dropdownSettings = {};
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  dropdownSettingsStatus = {};
  key: string = 'status'; //set default
  reverse: boolean = false;
rolename:any;
settings = {
  bigBanner: true,
  timePicker: false,
  format: 'dd-MM-yyyy',
  defaultOpen: false
}
todate:Date = new Date();
fromdate:Date = new Date();
public searchText : string;
downloadArray:any=[];
approveRejBiller:any=[];
userdata:any={};
approverdetails:any=[];
selectedIndex = -1;
billername:boolean=false;
consumerno:boolean=false;
duedate:boolean=false;
billdate:boolean=false;
glexpensecode:boolean=false;
shortname:boolean=false;
email:boolean=false;
contactno:boolean=false;
contactaddress:boolean=false;
utilityname:boolean=false;
status:boolean=false;
location:boolean=false;
initiatedby:boolean=false;
initiatedon:boolean=false;
filterfromdate:any;
  filtertodate:any
  selectallpara:boolean=false;
  token : string;
  deletemodal:string='none';
  editmodal:string='none';
  deleteid:any;
  filterstatus:any="0";
filterinterval:any="0";
filtercategory:any="6f6af57a-5c48-442e-b5b8-8b3559b10cd9";
organisation_id:any;
id:string;
consumer_no:string;
gl_expense_code:string;
b_email:string;
b_contact:string;
b_addresss:string;
edit_id:string;
filter:any;
  constructor(private excelservice : ExcelService,private billservice:BillerserviceService,private userservice:UserserviceService,private loaderService: LoaderService,public datepipe: DatePipe,private authService : AuthService, private http: Http,private toaster:ToastrService,private auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.getUserDetail();
    this.loadbills()
    this.filterfromdate=this.fromdate
    this.filtertodate=this.todate;
//this.rolename=localStorage.getItem('rolename')
   // this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    // if(this.rolename=='maker' || this.rolename=='ccmaker' || this.rolename=='as'){
    //   this.approveRejBiller=this.billdata.filter((biller)=>{
    //     return (biller.status == "Registered" || biller.status == "Rejected"  || biller.status == "Pending")
    //   })
    // }else if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
    //   this.approveRejBiller=this.billdata.filter((biller)=>{
    //     return (biller.status == "Registered" || biller.status == "Rejected")
    //   })
    // }
   
    //console.log(this.billdata)
   

    this.dropdownList = [
      { item_id: 0, item_text: 'All' },
      { item_id: 1, item_text: 'Today' },
      { item_id: 2, item_text: 'This Week' },
      { item_id: 3, item_text: 'This Month' },
      { item_id: 4, item_text: 'This Year' }
    ];
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };
    this.dropdownCat = [
      { item_id: "6f6af57a-5c48-442e-b5b8-8b3559b10cd9", item_text: 'Electricity' }
    ];
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };
    this.dropdownDownload = [
      { item_id: 1, item_text: 'Standard List' }
      // { item_id: 2, item_text: 'Customise List' }
    ];
   
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.dropdownStatus = [
      { item_id: 1, item_text: 'All' },
      { item_id: 2, item_text: 'Registered' },
      { item_id: 3, item_text: 'Rejected' },
      { item_id: 4, item_text: 'Pending' }
    ];

    this.dropdownSettingsStatus = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };

  }

  onItemSelectDown(items:any){
    this.downloadArray=[]
    console.log(items);
    if(items['item_id']==2){
      this.display='block';
    }else if(items['item_id']==1){
      for(let data of this.billdata){
        var obj={
          State:data['location'],
          Biller:data['name'],
          Consumer_No:data['consumerno'],
          Status:data['status'],
          GL_Expense_Code:data['glexpensecode'],
          Reference_no_1:data['bucode'],
          Reference_no_2:data['circle'],
          Contact:data['contact'],
          Email:data['email'],
          AccontNumber:data['accno'],
          IFSC:data['ifsc'],
          BankName:data['bank'],
          BranchName:data['branch'],
          Initiated_by:data['initiatedby'],
          Initiated_On:data['initiateddate']+"|"+data['initiatedtime'],
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'Biller List');
    }
  }

  getBillerbyId(){
    if(this.id!=undefined || this.id!=null){
      this.billservice.getbillerbyid(this.id).then(resp=>{
          this.billerdata=resp
          console.log(resp)
      },error=>{
          console.log(error)
      })
    }else{
        this.billdata={}
    }
    
}

  onStatusSelect(status:any){
    if(status['item_text']=='All')
    this.filterstatus="0"
    else
    this.filterstatus=status['item_text']
  }

  onIntervalSelect(interval:any){
    this.filterinterval=interval['item_id']
  }

  onCatSelect(cat:any){
    this.filtercategory=cat['item_id']
  }

  openModalDialog(){
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display=''; //set none css after close dialog

 }

 closedelmodal(){
  this.deletemodal='none'; //set none css after close dialog

 }

 opendeletemodal(id){
   console.log(this.deletemodal)
   console.log(id)
  this.deletemodal='block'; //Set block css
  this.deleteid=id;

}

openeditmodal(id){
  console.log(this.editmodal)
  console.log(id)
 this.editmodal='block'; //Set block css
 this.edit_id=id;
 this.billservice.getbillerbyid(this.edit_id).then(resp=>{
 // this.billerdata=resp
  console.log(resp)
  this.consumer_no=resp['consumer_no']
  this.gl_expense_code=resp['gl_expense_code']
  this.b_email=resp['email']
  this.b_addresss=resp['contact_address']
  this.b_contact=resp['contact_no']
},error=>{
  console.log(error)
})

}

closeeditmodal(){
  this.editmodal='none'; //set none css after close dialog

 }

deletebill(){
  this.loaderService.display(true)
  var params={
    "checkval":[this.deleteid],
    "regcmt":`Deleted by ${this.userdata['firstname']} ${this.userdata['lastname']}`
  }
  this.billservice.deletebillNew(params).then(resp=>{
    console.log(resp)
    
    if(resp['msg']=='biller deleted sucessfully'){
      this.loaderService.display(false)
      this.toaster.success("Bill Deleted Successfully!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
        this.loadbills()
    }else{
      this.loaderService.display(false)
      this.toaster.error("Something went wrong!!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
   
      
  },error=>{
    console.log(error)
    this.loaderService.display(false)
    this.toaster.error("Failed to delete the bill!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  })
}

submitediteddetails(){
  this.loaderService.display(true)
this.editmodal='none';
let params={
  "consumer_no":this.consumer_no,
  "gl_expense_code":this.gl_expense_code,
  "email":this.b_email,
  "contact_no":this.b_contact,
  "contact_address":this.b_addresss
}

this.billservice.updatebills(params,this.edit_id).then(resp=>{
  console.log(resp)
  this.loaderService.display(false)
  if(resp['message']=='Bill updated successfully!'){
    this.loadbills();
    this.toaster.success("Bill parameters has been updated and sent for approval!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }else{
    this.toaster.error("Failed to update bills!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
},error=>{
  console.log(error)
  this.loaderService.display(false)
})
}

  private getUserDetail(){
    this.userservice.getUserDetails().subscribe(res=>{
      //console.log(res)
      this.userdata=res['Data'];
      console.log(this.userdata)
      this.rolename=this.userdata['dualrole']
      this.organisation_id=this.userdata['orgid']
     // this.username=this.userdata['firstname']+" "+this.userdata['lastname']
    },error=>{
      console.log(error)
      if(error['status']==401){
        this.auth.expiresession();
      }
    })
      }

      getApproverDetails(id,index){
        this.selectedIndex = index;
        this.billservice.billapprlogs(id).then(resp=>{
          console.log(resp)
          if(resp!=null){
          this.approverdetails=resp['data']
          }else{
            this.approverdetails=[];
          }
        },error=>{
          console.log(error)
        })
      }

      getcustomreport(){
        this.filterfromdate=this.datepipe.transform(this.filterfromdate, 'yyyy-MM-dd');
      this.filtertodate=this.datepipe.transform(this.filtertodate, 'yyyy-MM-dd');
      let headers = new Headers();
      let billsdata={
        "Fromdate":this.filterfromdate,
        "Todate":this.filtertodate,
        "utility_type":this.utilityname,
        "consumer_no":this.consumerno,
        "name":this.billername,
        "short_name":this.shortname,
        "gl_expense_code":this.glexpensecode,
        "bill_date":this.billdate,
        "due_date":this.duedate,
        "email":this.email,
        "contact_no":this.contactno,
        "contact_address":this.contactaddress,
        "created_by":this.initiatedby,
        "created_on":this.initiatedon,
        "status":this.status,
        "location":this.location,
        "orgid":this.organisation_id
        
      };
      let date =new Date()
      this.downloadFile(billsdata).subscribe(blob=>{
        importedSaveAs(blob, "bills_"+date+".xlsx");
      })
  
      
  }

  downloadFile(arr:any): Observable<Blob> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http.post(path+`api/v1/bill_report`,arr, options)
        .map(res => res.blob())
        .catch(this.handleError)
  }
    handleError(handleError: any): Observable<Blob> {
      throw new Error("Method not implemented.");
    }
  
    editbiller(id){
      this.router.navigate(['/main/add-custom-biller'],{queryParams:{id:id}});
    }

    selectllpara(){
      if(this.selectallpara==true){
        this.utilityname=true;
        this.consumerno=true;
        this.billername=true;
        this.shortname=true;
        this.glexpensecode=true;
        this.billdate=true;
        this.duedate=true;
        this.email=true;
        this.contactno=true;
        this.contactaddress=true;
        this.initiatedby=true;
        this.initiatedon=true;
        this.status=true;
        this.location=true;
      }else{
        this.utilityname=false;
        this.consumerno=false;
        this.billername=false;
        this.shortname=false;
        this.glexpensecode=false;
        this.billdate=false;
        this.duedate=false;
        this.email=false;
        this.contactno=false;
        this.contactaddress=false;
        this.initiatedby=false;
        this.initiatedon=false;
        this.status=false;
        this.location=false;
      }

    }

    getfilterdata(){
      this.billdata=[];
      this.loaderService.display(true)
      var billparams={
        "category":this.filtercategory,
        "interval":this.filterinterval,
        "status":this.filterstatus
      }

      this.billservice.filterbills(billparams).then(resp=>{
        console.log(resp)
        this.billdata=resp['bills']
        if(this.billdata==null){
          this.billerlength=0
          this.noofrole="No bills available"
          this.loaderService.display(false)
        }else{
          this.billerlength=this.billdata.length;
          if(this.billerlength>1){
            this.noofrole="No of bills"
          }else{
            this.noofrole="No of bill"
          }
        }
        this.loaderService.display(false)
      },error=>{
        console.log(error)
        this.loaderService.display(false)
        if(error['error']['msg']=='Bills not found'){
        this.toaster.error("Can't able to filter the bills with your filtered criteria!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
        }
      })
    }

    downloadattachment(id){
      this.billservice.getattachment(id).then(resp=>{
        console.log(resp)
      },error=>{
        console.log(error)
      })

    }

    private loadbills(){
      this.loaderService.display(true)
       this.billservice.getAllbillersNew(0,1,2000).then(resp=>{
        this.billdata=resp['data']
        if(this.billdata==null){
          this.billerlength=0
          this.noofrole="No bills available"
          this.loaderService.display(false)
        }else{
          this.billerlength=this.billdata.length;
          if(this.billerlength>1){
            this.noofrole="No of bills"
          }else{
            this.noofrole="No of bill"
          }
        }
        this.loaderService.display(false)
       },error=>{
         console.log(error)
         this.loaderService.display(false)
         if(error['status']==401){
          this.auth.expiresession();
        }
       })
     }

    

}
