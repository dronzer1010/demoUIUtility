import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Routes, RouterModule,Router,ActivatedRoute } from '@angular/router';
import {HttpClient } from '@angular/common/http'
import {AuthService} from '../../api/auth.service'

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
temptoken:any;
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService,private auth:AuthService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.temptoken = this.activatedRoute.snapshot.queryParams["temptoken"];
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
    }else{
this.auth.postOtp(this.otp);
    }
    // else if(this.otp=='34123'){
    //   localStorage.setItem('rolename', 'maker');
    //   this.router.navigate(['/main/dashboard']);
    // }else if(this.otp=='32324'){
    //   localStorage.setItem('rolename', 'checker');
    //   this.router.navigate(['/main/dashboard']);
    // }else if(this.otp=='85444'){
    //   localStorage.setItem('rolename', 'as');
    //   this.router.navigate(['/main/dashboard']);
    // }else if(this.otp=='23343'){
    //   localStorage.setItem('rolename', 'ccadmin');
    //   this.router.navigate(['/main/dashboard']);
    // }else if(this.otp=='97655'){
    //   localStorage.setItem('rolename', 'ccmaker');
    //   this.router.navigate(['/main/dashboard']);
    // }else if(this.otp=='12234'){
    //   localStorage.setItem('rolename', 'ccchecker');
    //   this.router.navigate(['/main/dashboard']);
    // }else if(this.otp=='86543'){
    //   localStorage.setItem('rolename', 'aschecker');
    //   this.router.navigate(['/main/dashboard']);
    // }
    // else{
    //   this.toastr.warning("Please Enter Correct OTP!","Alert",{
    //     timeOut:3000,
    //     positionClass:'toast-top-center'
    //     })
    // }
    
  }

}
