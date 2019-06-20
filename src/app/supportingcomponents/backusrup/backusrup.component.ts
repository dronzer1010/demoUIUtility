import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
//import * as $ from 'jquery';
//declare var jquery:any;
//declare var $ :any;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//import{UserService} from '../../api/user.service'
import { Router,ActivatedRoute } from '@angular/router';
import{LoaderService} from '../../api/loader.service'
import { ToastrService } from 'ngx-toastr'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Config} from '../../config'
const path = new Config().getBackURL();
@Component({
  selector: 'app-backusrup',
  templateUrl: './backusrup.component.html',
  styleUrls: ['./backusrup.component.css']
})

export class BackusrupComponent implements OnInit {
  public params:any;
  fileUpload:File;
  filename:string="Click to Browse"
  selectedFiles: FileList;
  model: any = {};
  userData: any = {};
  _users:any[]=[];
  isSelected = false;
  orgid:any;
  step2:boolean=false;
  constructor(private router: Router,private loaderService: LoaderService,private toastr: ToastrService,private http: HttpClient,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.orgid = this.activatedRoute.snapshot.queryParams["orgid"];
  }

  UploadFile(event){
    this.selectedFiles = event.target.files;
    this.filename = this.selectedFiles[0].name;
    //console.log('selectedFiles: ' + event.target.files[0] );
    this.uploaduserback(this.selectedFiles[0],this.orgid).subscribe(
      
      data=>{
        this.step2=true;
        this.userData=data["Data"];
        console.log(this.userData);
      },error=>{
        this.step2=false;
        console.log("Failed to Upload")
      }
    )
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
   /**
   * Submit Users
   */
  submitUsers(){
    this.loaderService.display(true);
    console.log(this._users)
    debugger
    this.submitBulkUserback(this._users,this.orgid).subscribe(data => {
      console.log(data)
      this.loaderService.display(false);
      //alert("Submitted SUccessfully")
     this.router.navigate(['/']);
     this.toastr.success("User uploaded successfully!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
   },error => {
   
     console.log(error)
    // alert("Error in SUbmitting")
     this.router.navigate(['/']);
     this.toastr.error("User uploading failed!","Alert",{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
     //this.router.navigate(['/successmsg'],{queryParams:{msg:'usersuccess'}});
 });
  }

  submitBulkUserback(users:any[],orgid:any){
    console.log(users)
    return this.http.post(path+`/remotesavebulkuser?orgid=${orgid}`, users);
}

 uploaduserback(file:File,orgid:any){
        let data ={};
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        console.log(file);
        return this.http.post(path+`/remotebulkuserupload?orgid=${orgid}`, formdata);
    }
}
