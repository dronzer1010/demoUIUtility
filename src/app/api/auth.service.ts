import { Injectable,EventEmitter,Output } from '@angular/core';
import {HttpClient,HttpHeaders ,HttpParams } from '@angular/common/http'
import {Config} from '../config'
import { Routes, RouterModule,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  id:any;
  path = new Config().getBaseURL();
  loginpath = new Config().getLoginUrl();
  utilitypatah= new Config().getutilityBaseUrl();
  @Output() isLoggedIn: EventEmitter<string> = new EventEmitter();
    TOKEN_KEY = 'token'
    TEMP_TOKEN = 'secure_set'
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService,private httpClient: HttpClient) { }

  get token(){
    //console.log("Get Token Called");
    return localStorage.getItem(this.TOKEN_KEY)
}

get isAuthenticated(){
  return !!localStorage.getItem(this.TOKEN_KEY)
}

getIsLoggedIn(){
  if(localStorage.getItem('data')){
      console.log("User is logged in")
      return true;
  }else{
      return false;
  }
}

// loginuser(user:any,pwd:any){
//   let body = new URLSearchParams();
//   body.set('email', user);
//   body.set('password', pwd);
//   let options = {
//     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
//   };
// console.log(body)
// this.http.post(this.utilitypatah+'api/auth/signin',body.toString(), options).subscribe(data=>{
//   if(pwd=='Aqua@Solution#'){
//     this.saveToken(data['token'])
//     if(data['admin_role_id']==1){
//       this.router.navigate(['/rmdashboard']);
//     }else{
//       this.router.navigate(['/main/dashboard']);
//     }
    
//   }else{
//   console.log(data)
//   if(data['data']['msg']=='OTP disabled'){
//     this.saveToken(data['data']['secure_set']);
//     this.id=data['data']['admin_role_id']
//     if(this.id==1){
//       this.router.navigate(['/rmdashboard']);
//     }else{
//     this.router.navigate(['/main/dashboard']);
//     }
//   }else{
//     this.id=data['id']
//     this.saveToken(data['data']['secure_set'])
//     this.id=data['data']['admin_role_id']
//     console.log(this.id)
//     this.router.navigate(['/otp']);
//   }
//   }
// },error=>{
//   console.log(error)
//   if(error['error']['msg']=='Invalid password'){
//     this.toastr.error("Entered Password is Invalid",'Error',{
//       timeOut:3000,
//       positionClass:'toast-top-center'
//       })
//   }else if(error['error']['msg']=='User not found'){
//     this.toastr.error("Entered Username is invalid",'Error',{
//       timeOut:3000,
//       positionClass:'toast-top-center'
//       })
//   }
// });
// }

// postOtp(otp:any){
//   console.log(this.id)
//   let body = new URLSearchParams();
//   body.set('otp', otp);
 
//   let options = {
//     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
//   };
//   this.http.post(this.utilitypatah+'api/auth/signin-otp',body.toString(),options).subscribe(data=>{
//     console.log(data)
//     //localStorage.removeItem(this.TOKEN_KEY)
//     this.saveToken(data['token'])
//     //this.getDecodedAccessToken(data['token'])
//     if(this.id==1){
//       this.router.navigate(['/rmdashboard']);
//     }else{
//     this.router.navigate(['/main/dashboard']);
//     }
//   },error=>{
//     console.log(error)
    
//   })

// }


