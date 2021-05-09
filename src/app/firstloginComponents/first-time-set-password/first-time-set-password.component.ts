import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd,RoutesRecognized   } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import {AuthService} from '../../api/auth.service'
import {FirstLoginService} from '../../api/first-login.service'


@Component({
  selector: 'app-first-time-set-password',
  templateUrl: './first-time-set-password.component.html',
  styleUrls: ['./first-time-set-password.component.css']
})
export class FirstTimeSetPasswordComponent implements OnInit {
  params:string;
  id:any;
  password:string;
  cnfpassword:string;
  validPassword:boolean=false;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private toastr: ToastrService,private auth:AuthService,private firstLogin:FirstLoginService) { }

  ngOnInit() {
  }

  setnewpwd(){
  
    if(this.validPassword==true){
      if(!!this.password && !!this.cnfpassword && this.password.length >= 8){
        if (this.password == this.cnfpassword) {
          var params={
            password:this.password,
            confirm_password:this.cnfpassword
          }
          this.firstLogin.setUserPassword(params).then(resp=>{
            if(resp['msg']=='Password updated successfully'){
              this.router.navigate(['/']);
             
              localStorage.clear();
              this.toastr.success("Your password has been updated successfully, please login to continue!",'Success',{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
            }else{
           
              this.toastr.warning("Something Went wrong, Please contact Aquapay Support!",'Alert',{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
            }
          },error=>{
         
            console.log(error)
            this.toastr.warning("Failed to update password, Please contact Aquapay Support!",'Alert',{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          })
        }else{
       
          this.toastr.warning("Password and Confirm Password not matched!",'Alert',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      }else{
     
        this.toastr.warning("Please enter atleast 8-character in password field!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    }else{
     
        this.toastr.warning("Please enter the valid password as mentioned on the screen!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
    }
  
  }

 CheckPassword(inputtxt) { 
      var passw=  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
      if (passw.test(inputtxt)) {
        console.log("Valid Password")
        this.validPassword=true;
    } else {
      this.toastr.error("Invalid Password, Passwords must contain at least eight characters, including atleast one uppercase, one lowercase letter , one number and one special character.!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
        this.validPassword=false;
    }
}

}
