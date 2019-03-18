import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Config} from '../config'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const path = new Config().getBaseURL();
@Injectable({
  providedIn: 'root'
})
export class SetupserviceService {
  public getOrgtoken: any;
  TOKEN_KEY = 'token'
  constructor(private http: HttpClient) { }

  validateauthcode(authcode: any): Promise<any> {
   // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //let options = { headers: headers };
    let paramsValue = {
        "authcode": authcode
    }
    console.log("param id" + authcode);
    let promise = new Promise((resolve, reject) => {
        this.http.post(path+"firstlogin/authcode", paramsValue,httpOptions)
            .subscribe(
                res => {
                    console.log(res);
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

validatepassword(token, password: any, confirmpassword: any): Promise<any> {
  this.getOrgtoken = token;
  this.saveToken(this.getOrgtoken)
  // let token = this.storage.getData("chlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + this.getOrgtoken);
  // let options = { headers: headers };
  let paramsValue = {
      "enterpwd": password,
      "reenterpwd": confirmpassword
  }
  console.log("param id" + password);
  let promise = new Promise((resolve, reject) => {
      this.http.post(path+"firstlogin/setnewpwd", paramsValue)
          .subscribe(
              res => {
                  console.log(res);
                  resolve(res);
              },
              err => {
                  console.log( err);
                  reject(err);
              }
          );

  });

  return promise;
}

getAllorganisations(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
 // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"firstlogin/authOrgData")
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

approveOrganisation(): Promise<any> { 
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.post(path+"firstlogin/approveorg" , {})
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

getPendingUsers(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"firstlogin/authUserData")
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

approveUser(ids: any): Promise<any> {

  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  ids = ids.map(id=>{
      console.log(id);
      return id['id'];
  });
  let promise = new Promise((resolve, reject) => {
      let paramsValue = {
          "checkval": ids
      }
      console.log("param id" + ids);
      this.http.post(path+"firstlogin/approveauthuser", paramsValue)
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

rejectUser(): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  
  let promise = new Promise((resolve, reject) => {
      this.http.post(path+"firstlogin/approveauthuser", {} )
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

rejectOrganisation(comment: any): Promise<any> {

  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {

      let paramsValue = {
          "regcmt": comment
      };
      this.http.post(path+"firstlogin/rejectorg", paramsValue)
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

getAllpendingGroup(): Promise<any> {
        
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      
      this.http.get(path+"firstlogin/authgrpdetails")
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

approveGroup(ids: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  ids = ids.map(id=>{
      console.log(id);
      return id['id'];
  });
  let promise = new Promise((resolve, reject) => {
      let paramsValue = {
          "checkval": ids
      }
      console.log("param id" + ids);
      this.http.post(path+"firstlogin/approveauthgroup", paramsValue)
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

rejectGroup(comment: any): Promise<any> {   
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {

      let paramsValue = {
          "regcmt": comment
      };
      this.http.post(path+"firstlogin/rejectauthgroup", paramsValue)
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

getAllPendingRule(): Promise<any> {     
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"firstlogin/authruledetails")
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


approveRule(ids: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  ids = ids.map(id=>{
      console.log(id);
      return id['ruleid'];
  });
  let promise = new Promise((resolve, reject) => {
      let paramsValue = {
          "checkval": ids
      }
      console.log("param id" + ids);
      this.http.post(path+"firstlogin/approveauthrule", paramsValue)
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

rejectPendingRule(ids: any, comment: any): Promise<any> {
  // let token = this.storage.getData("chlogin_data").token;
  // let newToken = this.storage.getData("new_token");
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + newToken);
  // let options = { headers: headers };
  let promise = new Promise((resolve, reject) => {
      let paramsValue = {
          "checkval": ids,
          "regcmt": comment
      };
      this.http.post(path+"firstlogin/rejectauthrule", paramsValue)
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

getUserDetails(): Promise<any> {
  // let token = this.storage.getData("rmlogin_data").token;
  // let headers = new HttpHeaders().set('Content-Type', 'application/json')
  //     .set('authorization', 'Bearer ' + token);
  // let options = { headers: headers };

  let promise = new Promise((resolve, reject) => {
      this.http.get(path+"adminuser/whois")
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


saveToken(token){
  //console.log('Set Token')
  localStorage.setItem(this.TOKEN_KEY,token)
}

}
