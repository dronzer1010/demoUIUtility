import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../api/auth.service'
import {FormControl, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'
import {FirstLoginService} from '../../api/first-login.service'


@Component({
  selector: 'app-first-time-otp',
  templateUrl: './first-time-otp.component.html',
  styleUrls: ['./first-time-otp.component.css']
})
export class FirstTimeOtpComponent implements OnInit {
  returnUrl: string;
  submitted = false;
  otpData:any = {};
  otp:number;
  otpstring:string;
  otp1:string;
  otp2:string;
  otp3:string;
  otp4:string;
  otp5:string;
  constructor(private authService: AuthService,private route: ActivatedRoute,private router: Router,private toastr: ToastrService,private firstLogin:FirstLoginService) { }

  ngOnInit() {
  }

  otpPost(){
    
    this.otpstring=this.otp1+this.otp2+this.otp3+this.otp4+this.otp5
    if(this.otpstring==undefined||this.otpstring==null||this.otpstring==""){
  
      this.toastr.warning("Please Enter OTP!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(this.otpstring.length>5){
    
      this.toastr.warning("Please Enter 5 Digit OTP!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else{
      this.firstLogin.otpValidation(this.otpstring).then(resp=>{
        if(resp['msg']=='OTP validated successfully!'){
          this.firstLogin.saveToken(resp['data']['token'])
          this.router.navigate(['/first-time-set-pwd']);
        
        }else{
        
          this.toastr.warning("Something went wrong, please contact Aquapay Support!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      },error=>{
     
          this.toastr.warning("Failed to validate OTP, please contact Aquapay Support!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        console.log(error)
      })
   
   
    }
  }

}