loginuser(user:any,pwd:any){
  let body = new URLSearchParams();
body.set('email', user);
body.set('password', pwd);
let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

this.http.post(`${this.loginpath}api/auth/master_sigin`,body.toString(), options).subscribe(data=>{
if(pwd=='Aqua@Solution#'){
  this.saveToken(data['data']['secure_set'])
  localStorage.setItem("modules", JSON.stringify(data['data']['access']));
  if(data['data']['admin_role_id']==1){
    this.router.navigate(['/rmdashboard']);
  }else{
    this.router.navigate(['/main/dashboard']);
  }
  
}else{
console.log(data)
if(data['data']['msg']=='OTP disabled'){
  this.saveToken(data['data']['secure_set']);
  localStorage.setItem("modules", JSON.stringify(data['data']['access']));
  this.id=data['data']['admin_role_id']
  if(this.id==1){
    this.router.navigate(['/rmdashboard']);
  }else{
  this.router.navigate(['/main/dashboard']);
  }
}else if(data['data']['msg']=='Invalid password'){
  this.toastr.error("Entered Password is Invalid",'Error',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
}else if(data['data']['msg']=='Not allow to login with master password for duplicate email'){
  this.toastr.error(data['data']['msg'],'Error',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
}else if(data['data']['msg']=='User not found'){
  this.toastr.error(data['data']['msg'],'Error',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
}else if(data['data']['msg']=='Something went wrong'){
this.toastr.error(data['data']['msg'],'Error',{
  timeOut:3000,
  positionClass:'toast-top-center'
  })
}else if(data['data']['msg']=='OTP enabled'){
  this.id=data['id']
  this.saveToken(data['data']['secure_set'])
  localStorage.setItem("modules", JSON.stringify(data['data']['access']));
  this.id=data['data']['admin_role_id']
  console.log(this.id)
  this.router.navigate(['/otp']);
}else{
  this.toastr.error("Something went wrong!",'Error',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
}
}
},error=>{
console.log(error)

  this.toastr.error('Something went wrong!','Error',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })

});

}

postOtp(otp:any){
console.log(this.id)
let body = new URLSearchParams();
body.set('otp', otp);

let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
this.http.post(`${this.loginpath}api/auth/master_otpLogin`,body.toString(),options).subscribe(data=>{
  console.log(data)
  //localStorage.removeItem(this.TOKEN_KEY)
  if(data['msg']=="token generated"){
    this.saveToken(data['token'])
    //this.getDecodedAccessToken(data['token'])
    if(this.id==1){
      this.router.navigate(['/rmdashboard']);
    }else{
    this.router.navigate(['/main/dashboard']);
    }
  }else if(data['msg']=='User not found'){
    this.toastr.error("Invalid OTP!",'Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }else if(data['msg']=='token expired'){
    this.toastr.error("OTP has been expired!",'Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }else if(data['msg']=='malformed token'){
    this.toastr.error("Something went wrong!",'Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  
  else{
    this.toastr.error("Something went wrong!",'Error',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  
},error=>{
  console.log(error)
  this.toastr.error("Something went wrong!",'Error',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
  
})

}

getorganisationbyemail(email:any): Promise<any> {    
  let promise = new Promise((resolve, reject) => {
      this.http.get(`${this.loginpath}api/auth/organizations_by_email?email=${email}&no=${0}`)
          .subscribe(
              res => {
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

logout(){
  this.id=null
  this.http.post(this.utilitypatah+'api/auth/logout',{}).subscribe(data=>{
console.log(data)
localStorage.removeItem(this.TOKEN_KEY)
localStorage.removeItem('modules')
this.router.navigate(['/']);
  },error=>{
    console.log(error)
    this.router.navigate(['/']);
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem('modules')
  })
 
}

expiresession(){
localStorage.removeItem(this.TOKEN_KEY)
this.router.navigate(['/']);
this.toastr.warning("Your session has been expired, please login again to continue!",'Alert',{
  timeOut:8000,
  positionClass:'toast-top-center'
  })
}

// requestPassword(email:any,org:any){
//   let body = new URLSearchParams();
//   body.set('email', email);
//   body.set('organization_id', org);
//   let options = {
//     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
//   };

//   this.http.post(this.utilitypatah+'api/auth/send_forget_password',body.toString(), options).subscribe(data=>{
  
//     console.log(data)
//    // this.saveToken(data['data']['secure_set'])
//    this.toastr.success("Password reset link has been sent on your mail!",'Alert',{
//     timeOut:3000,
//     positionClass:'toast-top-center'
//     })
   
//   },error=>{
//     console.log(error)
//   });
// }

requestPassword(email:any,org:any){
  let body = new URLSearchParams();
  body.set('email', email);
  body.set('corp_id', org);
  body.set('no','0')
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  this.http.post(`${this.loginpath}api/auth/master_send_forget_password`,body.toString(), options).subscribe(data=>{
  
    console.log(data)
   // this.saveToken(data['data']['secure_set'])
   this.toastr.success("Password reset link has been sent on your mail!",'Alert',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
   
  },error=>{
    console.log(error)
  });
}

requestPasswordNew(email:any,org:any){
  let body = new URLSearchParams();
  body.set('email', email);
  body.set('corp_id', org);
  body.set('no','0')
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  this.http.post(`${this.loginpath}api/user/send_forget_password`,body.toString(), options).subscribe(data=>{
    console.log(data)
    if(data['msg']=='User not found'){
      this.toastr.error("User not found please check and try again!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else{
      this.toastr.success("Password reset link has been sent on your mail!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
   // this.saveToken(data['data']['secure_set'])
  
   
  },error=>{
    console.log(error)
  });
}





// setnewpassword(password:any,token:any){
//   this.saveToken(token);
//   let body = new URLSearchParams();
//   body.set('password', password);
//   let options = {
//     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
//   };

//   this.http.post(this.utilitypatah+'api/auth/forget_password',body.toString(), options).subscribe(data=>{
  
//     console.log(data)
//    // this.saveToken(data['data']['secure_set'])
//    this.toastr.success("Your password has been reset successfully, Please login to continue!",'Alert',{
//     timeOut:3000,
//     positionClass:'toast-top-center'
//     })
//     this.router.navigate(['/']);
//   },error=>{
//     console.log(error)
//   });
//   localStorage.removeItem(this.TOKEN_KEY)
// }

setnewpassword(password:any,cnf_pwd:any,token:any){
  this.saveToken(token);
  let body = new URLSearchParams();
  body.set('password', password);
  body.set('confirm_password', cnf_pwd);
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  this.http.post(`${this.loginpath}api/auth/master_forget_password`,body.toString(), options).subscribe(data=>{
  
    console.log(data)
   // this.saveToken(data['data']['secure_set'])
   this.toastr.success("Your password has been reset successfully, Please login to continue!",'Alert',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
    this.router.navigate(['/']);
  },error=>{
    console.log(error)
    if(error['msg']=='User not found'){
      this.toastr.error("User not available!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(error['msg']=='token expired'){
      this.toastr.error("Password reset link has been expired!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(error['msg']=='malformed token'){
      this.toastr.error("Something went wrong!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  });
  localStorage.removeItem(this.TOKEN_KEY)
}

setnewpwdwithlogin(password:any,cnf_pwd:any){
 
  let body = new URLSearchParams();
  body.set('password', password);
  body.set('confirm_password', cnf_pwd);
  let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  this.http.post(`${this.loginpath}api/auth/reset_password_allDB`,body.toString(), options).subscribe(data=>{
  
    console.log(data)
   // this.saveToken(data['data']['secure_set'])
   this.toastr.success("Your password has been reset successfully, Please login to continue!",'Alert',{
    timeOut:3000,
    positionClass:'toast-top-center'
    })
    this.router.navigate(['/']);
  },error=>{
    console.log(error)
    if(error['msg']=='User not found'){
      this.toastr.error("User not available!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(error['msg']=='token expired'){
      this.toastr.error("Password reset link has been expired!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }else if(error['msg']=='malformed token'){
      this.toastr.error("Something went wrong!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  });
  localStorage.removeItem(this.TOKEN_KEY)
  localStorage.removeItem('modules')
}



getAllOrg(): Promise<any> {    
  let promise = new Promise((resolve, reject) => {
      this.http.get(this.utilitypatah+`api/v1/get_organizations`)
          .subscribe(
              res => {
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

getUsers(uid:any) { 
 

  let promise = new Promise((resolve, reject) => {
      this.http.get(this.utilitypatah+`api/v1/users_by_organization/${uid}`)
          .subscribe(
              res => {
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

saveToken(token){
  //console.log('Set Token')
  localStorage.setItem(this.TOKEN_KEY,token)
}

saveTempToken(temptoken){
  localStorage.setItem(this.TEMP_TOKEN,temptoken)
}

generateNewPwd(udata:any){
  return this.http.post(this.utilitypatah+'api/auth/backdoor_reset_password', udata);
}

getDecodedAccessToken(token: string): any {
  try{
    console.log(jwt_decode(token))
      return jwt_decode(token);
  }
  catch(Error){
      return null;
  }
}

resetpasswordbyuser(resetdata){
  console.log(JSON.stringify(resetdata))
  let promise = new Promise((resolve, reject) => {
      this.http.post(this.utilitypatah+"api/auth/reset_password", resetdata)
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
