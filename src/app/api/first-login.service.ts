import {HttpClient,HttpHeaders  } from '@angular/common/http'
import { Injectable,EventEmitter,Output } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {Config} from '../config'
const loginpath = new Config().getLoginUrl();
@Injectable({
  providedIn: 'root'
})
export class FirstLoginService {
  @Output() isLoggedIn: EventEmitter<string> = new EventEmitter();
  TOKEN_KEY = 'token'
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

  saveToken(token){
    //console.log('Set Token')
    localStorage.setItem(this.TOKEN_KEY,token)
}
get token(){
  //console.log("Get Token Called");
  return localStorage.getItem(this.TOKEN_KEY)
}

get isAuthenticated(){
  return !!localStorage.getItem(this.TOKEN_KEY)
}

setAuthCode(authcode:any): Promise<any> {    
  var params={
    authCode:authcode
  }
  let promise = new Promise((resolve, reject) => {
      this.http.post(`${loginpath}api/user/authcode_authentication`,params)
          .subscribe(
              res => {
                  resolve(res);
              },
              err => {
                  console.log(err);
                  reject(err);
              }
          );
  });
  return promise;
}

otpValidation(otp:any): Promise<any> {    
    //  this.url = 'http://aquapayfake.ap-south-1.elasticbeanstalk.com/api/maker/filteredsupliers?dateformat='+ dateformat;
        let token = localStorage.getItem('token')
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('authorization', 'Bearer ' + token);
        let options = { headers: headers };
  var params={
    otp:otp
  }
  let promise = new Promise((resolve, reject) => {
      this.http.post(`${loginpath}api/user/reset_authcode`,params,options)
          .subscribe(
              res => {
                  resolve(res);
              },
              err => {
                  console.log(err);
                  reject(err);
              }
          );
  });
  return promise;
}
setUserPassword(params:any): Promise<any> {    
 
  let promise = new Promise((resolve, reject) => {
      this.http.post(`${loginpath}api/auth/reset_password_allDB`,params)
          .subscribe(
              res => {
                  resolve(res);
              },
              err => {
                  console.log(err);
                  reject(err);
              }
          );
  });
  return promise;
}
}
