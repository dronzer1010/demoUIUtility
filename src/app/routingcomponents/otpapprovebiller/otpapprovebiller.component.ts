import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import{Router} from '@angular/router';
@Component({
  selector: 'app-otpapprove-biller',
  templateUrl: './otpapprovebiller.component.html',
  styleUrls: ['./otpapprovebiller.component.css']
})
export class OtpapproveBillerComponent implements OnInit {

  constructor(private _location: Location , private router : Router) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

  verifyOtp(){
    var bills = JSON.parse(localStorage.getItem('billdetails'));
    var pendingBills = JSON.parse(localStorage.getItem('selectedBillers'));

    for(var i=0;i<pendingBills.length;i++){
      for(var j=0;j<bills.length;j++){
        if(pendingBills[i]==bills[j].id){
          bills[j].status ="Approved";
          bills[j].approvedby="Ms. Deepali Patekar"
          var d =new Date();
          bills[j].approvedon=d.toLocaleString();
        }
      }
    }

     localStorage.setItem('billdetails', JSON.stringify(bills));

    this.router.navigate(['pending-biller'], { queryParams: { otp: 'success' } })


  }

}
