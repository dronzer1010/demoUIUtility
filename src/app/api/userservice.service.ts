import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const path = new Config().getBaseURL();
import {Config} from '../config'
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  userData: any = {};
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(path+'/adminuser/user');
}
create(user: any) {
  return this.http.post(path+'/adminuser/user', user);
}

getUserDetails(){
  return this.http.get(path+'/adminuser/whois');
}

uploaduser(file:File){
  let data ={};
  const formdata: FormData = new FormData();
  formdata.append('file', file);
  console.log(file);
  return this.http.post(path+'/adminuser/bulkuserupload', formdata);
}

getUserById(id:number){
        
}

deleteUser(checkval : any){
    return this.http.post(path+'/adminuser/deleteuser', checkval);

}

getFilterdData(dateformat): Promise<any> {
  // this.url = 'http://aquapayfake.ap-south-1.elasticbeanstalk.com/api/maker/filteredsupliers?dateformat='+ dateformat;
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };

  let promise = new Promise((resolve, reject) => {
      this.http.get(path+'/adminuser/filteredusers?dateformat='+ dateformat )
          .subscribe(
              res => {
                  //console.log(res);
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

pendingUsersList(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };      
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"adminuser/user")
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
          "inactivecmt": comment,
          "checkval": ids
      };
      this.http.post(path+"adminuser/rejectUser", paramsValue)
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
  let body = ids;            
  let promise = new Promise((resolve, reject) => {
      console.log("param id" + ids);
      this.http.post(path+"adminuser/approveUserSendOTP", body)
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
      this.http.post(path+"adminuser/approve-OTPUser", paramsValue)
          .subscribe(
              res => {
                  console.log(res);
                  resolve(res);
              },
              err => {
                  console.log("Error Occured")
                  console.log(err);
                  reject(err);
              }
          );

  });

  return promise;
}

setter(userdata:any){
  this.userData=userdata
  console.log(this.userData)
}


getter(){
  console.log(this.userData)
  return this.userData;
}
}
