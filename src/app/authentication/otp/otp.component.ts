import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Routes, RouterModule,Router } from '@angular/router';
import {HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
otp1:string="";
otp2:string="";
otp3:string="";
otp4:string="";
otp5:string="";
otp:string="";

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
  
  }

  loginotp(){
    this.otp=this.otp1+this.otp2+this.otp3+this.otp4+this.otp5
    if(this.otp==undefined||this.otp==null||this.otp==""){
      this.toastr.warning("Please Enter OTP first!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(this.otp.length>5){
      this.toastr.warning("Please Enter 5 Digit OTP!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(this.otp!='34123'){
      this.toastr.warning("Please Enter Correct OTP!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else{
      this.router.navigate(['/dashboard-maker']);
    }
    
  }

}
