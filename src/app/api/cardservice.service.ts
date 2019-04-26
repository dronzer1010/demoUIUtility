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

export class CardserviceService {
  

  constructor(private http: HttpClient) { }

  registercard(card: any) {
    console.log(card)
    return this.http.post(path+'cards/save-Card', card);
}

getAll() {
  return this.http.get<any>(path+'maker/cards');
}

getAllCardsData(firstdate,lastdate){
  return this.http.get<any>(path+'/maker/cardcompare?firstDate='+firstdate+'&lastDate='+ lastdate);
}

getAllCards(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  //this.cardsUrl = this.cardsUrl + id;
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"maker/cards")
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
      this.http.post(path+"cards/appCardSendOTP", body)
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
      this.http.post(path+"cards/approve-OTPCard", paramsValue)
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

rejectedCard(ids: any, comment: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let paramsValue = {
      "regcmt": comment,
      "setstatus": [ids]
  };
  let promise = new Promise((resolve, reject) => {
      this.http.post(path+"cards/rejectcard", paramsValue)
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
