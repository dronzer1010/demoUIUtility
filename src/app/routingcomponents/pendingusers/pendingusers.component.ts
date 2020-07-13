import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import {LoaderService} from '../../api/loader.service';
import {ExcelService} from '../../excelservice/excel.service'
import {UserserviceService} from '../../api/userservice.service'
@Component({
  selector: 'app-pendingusers',
  templateUrl: './pendingusers.component.html',
  styleUrls: ['./pendingusers.component.css']
})
export class PendingusersComponent implements OnInit {
  currentUser: Users;
  users: any[] = [];
  userdata:any={};
  filterQuery = "";
  rowsOnPage = 1000;
  sortBy = "email";
  sortOrder = "asc";
  filter:any;
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false
  public pendingPayment: any;
  public checkedValue: any;
  public flag: any;
  public checkedValueArray: any = [];
  public cntChk: any;
  public temp: any;
  public ids: any = [];
  public totalvalue: any;
  public pendingUserList: any;
  public rejectedgroupdata: any;
  public rejectedgroupmsg: any;
  public pendingusers: any=[];
  public comment: any; 
  isComplexOrg:boolean=true;
  isViewuser:boolean;
  isUniuser:boolean;
  isBulkuser:boolean;
  isAppruser:boolean;
  isViewcard:boolean;
  isUnicard:boolean;
  isApprcard:boolean;
  isViewgroup:boolean;
  isUnigroup:boolean;
  isApprgroup:boolean;
  isRuleValidate:boolean;
  isUnirule:boolean;
  isRuleappr:boolean;
  isViewsup:boolean;
  isUnisup:boolean;
  isBulksup:boolean;
  isApprsup:boolean;
  isViewpay:boolean;
  isUnipay:boolean;
  isApprpay:boolean;
  isBulkpay:boolean;
  public checkval: any=[];
  model :any = {};
  dateformatstatus:any;
  public userDetails: any;
  downloadList:boolean=false;
  downloadArray:any=[];
  selectall:boolean=false;
  selectedAll: any;
  disRejMod:string='none'
  disPrivModal:string='none'
  constructor(private loaderService: LoaderService, private excelservice : ExcelService,private toastr: ToastrService,private route:Router, private userservice: UserserviceService) { }

  ngOnInit() {
    this.loadAllUsers()
  }

