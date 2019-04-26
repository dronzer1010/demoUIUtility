import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../api/auth.service'
import {HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { Routes, RouterModule,Router } from '@angular/router';
@Component({
  selector: 'app-generatepassword',
  templateUrl: './generatepassword.component.html',
  styleUrls: ['./generatepassword.component.css']
})
export class GeneratepasswordComponent implements OnInit {
  org_id:any;
  user_id:any;
password:any;
orgdata:any=[];
userdata:any=[];
udata:any;
  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService,private auth:AuthService) { }

  ngOnInit() {
    this.getorglist()
  }

  setnewpwd(){
    console.log(this.org_id)
    console.log(this.user_id)
    console.log(this.password)
  }

  private getorglist(){
    this.auth.getAllOrg().then(data=>{
      
      this.orgdata=data['organizations']
      console.log(this.orgdata)
    })
     }

     getUserlist(uid:any){
       console.log(uid)
      this.auth.getUsers(uid).then(data=>{
        console.log(data['data'])
        this.userdata=data['data']
      })
     }


     setpassword(){
       this.udata={
        'org_id':this.org_id,
        'user_id':this.user_id,
        'password':this.password
       }
       this.auth.generateNewPwd(this.udata).subscribe(res=>{
         console.log(res)
         this.router.navigate(['/']);
         this.toastr.success("New password has been generated and sent on your mail!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
       },error=>{
         console.log(error)
       })
     }

}
