import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../api/auth.service'
import { Routes, RouterModule,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-resetpwduser',
  templateUrl: './resetpwduser.component.html',
  styleUrls: ['./resetpwduser.component.css']
})
export class ResetpwduserComponent implements OnInit {
resetdata:any={}
enterpwd: any;
    reenterpwd: any;
  constructor(private auth:AuthService,private router: Router,private toastr: ToastrService,) { }

  ngOnInit() {
  }


  onSubmit(){

    this.auth.resetpasswordbyuser(this.resetdata).then(resp=>{
      console.log(resp)
      this.auth.logout();
      this.toastr.success("Your password has been reset successfully, Please login to continue!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
       
   
    },error=>{
      console.log(error)
      this.toastr.error("Can't able to reset the password, please contct Aquapay Support Team!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    })
  }

  setnewpwd(){
    if(!!this.enterpwd && !!this.reenterpwd && this.enterpwd.length >= 6){
      //
      if (this.enterpwd == this.reenterpwd) {
        this.auth.setnewpwdwithlogin(this.enterpwd,this.reenterpwd)
        console.log("COrrect Password")
      }else{
        this.toastr.warning("Password and Confirm Password not matched!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
     
    }else{
      this.toastr.warning("Please enter atleast 6-character in password field!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
    
  }
}