  private loadAllUsers() {
    this.loaderService.display(true);
    this.userservice.getAll().subscribe(res => {
      console.log(res);
    
       this.users = res['data']; 
       console.log(this.users);
       this.pendingUserList=this.users
      //console.log(this.pendingUserList)
      for(var i=0; i< this.pendingUserList.length;i++){
     
        if(this.pendingUserList[i].status =="Pending"){
          this.pendingusers.push(this.pendingUserList[i]);
        }
        
    }

      this.loaderService.display(false);
      },error=>{
        console.log(error)
        this.loaderService.display(false);
      });
    
    
      
}

getPrivileges(id:number){
  console.log(id)
}
setPriv(str :string){
  console.log("user permission is "+str);
  str = str.replace("pid=" ,"");
  str = str.replace(";cid=",",");
  str = str.replace(";","");
  str = str.replace(" ","");
  var tab_arr = str.split(",");

  this.isViewuser = this.checkValInArray("17",tab_arr)
  //console.log(tab_arr);
  this.isUniuser = this.checkValInArray("6",tab_arr)
  this.isBulkuser = this.checkValInArray("7",tab_arr)
  this.isAppruser = this.checkValInArray("76",tab_arr)
  this.isViewcard = this.checkValInArray("23",tab_arr)
  this.isUnicard = this.checkValInArray("24",tab_arr)
  //console.log(this.isUnicard);
  this.isApprcard = this.checkValInArray("77",tab_arr)
  this.isViewgroup = this.checkValInArray("54",tab_arr)
  this.isUnigroup = this.checkValInArray("53",tab_arr)
  this.isApprgroup = this.checkValInArray("80",tab_arr)
  this.isRuleValidate = this.checkValInArray("39",tab_arr)
  this.isUnirule = this.checkValInArray("40",tab_arr)
  this.isRuleappr = this.checkValInArray("79",tab_arr)
  this.isViewsup = this.checkValInArray("28",tab_arr)
  this.isUnisup = this.checkValInArray("27",tab_arr)
  this.isBulksup = this.checkValInArray("51",tab_arr)
  this.isApprsup = this.checkValInArray("74",tab_arr)
  this.isViewpay = this.checkValInArray("19",tab_arr)
  this.isUnipay = this.checkValInArray("20",tab_arr)
  this.isApprpay = this.checkValInArray("75",tab_arr)
  this.isBulkpay = this.checkValInArray("21",tab_arr)
}

sortByDesc(sortByValue: string) : void {
  this.sortBy = sortByValue;
  this.sortOrder = "desc";
}

sortByAsc(sortByValue: string) : void {
  this.sortBy = sortByValue;
  this.sortOrder = "asc";
}

getDateFormatData(data) {
  if (data == "Today") {
    this.dateformatstatus = 1;
  }
  if (data == "ThisWeek") {
    this.dateformatstatus = 2;
  }
  if (data == "ThisMonth") {
    this.dateformatstatus = 3;
  }
  if (data == "ThisYear") {
    this.dateformatstatus = 4;
  }
  if (data == "All") {
    this.dateformatstatus = 0;
  }
  // this.userservice.getFilterdData(this.dateformatstatus).then(res => {
  //   this.users = res.data;
  // })
}

checkValInArray(tabid:string , tab_array:string[]){
  return (tab_array.indexOf(tabid)==-1)?false:true;
}

change(id): void {
  this.flag = 0;
for (var i = 0; i < this.checkedValueArray.length; i++) {
  if (this.checkedValueArray[i] == id) {
    this.checkedValueArray.splice(i, 1);
    this.flag = 1;
  }
}
if (this.flag == 0) {
  this.checkedValueArray.push(id);
 
}

if (this.checkedValueArray.length > 0) {
  this.temp = true;
  if(this.checkedValueArray.length<this.pendingusers.length){
    this.selectall=false
  }else{
    this.selectall=true;
    this.cntChk = 1;
  }
  console.log(this.selectall)
 
}
else {
  this.temp = false;
  if(this.checkedValueArray.length<this.pendingusers.length){
    this.selectall=false
  }else{
    this.selectall=true;
  }
  console.log(this.selectall)
 
}
console.log(this.checkedValueArray)
}

changeAll(pendingPayment): void {
  if(this.checkedValueArray.length==this.pendingusers.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.cntChk=0
    }
    console.log(this.selectall)
    if (this.cntChk == 0) {
      this.cntChk = 1;
      this.temp = true;
      this.selectall=true;
      for (var i = 0; i < pendingPayment.length; i++) {
        this.checkedValueArray[i] = pendingPayment[i].id;
      }
      this.cntChk = 0;
    }
   
    else {
      this.cntChk = 0;
      this.temp = false;
      this.checkedValueArray = [];
    }
    console.log(this.checkedValueArray)
}

selectAll() {
  for (var i = 0; i < this.pendingusers.length; i++) {
    this.pendingusers[i].selected = this.selectedAll;
  }
}

checkIfAllSelected() {
  this.selectedAll = this.pendingusers.every(function(item:any) {
      return item.selected == true;
    })
}

gotoOTP(): void {
  console.log(this.temp)

  console.log(JSON.stringify(this.checkedValueArray))
  if (this.temp == true) {
   this.route.navigate(['/main/otp-user', JSON.stringify(this.checkedValueArray)]);
  //  var ids:any=[]
  //  ids= JSON.stringify(this.checkedValueArray)
  //  this.route.navigate(['/main/otp-user'],{queryParams:{ids:ids}});
  } else {
    alert("First select at least one checkbox.");
  }


}

displayRejMod(){
this.disRejMod='block'
}
closeRejMod(){
  this.disRejMod='none'
}

openPrivMod(){
this.disPrivModal='block'
}
 closePrivMod(){
  this.disPrivModal='none'
 }


 rejectGroupById(): void {
  this.userservice.rejectedGroup(this.checkedValueArray, this.comment).then(resp => {
    this.rejectedgroupdata = resp;
    if (this.rejectedgroupdata.msg == "succes") {
      // this.router.navigate(['/asnpendingusers']);
      this.pendingusers = [];
      this.userservice.pendingUsersList().then(resp => {
        this.pendingUserList = resp.data;
        for(var i=0; i< this.pendingUserList.length;i++){
          if(this.pendingUserList[i].status =="Pending"){
            this.pendingusers.push(this.pendingUserList[i]);
          }
      }
      });
      this.route.navigate(['/main/rejectmsg'],{queryParams:{msg:'userreject'}});
    }
  });
  
}

}
