import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// import { UserApproveOTPService } from './asuserapproveotp.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import{LoaderService} from '../../api/loader.service';
import {RuleserviceService} from '../../api/ruleservice.service'
@Component({
  selector: 'app-otp-rule',
  templateUrl: './otp-rule.component.html',
  styleUrls: ['./otp-rule.component.css']
})
export class OtpRuleComponent implements OnInit {
  validateOTP: any = [];
  public approvedPayment: any;
  //public id: string;
  public ids: any = [];
  public txt1: any;
  public txt2: any;
  public txt3: any;
  public txt4: any;
  public txt5: any;
  constructor(private route: ActivatedRoute, private router: Router,private loader:LoaderService,private ruleservice: RuleserviceService) { }

  ngOnInit() {
    this.loader.display(true);
    this.ids = JSON.parse(this.route.snapshot.paramMap.get('ids'));
    this.ruleservice.sendOtp(this.ids).then(resp => {
      this.validateOTP = resp.data;
      if(resp['userotpvalue']==1){
        this.loader.display(false);
        this.router.navigate(['/main/successmsg'],{queryParams:{msg:'ruleapprsuccess'}});
      }
      this.loader.display(false);
    });
    // this.router.navigate(['/main/successmsg'],{queryParams:{msg:'ruleapprsuccess'}});
    // this.loader.display(false);
  }

  gotoValidateOTP(): void {
    this.loader.display(true);
    if (!!this.txt1 && this.txt2 && this.txt3 && this.txt4 && this.txt5) {
      var checkOtp = this.txt1 + this.txt2 + this.txt3 + this.txt4 + this.txt5;
      console.log("OTP" + checkOtp);
    }
    else {
      this.loader.display(false);
      alert("Enter otp");
    }

    if (checkOtp.length == 5) {
      var checkOtp = this.txt1 + this.txt2 + this.txt3 + this.txt4 + this.txt5;
      this.ruleservice.validateOTP(checkOtp).then(resp => {
        this.approvedPayment = resp.data;
        if (!!this.approvedPayment && this.approvedPayment == "otp validated") {
          this.loader.display(false);
         this.router.navigate(['/main/successmsg'],{queryParams:{msg:'ruleapprsuccess'}});
        } else {
          this.loader.display(false);
          alert("Enter correct OTP");
        }
      });
      
      //this.loader.display(false);
    }
    else {
      this.loader.display(false);
      alert("Enter proper OTP");
    }

  }

}
