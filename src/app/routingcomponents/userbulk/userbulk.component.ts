import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import { ToastrService } from 'ngx-toastr'
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
  constructor(private router: Router,private loaderService: LoaderService,private userservice:UserserviceService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  UploadFile(event){
    this.loaderService.display(true);
    this.selectedFiles = event.target.files;
    this.filename = this.selectedFiles[0].name;
    console.log('selectedFiles: ' + event.target.files[0] );
    this.userservice.uploaduser(this.selectedFiles[0]).subscribe(
      
      data=>{
        this.step2=true;
        this.userData=data["Data"];
        this.loaderService.display(false);
        console.log(this.userData);
      },error=>{
        this.step2=false;
        this.loaderService.display(false);
        this.toastr.error("Failed to upload!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
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

  submitUsers(){
    this.loaderService.display(true);
    console.log(this._users)
    //this.loaderService.display(false); //remove
    //this.router.navigate(['/main/successmsg'],{queryParams:{msg:'usersuccess'}});//remove
    this.userservice.submitBulkUser(this._users).subscribe(data => {
      console.log(data)
      this.loaderService.display(false);
      //alert("Submitted SUccessfully")
     this.router.navigate(['/main/successmsg'],{queryParams:{msg:'usersuccess'}});
   },error => {
   
     console.log(error)
     alert("Error in SUbmitting")
     //this.router.navigate(['/successmsg'],{queryParams:{msg:'usersuccess'}});
 });
  }

}
