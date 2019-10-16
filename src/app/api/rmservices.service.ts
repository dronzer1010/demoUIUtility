import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Config} from '../config'
const path = new Config().getBaseURL();
const utilpath = new Config().getutilityBaseUrl();
@Injectable({
  providedIn: 'root'
})
export class RmservicesService {
private cardsUrl:any;
private groupUrl:any;
  constructor(private http: HttpClient) { }

  getAllCards(id): Promise<any> {
        
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    
    this.cardsUrl = path+"rm/rmcard?id="+id;
    let promise = new Promise((resolve, reject) => {

        this.http.get(this.cardsUrl)
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

 /**
    * @ngdoc function
    * @name getUserDetails
    * @description This function is used to retrieve user details 
    * from the user API provided.
    * @return promise
    */
   getUserDetails(): Promise<any> {
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };

    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"adminuser/whois")
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

dashboardTopPayment(): Promise<any> {

    var a = new Date();
    var months = [1,2,3,4,5,6,7,8,9,10,11,12];
    var r = months[a.getMonth()];
    console.log(r)
    var y = a.getFullYear();
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {

      this.http.get(path+`rm/rmsuppliers-payments?month=${r}&year=${y}`)
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

getAllOrganizations(): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"rm/rmorganisations")
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

CardSliderDetails(): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"rm/rmcards")
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

getAllToDaySpent(): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };


  let promise = new Promise((resolve, reject) => {

      this.http.get(path+"rm/rmbatchwise-payment")
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


 /**
    * @ngdoc function
    * @name getAllGroups
    * @description This function is used to retrieve suppliers details 
    * from the suppliers API provided.
    * @return promise
    */
   getAllGroups(id): Promise<any> {
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };      
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"rm/rmgroups")
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

  /**
    * @ngdoc function
    * @name getAllOrganizations
    * @description This function is used to retrieve organisation details 
    * from the organisation API provided.
    * @return promise
    */
   getAllRmgroupOrganizations(): Promise<any> {
        
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"rm/rmorganisations")
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

getNotificationDetails(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"/Notification/notificationedit")
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

sendNotificationDetails(regdetails: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      // let paramsValue = {
      //     "paymentsasms" : 1,
      //     "paymentsrotp": 3
      // };
      this.http.post(path+"/Notification/savenotification", regdetails)
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

 /**
    * @ngdoc function
    * @name getAllOrganizations
    * @description This function is used to retrieve organisation details 
    * from the organisation API provided.
    * @return promise
    */
   getAllRmOrganizations(): Promise<any> {
        
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+"rm/rmorganisations")
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

 /**
    * @ngdoc function
    * @name getAllGroups
    * @description This function is used to retrieve suppliers details 
    * from the suppliers API provided.
    * @return promise
    */
   getAllGroupsById(id): Promise<any> {
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    this.groupUrl = path+"rm/rmgroup?id="+id;
    let promise = new Promise((resolve, reject) => {
        this.http.get(this.groupUrl)
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

getAllPayments(params:any): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  
  let promise = new Promise((resolve, reject) => {
      this.http.post(utilpath+"api/v2/dashboard_payment_filter",params)
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

getValidFetchBills(params:any): Promise<any> {
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    
    let promise = new Promise((resolve, reject) => {
        this.http.post(utilpath+"api/v2/rm_payble_payment_bills",params)
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

  getinValidFetchBills(params:any): Promise<any> {
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    
    let promise = new Promise((resolve, reject) => {
        this.http.post(utilpath+"api/v2/rm_non_payble_payment_bills",params)
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



getAllBills(params:any,id:any): Promise<any> {
    // let token = this.storage.getData("rmlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    
    let promise = new Promise((resolve, reject) => {
        this.http.post(utilpath+`api/v2/dashboard_bill_filter/${id}`,params)
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

getOrganizationsDetailById(id): Promise<any> {
  let url = path+'rm/rmorganisationview?id=';
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  url = url + id;

  let promise = new Promise((resolve, reject) => {
      this.http.get(url)
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

getFilterdData(id,paymentstatus,cardpaymentstatus,dateformatstatus,batchformatstatus): Promise<any> {
  let url = path+'rm/rmfilteredpayments?orgid='+id+'&status='+paymentstatus+'&paystatus='+cardpaymentstatus+'&dateformat='+dateformatstatus+'&batch='+batchformatstatus;
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };


  let promise = new Promise((resolve, reject) => {
      this.http.get(url)
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

getFilterdNPageData(id,status,paystatus,dateformat,batch,pageno,pagesize): Promise<any> {
  let url =path+'rm/rmpaymentsfilternpage?orgid='+id+'&status='+status+'&paystatus='+paystatus+'&dateformat='+dateformat+'&batch='+batch+'&pageno='+pageno+'&pagesize='+pagesize;
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };


  let promise = new Promise((resolve, reject) => {
      this.http.get(url)
          .subscribe(
              res => {
                  console.log(res+'real');
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

ruleValidate(amount: any, orgId: any): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let body = {
      "chkamt": amount +"",
      "orgid": orgId + ""
  };
  let promise = new Promise((resolve, reject) => {
      this.http.post(path+"/ccadmin/validaterules", body)
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

    /**
    * @ngdoc function
    * @name getAllSuppliers
    * @description This function is used to retrieve suppliers details 
    * from the suppliers API provided.
    * @return promise
    */
 





getAllUsers(id): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
  let userUrl =path+"rm/rmuser?id=" + id;
  let promise = new Promise((resolve, reject) => {
      this.http.get(userUrl)
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

getRawAccessData(id): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };
 let rawAccessUrl = path+"rm/rmrawaccess?id=" + id;
  
  let promise = new Promise((resolve, reject) => {
      
      this.http.get(rawAccessUrl)
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

getPaylogs(id:number): Promise<any> {
    // let token = this.storage.getData("chlogin_data").token;
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //     .set('authorization', 'Bearer ' + token);
    // let options = { headers: headers };
    let promise = new Promise((resolve, reject) => {
        this.http.get(path+`/maker/approver-details?invid=${id}`)
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

  getPayAppr(id:number){
    return this.http.get<any>(path+`/maker/approver-details?invid=${id}`);
  }

  getSupAppr(id:number){
    return this.http.get(path+`/maker/approverDetailSup?venid=${id}`);
  }
  


}
