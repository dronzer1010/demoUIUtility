import { Injectable,EventEmitter,Output } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Config} from '../config'
import { Routes, RouterModule,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = new Config().getBaseURL();
  @Output() isLoggedIn: EventEmitter<string> = new EventEmitter();
    TOKEN_KEY = 'token'
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { }

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

logout(){
  //console.log('Please logout')
  localStorage.removeItem(this.TOKEN_KEY)
}

saveToken(token){
  //console.log('Set Token')
  localStorage.setItem(this.TOKEN_KEY,token)
}

}
