import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import {LoaderService} from '../../api/loader.service';
import {ExcelService} from '../../excelservice/excel.service'
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
  constructor(private loaderService: LoaderService, private excelservice : ExcelService,private toastr: ToastrService,private route:Router) { }

  ngOnInit() {
    this.loadAllUsers()
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
    // this.userservice.getAll().subscribe(users => {
    //   console.log(users);
    //   this.loaderService.display(false);
    //    this.users = users['data']; 
    //    console.log(this.users);
    //   });
    this.users=[
      {"landlineno":null,"approveddate":"25-02-2019","empid":"T012","role":"Authorised Signatory","uploadfilename":"ShriramRegionalTest.csv","approvedby":"Mr. Thirumurugan J","previlage":"pid=1,52,38,4,22,26,18,61,11,60;cid=17,77,76,28,19,23,54,80,39,79,74,75,2,62,82,61;","mobileno":"9821142184","approvedtime":"12:47:15","dob":"05-01-1980","initiatedtime":"20:11:28","id":296,"designation":"Sr. Manager","department":"Regional Accts Expenses Team","employeename":"Mr. Thirumurugan J","email":"mukund.javir01@axisbank.com","initiateddate":"31-01-2019","initiatedby":"Mr. Sandeep Amit Jaiswar","status":"Approved","group":"A"},
      {"landlineno":null,"approveddate":"25-02-2019","empid":"S2463","role":"Corporate Admin","uploadfilename":"ShriramRegionalTest.csv","approvedby":"Mr. Thirumurugan J","previlage":"pid=1,52,38,4,22,61,11;cid=17,6,7,23,24,53,54,39,40,83,61;","mobileno":"9821142184","approvedtime":"12:47:15","dob":"04-06-1989","initiatedtime":"20:11:28","id":297,"designation":"Officer II","department":"Regional Accts Expenses Team","employeename":"Ms. Saranya K","email":"deepali.patekar01@axisbank.com","initiateddate":"31-01-2019","initiatedby":"Mr. Sandeep Amit Jaiswar","status":"Approved","group":"--"},
      {"landlineno":null,"approveddate":"25-02-2019","empid":"S2468","role":"Maker","uploadfilename":"ShriramRegionalTest.csv","approvedby":"Mr. Thirumurugan J","previlage":"pid=38,22,26,18,61,11;cid=27,28,51,20,19,21,23,39,0;","mobileno":"9821142184","approvedtime":"12:47:15","dob":"25-11-1977","initiatedtime":"20:11:28","id":298,"designation":"Asst. Manager","department":"Regional Accts Expenses Team","employeename":"Ms. Sujatha NR","email":"karan@bank.com","initiateddate":"31-01-2019","initiatedby":"Mr. Sandeep Amit Jaiswar","status":"Approved","group":"--"},
      {"landlineno":null,"approveddate":"25-02-2019","empid":"N645","role":"Checker","uploadfilename":"ShriramRegionalTest.csv","approvedby":"Mr. Thirumurugan J","previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;","mobileno":"9821142184","approvedtime":"12:47:15","dob":"07-06-1963","initiatedtime":"20:11:28","id":299,"designation":"AGM","department":"Regional Accts Expenses Team","employeename":"Ms. Nalini L","email":"amit.kalekar01@axisbank.com","initiateddate":"31-01-2019","initiatedby":"Mr. Sandeep Amit Jaiswar","status":"Approved","group":"A"},
      {"landlineno":null,"approveddate":"25-02-2019","empid":"M1035","role":"Checker","uploadfilename":"ShriramRegionalTest.csv","approvedby":"Mr. Thirumurugan J","previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;","mobileno":"9821142184","approvedtime":"12:47:15","dob":"13-05-1971","initiatedtime":"20:11:28","id":300,"designation":"Manager","department":"Regional Accts Expenses Team","employeename":"Ms. Meena A","email":"shreya.khanduri01@axisbank.com","initiateddate":"31-01-2019","initiatedby":"Mr. Sandeep Amit Jaiswar","status":"Approved","group":"B"},
      {"landlineno":"23232323232","approveddate":"25-02-2019","empid":"23235456","role":"Checker","uploadfilename":"","approvedby":"Mr. Thirumurugan J","previlage":"pid=22,26,18,61,11;cid=28,19,23,74,75,0;","mobileno":"1232323232","approvedtime":"12:47:15","dob":"07-12-0012","initiatedtime":"18:27:55","id":381,"designation":"Manager","department":"Marketting","employeename":"Mr. Ravi Kumar","email":"ravikumar@bank.com","initiateddate":"27-02-2019","initiatedby":"Ms. Saranya K","status":"Approved","group":"B"},
      {"landlineno":"2324354354","approveddate":"25-02-2019","empid":"7876443","role":"Maker","uploadfilename":"","approvedby":"Mr. Thirumurugan J","previlage":"pid=22,26,18,61,11;cid=28,19,23,27,20,51,21,0;","mobileno":"1244365768","approvedtime":"12:47:15","dob":"09-08-0022","initiatedtime":"18:31:24","id":382,"designation":"Manager","department":"Marketign","employeename":"Mr. Karan Kumar","email":"anuragjainaugust12@gmail.com","initiateddate":"27-02-2019","initiatedby":"Ms. Saranya K","status":"Approved","group":"--"}
      ]

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
