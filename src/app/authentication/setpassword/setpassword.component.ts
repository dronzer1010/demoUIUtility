import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd,RoutesRecognized   } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {AuthService} from '../../api/auth.service'
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  params:string;
  password:string;
  cnfpassword:string;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private toastr: ToastrService,private auth:AuthService) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.queryParams["token"];
  }

  setnewpwd(){
    if(!!this.password && !!this.cnfpassword && this.password.length >= 6){
      //
      if (this.password == this.cnfpassword) {
        this.auth.setnewpassword(this.password,this.cnfpassword,this.params)
      }else{
        this.toastr.warning("Password and Confirm Password not matched!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
     
    }else{
      this.toastr.warning("Please enter atleast 6-character in password field!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
    
  }

}
