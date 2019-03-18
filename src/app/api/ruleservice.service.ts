import { Injectable } from '@angular/core';
import {Config} from '../config'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const path = new Config().getBaseURL();

@Injectable({
  providedIn: 'root'
})
export class RuleserviceService {
 
  constructor(private http: HttpClient) { }
  createrule(rules: any[]) {
    return this.http.post(path+'/ccadmin/saverule', rules);
}

validateRule(amount:any){
  return this.http.post(path+'/ccadmin/validaterule',amount)
}

getAllPendingRules(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"ccadmin/pendingrule")
          .subscribe(
              res => {
                  console.log(res);
                  resolve(res);
              },
              err => {
                  console.log("Error occured : " + err);
                  reject(err);
              }
          );

  });

  return promise;
}

rejectedRule(ids: any, comment: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      let paramsValue = {
          "regcmt": comment,
          "checkval": ids
      };
      this.http.post(path+"ccadmin/rejectrule", paramsValue)
          .subscribe(
              res => {
                  console.log(res);
                  resolve(res);
              },
              err => {
                  console.log("Error occured : " + err);
                  reject(err);
              }
          );

  });

  return promise;
}

sendOtp(ids: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      let paramsValue = ids;
      console.log("param id" + ids);
      this.http.post(path+"ccadmin/appRuleSendOTP", paramsValue)
          .subscribe(
              res => {
                  console.log(res);
                  resolve(res);
              },
              err => {
                  console.log("Error occured : " + err);
                  reject(err);
              }
          );

  });

  return promise;
}

validateOTP(otp: any): Promise<any> {
        
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      let paramsValue = otp;
      console.log("param id" + otp);
      this.http.post(path+"ccadmin/approve-OTPRule", paramsValue)
          .subscribe(
              res => {
                  
                  console.log(res);
                  resolve(res);
              },
              err => {
                  
                  console.log("Error occured : " + err);
                  reject(err);
              }
          );

  });

  return promise;
}
}
