import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Config} from '../config'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const path = new Config().getutilityBaseUrl();
const restpath = new Config().getBaseURL();
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAllCards(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.get(restpath+"maker/cards")
            .subscribe(
                res => {
                   
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

  getpaydefaultcount(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"api/v1/payment_count")
            .subscribe(
                res => {
                   
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

  getbilldefaultcount(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"api/v1/bill_count")
            .subscribe(
                res => {
                    
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

  getbillcheckercount(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"api/v1/bill_status_count")
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

  getpaycheckercount(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"api/v1/bill_payment_status_count")
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

  gettotalspends(daterange:any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v3/total_spend",daterange)
            .subscribe(
                res => {
                    
                    resolve(res);
                },
                err => {
                    console.log("Error occured : " + err);
                    reject(err);
                    console.log(err['error'])
                }
            );
  
    });
  
    return promise;
  }


  getUtilityExpense(params:any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v3/utility_expense",params)
            .subscribe(
                res => {
                   
                    resolve(res);
                },
                err => {
                    console.log("Error occured : " + err);
                    reject(err);
                    console.log(err['error'])
                }
            );
  
    });
  
    return promise;
  }

  getlast5payments(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"api/v1/top_payments")
            .subscribe(
                res => {
                   
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

  paylogs(id: any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    

    let promise = new Promise((resolve, reject) => {
        this.http.get(path+`api/v1/payment_approver_detail/${id}`)
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
