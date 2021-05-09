import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import {FirstLoginService} from '../../api/first-login.service'


@Component({
  selector: 'app-authcodesetup',
  templateUrl: './authcodesetup.component.html',
  styleUrls: ['./authcodesetup.component.css']
})
export class AuthcodesetupComponent implements OnInit {
  authcode:string;
  constructor(private router: Router,private toastr: ToastrService,private firstLogin:FirstLoginService) { }

  ngOnInit() {
  }
  submit_authcode(){
   
    if (this.authcode!=undefined || this.authcode !=null){
      this.firstLogin.setAuthCode(this.authcode).then(resp=>{
        console.log(resp)
        if (resp['msg']=='OTP sent to reset the password'){
        
          this.firstLogin.saveToken(resp['data']['token'])
          this.router.navigate(['/first-time-otp']);
        }else{
          
          this.toastr.warning("Something went wrong, please contact Aquapay Support!",'Alert',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
       
      },error=>{
       
        console.log(error)
        this.toastr.warning("Failed to send OTP, please contact Aquapay Support!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      })
    }else{
      
      this.toastr.warning("Please enter authentication code!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }

}
