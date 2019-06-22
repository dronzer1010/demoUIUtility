import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// import { UserApproveOTPService } from './asuserapproveotp.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import{LoaderService} from '../../api/loader.service';
import { GroupserviceService } from '../../api/groupservice.service'
import {Location} from '@angular/common';
@Component({
  selector: 'app-otp-group',
  templateUrl: './otp-group.component.html',
  styleUrls: ['./otp-group.component.css']
})
export class OtpGroupComponent implements OnInit {
  validateOTP: any = [];
  public approvedPayment: any;
  //public id: string;
  public ids: any = [];
  public txt1: any;
  public txt2: any;
  public txt3: any;
  public txt4: any;
  public txt5: any;
  constructor(private _location: Location,private route: ActivatedRoute, private router: Router,private loader:LoaderService,private groupservice : GroupserviceService) { }

  ngOnInit() {
    this.loader.display(true);
    this.ids = JSON.parse(this.route.snapshot.paramMap.get('ids'));
    this.groupservice.sendOtp(this.ids).then(resp => {
      this.validateOTP = resp.data;
      if(resp['groupotpvalue']==1){
        this.loader.display(false);
        this.router.navigate(['/main/successmsg'],{queryParams:{msg:'grpapprsuccess'}});
      }
      this.loader.display(false);
    });
    // this.router.navigate(['/main/userview']);
    // this.loader.display(false);
  }

  backClicked() {
    this._location.back();
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
      this.groupservice.validateOTP(checkOtp).then(resp => {
        this.approvedPayment = resp.data;
        if (!!this.approvedPayment && this.approvedPayment == "otp validated") {
          this.loader.display(false);
           this.router.navigate(['/main/successmsg'],{queryParams:{msg:'grpapprsuccess'}});
        } else {
          this.loader.display(false);
          alert("Enter correct OTP");
        }
      });
     // this.router.navigate(['/main/successmsg'],{queryParams:{msg:'grpapprsuccess'}});
     // this.loader.display(false);
    }
    else {
      this.loader.display(false);
      alert("Enter proper OTP");
    }

  }

}
