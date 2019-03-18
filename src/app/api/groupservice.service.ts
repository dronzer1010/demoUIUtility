import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Config} from '../config'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const path = new Config().getBaseURL();
@Injectable({
  providedIn: 'root'
})
export class GroupserviceService {

  constructor(private http: HttpClient) { }
  registergroup(group: any) {
    return this.http.post(path+'/ccadmin/group', group);
}

getAll() {
  return this.http.get<any>(path+'/ccadmin/groups');
}

getAllGroups(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"ccadmin/groups")
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

rejectedGroup(ids: any, comment: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      let paramsValue = {
          "regcmt": comment,
          "checkval": ids
      };
      this.http.post(path+"ccadmin/rejectgroup", paramsValue)
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
  let body = [ids];            
  let promise = new Promise((resolve, reject) => {       
      console.log("param id" + ids);
      this.http.post(path+"ccadmin/appGroupSendOTP", body)
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
  let paramsValue = otp;
  console.log("param id" + otp);
  let promise = new Promise((resolve, reject) => {
      this.http.post(path+"ccadmin/approve-OTPGroup", paramsValue)
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
