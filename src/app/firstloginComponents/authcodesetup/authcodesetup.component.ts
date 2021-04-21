import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import {FirstLoginService} from '../../api/first-login.service'
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

@Component({
  selector: 'app-authcodesetup',
  templateUrl: './authcodesetup.component.html',
  styleUrls: ['./authcodesetup.component.css']
})
export class AuthcodesetupComponent implements OnInit {
  authcode:string;
  constructor(private router: Router,private toastr: ToastrService,private firstLogin:FirstLoginService,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }
  submit_authcode(){
    this.ngxService.start()
    if (this.authcode!=undefined || this.authcode !=null){
      this.firstLogin.setAuthCode(this.authcode).then(resp=>{
        console.log(resp)
        if (resp['msg']=='OTP sent to reset the password'){
          this.ngxService.stop()
          this.firstLogin.saveToken(resp['data']['token'])
          this.router.navigate(['/first-time-otp']);
        }else{
          this.ngxService.stop()
          this.toastr.warning("Something went wrong, please contact Aquapay Support!",'Alert',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
       
      },error=>{
        this.ngxService.stop()
        console.log(error)
        this.toastr.warning("Failed to send OTP, please contact Aquapay Support!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      })
    }else{
      this.ngxService.stop()
      this.toastr.warning("Please enter authentication code!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }

}
