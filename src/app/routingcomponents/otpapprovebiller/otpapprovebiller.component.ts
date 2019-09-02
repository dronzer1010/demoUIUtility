import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import{Router,ActivatedRoute} from '@angular/router';
import {BillerserviceService} from  '../../api/billerservice.service'
import{LoaderService} from '../../api/loader.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-otpapprove-biller',
  templateUrl: './otpapprovebiller.component.html',
  styleUrls: ['./otpapprovebiller.component.css']
})
export class OtpapproveBillerComponent implements OnInit {
  validateOPT: any = [];
  private approveBills: any;
  //public id: string;
  public ids: any = [];
  public txt1: any;
  public txt2: any;
  public txt3: any;
  public txt4: any;
  public txt5: any;
  constructor(private _location: Location , private router : Router,private billservice:BillerserviceService,private loaderService: LoaderService,private toastr: ToastrService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.otprepsonse();
  }

  backClicked() {
    this._location.back();
  }



  verifyOtp(){
    this.loaderService.display(true)
    if (!!this.txt1 && this.txt2 && this.txt3 && this.txt4 && this.txt5) {
      var checkOtp = this.txt1 + this.txt2 + this.txt3 + this.txt4 + this.txt5;
      console.log("OTP" + checkOtp);
      
    }
    else {
      this.loaderService.display(false)
      this.toastr.warning("Enter Otp first!!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }

    if (checkOtp.length == 5) {
      var checkOtp = this.txt1 + this.txt2 + this.txt3 + this.txt4 + this.txt5;
      this.billservice.validateOTP(checkOtp).then(resp => {
        this.approveBills = resp;
        if (!!this.approveBills.msg && this.approveBills.msg == "Bill successfully approved") {
          this.loaderService.display(false)
          this.router.navigate(['/main/successmsg'],{queryParams:{msg:'billapprsuccess'}});
        }
        else {
          this.loaderService.display(false)
          this.toastr.warning("Enter Correct Otp!!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      });

    }
    else {
      this.loaderService.display(false)
      this.toastr.warning("Enter Proper Otp!!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }

  private otprepsonse(){
    this.loaderService.display(true);
    this.ids = JSON.parse(this.route.snapshot.paramMap.get('ids'));
    this.billservice.sendOtp(this.ids).then(resp => {
      this.validateOPT = resp.data;
      console.log(resp.msg)
      if(resp.msg=='OTP disabled'){
        this.billservice.validateOTP(resp.msg).then(resp => {
          this.approveBills = resp;
          if (!!this.approveBills.msg && this.approveBills.msg == "Bill successfully approved") {
           
            this.router.navigate(['/main/successmsg'],{queryParams:{msg:'billapprsuccess'}});
            this.loaderService.display(false)
          }
          else {
            this.loaderService.display(false)
            this.toastr.warning("Failed to approve!!","Alert",{
              timeOut:3000,
              positionClass:'toast-top-center'
              })
          }
        }); 
      }else{
        this.loaderService.display(false);
      }
      // if(resp['venotpvalue']==0){
      //   this.loaderService.display(false);
      //   this.router.navigate(['/main/successmsg'],{queryParams:{msg:'supplierapprsuccess'}});
      // }
      
    },error=>{
      console.log(error)
      this.loaderService.display(false);
    });
  }
}
