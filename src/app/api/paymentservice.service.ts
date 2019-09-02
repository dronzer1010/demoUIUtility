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
export class PaymentserviceService {
  //path = new Config().getutilityBaseUrl();
  constructor(private http: HttpClient) { }

  makepayment(paymentdata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(path+"api/v2/add_payment", paymentdata)
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


  makeseqpayment(paymentdata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(path+"api/v2/add_payment_seqential", paymentdata)
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

  getAllPayments(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v1/maker_payments")
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


  deletepayment(deleteid:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
  // console.log(JSON.stringify(rejectdata))
    let promise = new Promise((resolve, reject) => {
        this.http.delete(path+`api/v2/payment_delete_by_id/${deleteid}`)
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

  getPendingPayments(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v1/checker_payments")
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

  getattachment(id:any){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+`api/v2/download_payment_attachment/${id}`)
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
        "payment_arr":ids
    }

    console.log("param id" + ids);
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v1/approve_payments", paramsValue)
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
        this.http.post(path+"api/v2/payment_approve_validate", paramsValue)
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

  validateOTPSeq(otp: any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let paramsValue = {
        "otp":otp
    }
    console.log("param id" + otp);
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v2/payment_approve_validate_sequential", paramsValue)
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


  rejectpayments(rejectdata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
   console.log(JSON.stringify(rejectdata))
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v2/reject_payments", rejectdata)
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

  updateprepaidamt(amtdata){
    console.log(JSON.stringify(amtdata))
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v2/update_amount_by_id", amtdata)
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

  uploadattachment(id: any,file): Promise<any> {
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+`api/v2/upload_bill_attachment/${id}`, formData, {reportProgress: true, observe: 'events'})
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

  updextradetail(extradata:any,id: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+`api/v2/update_bill/${id}`,extradata)
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


  
  filterpayment(params:any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+`api/v1/payment_detail_filter`,params)
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

  getHolidays(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v3/get_holidays")
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
