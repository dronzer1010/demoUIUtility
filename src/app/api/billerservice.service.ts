import { Injectable } from '@angular/core';
import {Config} from '../config'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Http, ResponseContentType , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const path = new Config().getutilityBaseUrl();
const path2 = new Config().getBaseURL();

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

  registerbillsNew(billdata:any[]): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(path2+"maker/vendor", billdata)
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


  getBillerDetailsByiId(billerid:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.get(`${path2}maker/editbiller?billerid=${billerid}`)
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

  updatebillsNew(billdata:any[]): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(path2+"maker/vendor", billdata)
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


  getIfscDetails(ifsc:string){
    return this.http.get<any>('https://ifsc.aquapay.in/api/ifsc/'+ifsc);
  }

  submitbulkbill(billdata:any[]): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    console.log(billdata)
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(path+"api/v2/bulk_upload", billdata)
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

  getAllbillersNew(date,pageno,pagesize){
    let promise = new Promise((resolve, reject) => {
      this.http.get(`${path2}maker/billersfilterednpage?dateformat=${date}&pageno=${pageno}&pagesize=${pagesize}`)
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

  getbillsforpay(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v2/payment_bills")
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

  getvalidbillsforpay(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v2/payble_payment_bills")
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


  getinvalidbillsforpay(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v2/non_payble_payment_bills")
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

  getPendingbillersNew(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(`${path2}maker/billerdetail-pendingPaged?pageno=0&pagesize=2000`)
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


getAllStates_new(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+"api/v1/states_new")
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


getbillersbystateNew(stateid:any){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+`api/v1/billers_new?state=${stateid}`)
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


getbillerdetailsNew(name:any){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+`api/v1/biller_data_new?name=${name}`)
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


  sendOtpNew(ids: any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let paramsValue = {
        "vendorIds":ids
    }

    console.log("param id" + ids);
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path2}checker/sendotpforbiller`, ids)
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


  validateOTPNew(otp: any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let paramsValue = {
        "otp":otp
    }
    console.log("param id" + otp);
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path2}checker/validatebillerotp`, otp)
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


  rejectbills(rejectdata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
   console.log(JSON.stringify(rejectdata))
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v2/reject_bills", rejectdata)
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

  rejectbillsNew(rejectdata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
   console.log(JSON.stringify(rejectdata))
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path2}checker/rejectbillers`, rejectdata)
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


  filterbills(params:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
  
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"api/v1/bill_filter", params)
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


  deletebill(deleteid:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
  // console.log(JSON.stringify(rejectdata))
    let promise = new Promise((resolve, reject) => {
        this.http.delete(path+`api/v2/bill_delete_by_id/${deleteid}`)
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

  deletebillNew(deleteteddata:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
  // console.log(JSON.stringify(rejectdata))
    let promise = new Promise((resolve, reject) => {
        this.http.post(`${path2}maker/deletebiller`,deleteteddata)
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

  billapprlogs(id: any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    

    let promise = new Promise((resolve, reject) => {
        this.http.get(`${path2}maker/Biller-approverDetail?billerid=${id}`).subscribe(
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





//   custombillreport(arr:any): Promise<any> {
   
//     let date = new Date();
//     let headers = new Headers();
 
//     var op={
//         responseType: ResponseContentType.Blob,
   
        
//       }
//     let promise = new Promise((resolve, reject) => {
//         this.http.post(path+`api/v1/bill_report`,arr,op).map(res=>{
//             return {
//                 filename: 'filename.pdf',
//                 data: res.blob()
//               };
//         })
//             .subscribe(
//                 res => {
//                     console.log('start download:',res);
//                     var url = window.URL.createObjectURL(res.data);
//           var a = document.createElement('a');
//           document.body.appendChild(a);
//           a.setAttribute('style', 'display: none');
//           a.href = url;
//           a.download = "payments_"+date+".xls";
//           a.click();
//           window.URL.revokeObjectURL(url);
//           a.remove(); // remove the element
//                     console.log(res);
//                     resolve(res);
//                 },
//                 err => {
                  
//                     console.log('download error:', JSON.stringify(err));
//                     console.log("Error occured :")
//                     console.log(err);
//                     reject(err);
//                 },()=>{
//                     console.log('Completed file download.')
//                 }
//             );
  
//     });
  
//     return promise;
//   }

getattachment(id:any){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+`api/v2/download_bill_attachment/${id}`)
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

  getbillerbyid(id:any){
    let promise = new Promise((resolve, reject) => {
      this.http.get(path+`api/v3/get_bill/${id}`)
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

  updatebills(billdata:any,id:any): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        // let paramsValue = {
        //     "regcmt": comment,
        //     "checkval": ids
        // };
        this.http.post(`${path}api/v3/update_bill/${id}`, billdata)
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
