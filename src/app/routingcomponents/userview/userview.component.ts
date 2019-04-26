import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import {LoaderService} from '../../api/loader.service';
import {ExcelService} from '../../excelservice/excel.service'
import {UserserviceService} from '../../api/userservice.service'
@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  currentUser: Users;
  users: any[] = [];
  userdata:any={};
  filterQuery = "";
  public searchText : string;
  rowsOnPage = 1000;
  sortBy = "email";
  sortOrder = "asc";
  isComplexOrg:boolean=true;
  displayPrivModal:string='none'
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
  key: string = 'status'; //set default
  reverse: boolean = true;
  public checkval: any=[];
  model :any = {};
  dateformatstatus:any;
  public userDetails: any;
  downloadList:boolean=false;
  downloadArray:any=[];
  dropdownList = [];
  selectedItems1 = [];
  dropdownSettings1 = {};
  constructor(private loaderService: LoaderService, private excelservice : ExcelService,private toastr: ToastrService,private route:Router, private userservice: UserserviceService) { }

  ngOnInit() {
    this.loadAllUsers()
    //this.rolename=localStorage.getItem('rolename')
    this.dropdownList = [
      { item_id: 1, item_text: 'Today' },
      { item_id: 2, item_text: 'This Week' },
      { item_id: 3, item_text: 'This Month' },
      { item_id: 4, item_text: 'This Year' }
    ];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  private loadAllUsers() {
    this.loaderService.display(true);
    this.userservice.getAll().subscribe(users => {
      console.log(users);
      this.loaderService.display(false);
       this.users = users['data']; 
       console.log(this.users);
      });
    

      this.loaderService.display(false);
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
  this.displayPrivModal="block"
}
closesetpriv(){
  this.displayPrivModal="none"
}
userId(id : number){
  this.checkval =[];
  this.checkval.push(id);
  console.log(this.checkval);
  this.model['checkval']=this.checkval;
}

removeUser(){
  this.checkval =[];
}
deleteUser(){
  //debugger
  // this.userservice.deleteUser(this.model).subscribe(
  //   response =>{
  //     console.log('User Deleted');
  //     this.checkval=[];
  //     this.loadAllUsers();
  //     this.toastr.warning("User deleted Successfully","Success",{
  //       timeOut:3000,
  //       positionClass:'toast-top-center'
  //       })
  //   }
  // )

}

updateUser(user:any){
  this.userdata=user;
  console.log(this.userdata);
  //this.userservice.setter(this.userdata);
  this.route.navigate(['/main/unitaryuser']);
  }

  sortByDesc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "desc";
  }

  sortByAsc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "asc";
  }

  exportAsXLSX():void {
    this.downloadList=true;  
    if(this.users.length>=0){
      for(let data of this.users){
        var obj={
          Employee_Name:data['employeename'],
          Designation:data['designation'],
          Department:data['department'],
          Role:data['role'],
          Employee_Id:data['empid'],
          Date_of_Birth:data['dob'],
          Contact_Number:data['mobileno'],
          Landline_Number:data['landlineno'],
          Email_Id:data['email'],
          Group:data['group'],
          Uploaded_file:data['uploadfilename'],
          Initiated_On:data['initiateddate']+' '+data['initiatedtime'],
          Initiated_By:data['initiatedby'],
          Approved_On:data['approveddate']+' '+data['approvedtime'],
          Approved_By:data['approvedby']
  
        }
        this.downloadArray.push(obj)
      }
      this.excelservice.exportAsExcelFile( this.downloadArray, 'User List');
    }else{
      this.toastr.warning("No Data Available","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
    
   // this.excelservice.exportAsExcelFile( this.users, 'User');
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

}
