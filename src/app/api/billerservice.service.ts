import { Injectable } from '@angular/core';
import {Config} from '../config'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const path = new Config().getutilityBaseUrl();

@Injectable({
  providedIn: 'root'
})
export class BillerserviceService {
  //path = new Config().getutilityBaseUrl();

  constructor(private http: HttpClient) { }


  registerbills(billdata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(path+"api/v1/bill", billdata)
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

  getAllbillers(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v1/maker_bills")
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

  getPendingbillers(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v1/checker_bills")
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

getAllStates(){
  let promise = new Promise((resolve, reject) => {
    this.http.get(path+"api/v1/states")
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

getbillersbystate(stateid:any){
  let promise = new Promise((resolve, reject) => {
    this.http.get(path+`api/v1/billers?state=${stateid}`)
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
getbillerdetails(name:any){
  let promise = new Promise((resolve, reject) => {
    this.http.get(path+`api/v1/biller_data?name=${name}`)
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
    let paramsValue = {
        "bill_status_arr":ids
    }

    console.log("param id" + ids);
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v1/approve_bills", paramsValue)
            .subscribe(
                res => {
                    console.log(res);
                    resolve(res);
                },
                err => {
                   if(ids!=null){
                    // this.loader.display(false);
                    // this.router.navigate(['/main/successmsg'],{queryParams:{msg:'supplierapprsuccess'}});
                   }
                    console.log("Error occured :")
                    console.log(err);
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
    let paramsValue = {
        "otp":otp
    }
    console.log("param id" + otp);
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v1/bill_approve_validate", paramsValue)
            .subscribe(
                res => {
                    console.log(res);
                    resolve(res);
                },
                err => {
                   // this.loader.display(false);
                    //this.router.navigate(['/main/successmsg'],{queryParams:{msg:'supplierapprsuccess'}});
                    
                    console.log("Error occured :")
                    console.log(err);
                    reject(err);
                }
            );
  
    });
  
    return promise;
  }

  suplogs(id: any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    

    let promise = new Promise((resolve, reject) => {
        this.http.get(path+`api/v1/bill_approver_detail/${id}`)
            .subscribe(
                res => {
                    console.log(res);
                    resolve(res);
                },
                err => {
                   // this.loader.display(false);
                    //this.router.navigate(['/main/successmsg'],{queryParams:{msg:'supplierapprsuccess'}});
                    
                    console.log("Error occured :")
                    console.log(err);
                    reject(err);
                }
            );
  
    });
  
    return promise;
  }
}
