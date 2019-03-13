import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import{LoaderService} from '../../api/loader.service'

@Component({
  selector: 'app-userbulk',
  templateUrl: './userbulk.component.html',
  styleUrls: ['./userbulk.component.css']
})
export class UserbulkComponent implements OnInit {
  fileUpload:File;
  filename:string="Click to Browse"
  selectedFiles: FileList;
  model: any = {};
  userData: any = {};
  _users:any[]=[];
  isSelected = false;
  
  step2:boolean=false;
  constructor(private router: Router,private loaderService: LoaderService) { }

  ngOnInit() {
  }

  UploadFile(event){
    this.selectedFiles = event.target.files;
    this.filename = this.selectedFiles[0].name;
    //console.log('selectedFiles: ' + event.target.files[0] );
    // this.userservice.uploaduser(this.selectedFiles[0]).subscribe(
      
    //   data=>{
    //     this.step2=true;
    //     this.userData=data["Data"];
    //     console.log(this.userData);
    //   },error=>{
    //     this.step2=false;
    //     console.log("Failed to Upload")
    //   }
    // )
    this.step2=true; //remove
    this.userData=[{"id":null,"empid":"APM1962","email":"finance.delhi@agarwalpackers.com","firstname":"RAJESH","lastname":"MODI","dob":"07-02-1975","mobileno":"9313431316","landlineno":null,"password":null,"department":"FINANCE","designation":"HEAD-TREASURER","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Authorised Signatory","companyname":null,"organisation":0,"isactive":0,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":"false","tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":"Mr.","authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":"AGARWAL.csv","agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false},
    {"id":null,"empid":"APM2218","email":"manjuagarwal@agarwalpackers.com","firstname":"MANJU","lastname":"AGARWAL","dob":"05-05-1963","mobileno":"9312204321","landlineno":null,"password":null,"department":"PURCHASE","designation":"DIRECTOR","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Corporate Admin","companyname":null,"organisation":0,"isactive":0,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":"false","tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":"Ms.","authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":"AGARWAL.csv","agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false},
    {"id":null,"empid":"APM4415","email":"lovedesh.gupta@agarwalpackers.com","firstname":"LOVEDESH","lastname":"GUPTA","dob":"13-01-1973","mobileno":"9818382713","landlineno":null,"password":null,"department":"FINANCE","designation":"MANAGER-ACCOUNTS","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Maker","companyname":null,"organisation":0,"isactive":0,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":"false","tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":"Mr.","authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":"AGARWAL.csv","agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false}] //remove
  }

  updateUserList(user:any , index:number){
    var temp_index=-1;
   for(var i=0;i<this._users.length;i++){
     if(this._users[i]["_id"]==index){
       temp_index=i;
     }
   }

   if(temp_index>-1){
    this._users.splice(temp_index , 1);
   }else{
    user["_id"] = index;
    this._users.push(user);
   }
   console.log(this._users);
  }

  /**
   * CheckAll Functionality
   */

  checkAll(checkedState:boolean){
    console.log(checkedState);

    if(!checkedState){
      this._users=[];
      for(var i=0;i<this.userData.length;i++){
        this._users.push(this.userData[i]);
        this._users[i]["_id"]=i;
      }
    }else{
      this._users=[];
    }

    console.log(this._users);
    this.isSelected = !checkedState
  }

  submitUsers(){
    this.loaderService.display(true);
    console.log(this._users)
    this.loaderService.display(false); //remove
    this.router.navigate(['/main/successmsg'],{queryParams:{msg:'usersuccess'}});//remove
//     this.userservice.submitBulkUser(this._users).subscribe(data => {
//       console.log(data)
//       this.loaderService.display(false);
//       //alert("Submitted SUccessfully")
//      this.router.navigate(['/main/successmsg'],{queryParams:{msg:'usersuccess'}});
//    },error => {
   
//      console.log(error)
//      alert("Error in SUbmitting")
//      //this.router.navigate(['/successmsg'],{queryParams:{msg:'usersuccess'}});
//  });
  }

}
