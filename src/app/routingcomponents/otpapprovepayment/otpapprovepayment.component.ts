import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import{Router,ActivatedRoute} from '@angular/router';
import{LoaderService} from '../../api/loader.service'
import {UserserviceService} from '../../api/userservice.service'
import {PaymentserviceService} from '../../api/paymentservice.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-otpapprove-payment',
  templateUrl: './otpapprovepayment.component.html',
  styleUrls: ['./otpapprovepayment.component.css']
})
export class OtpapprovePaymentComponent implements OnInit {
  validateOPT: any = [];
  private approvePayments: any;
  //public id: string;
  public ids: any = [];
  public txt1: any;
  public txt2: any;
  public txt3: any;
  public txt4: any;
  public txt5: any;
  userdata:any=[];
  constructor(private _location: Location , private router : Router,private userservice:UserserviceService,private loaderService: LoaderService,private paymentservice: PaymentserviceService,private toastr: ToastrService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.otprepsonse();
  
  }

  backClicked() {
    this._location.back();
  }

  private getuserdetails(){
    this.userservice.getUserDetails().subscribe(resp=>{
     
      this.userdata=resp['Data']
      console.log(this.userdata)
    },error=>{
      console.log(error)
    })
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
      if(this.userdata['isseq']==0){
      this.paymentservice.validateOTP(checkOtp).then(resp => {
        this.approvePayments = resp;
        if (!!this.approvePayments.msg && this.approvePayments.msg == "Payments Approved") {
          this.loaderService.display(false)
          this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentapprsuccess'}});
        }
        else {
          this.loaderService.display(false)
          this.toastr.warning("Enter Correct Otp!!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      });
    }else if(this.userdata['isseq']==1){
      this.paymentservice.validateOTPSeq(checkOtp).then(resp => {
        this.approvePayments = resp;
        if (!!this.approvePayments.msg && (this.approvePayments.msg == "Payments Approved" || this.approvePayments.msg == "Payment added successfully")) {
          this.loaderService.display(false)
          this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentapprsuccess'}});
        }
        else {
          this.loaderService.display(false)
          this.toastr.warning("Enter Correct Otp!!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
      });
    }else{
      this.loaderService.display(false)
      this.toastr.error("Internal Server Error!!","Alert",{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }

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
    this.getuserdetails();
    this.ids = JSON.parse(this.route.snapshot.paramMap.get('ids'));
    this.paymentservice.sendOtp(this.ids).then(resp => {
      this.validateOPT = resp.data;
      console.log(resp)
      if(resp['msg']=='OTP disabled'){
        if(this.userdata['isseq']==0){
          this.paymentservice.validateOTP(resp['msg']).then(resp => {
            this.approvePayments = resp;
            if (!!this.approvePayments.msg && this.approvePayments.msg == "Payments Approved") {
              this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentapprsuccess'}});
              this.loaderService.display(false)
            }
            else {
              this.loaderService.display(false)
              this.toastr.warning("Failed to approve payments!!","Alert",{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
            }
          });
        }else if(this.userdata['isseq']==1){
          this.paymentservice.validateOTPSeq(resp['msg']).then(resp => {
            this.approvePayments = resp;
            if (!!this.approvePayments.msg && (this.approvePayments.msg == "Payments Approved" || this.approvePayments.msg == "Payment added successfully")) {
              this.router.navigate(['/main/successmsg'],{queryParams:{msg:'paymentapprsuccess'}});
              this.loaderService.display(false)
            }
            else {
              this.loaderService.display(false)
              this.toastr.warning("Failed to approve payments!!","Alert",{
                timeOut:3000,
                positionClass:'toast-top-center'
                })
            }
          });
        }else{
          this.loaderService.display(false)
          this.toastr.error("Internal Server Error!!","Alert",{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }
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
