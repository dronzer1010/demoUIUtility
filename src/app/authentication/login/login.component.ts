import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Routes, RouterModule,Router } from '@angular/router';
import {HttpClient } from '@angular/common/http'
import {AuthService} from '../../api/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:string=""
password:string=""

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService,private auth:AuthService) { }

  ngOnInit() {
  }

  loginpost(){
    console.log(this.username+" "+this.password)
    // this.toastr.warning("Please Enter User Name!","Alert",{
    //   timeOut:3000,
    //   positionClass:'toast-top-center'
    //   })

      if(this.username==null|| this.username==undefined || this.username==""){
        this.toastr.warning("Please Enter User Name!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if(this.password==null|| this.password==undefined || this.password==""){
        this.toastr.warning("Please Enter Password!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else if((this.password==null|| this.password==undefined || this.password=="") && (this.username==null|| this.username==undefined || this.username=="")){
        this.toastr.warning("Please Enter User Details!","Alert",{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        //this.auth.loginuser(this.username,this.password)
        this.router.navigate(['/otp']);
      }
  }

  

}
