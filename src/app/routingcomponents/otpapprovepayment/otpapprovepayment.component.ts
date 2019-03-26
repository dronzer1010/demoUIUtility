import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import{Router} from '@angular/router';
@Component({
  selector: 'app-otpapprove-payment',
  templateUrl: './otpapprovepayment.component.html',
  styleUrls: ['./otpapprovepayment.component.css']
})
export class OtpapprovePaymentComponent implements OnInit {

  constructor(private _location: Location , private router : Router) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

  verifyOtp(){
    var payments = JSON.parse(localStorage.getItem('payments'));
    var pendingPayments = JSON.parse(localStorage.getItem('selectedPayments'));

    for(var i=0;i<pendingPayments.length;i++){
      for(var j=0;j<payments.length;j++){
        if(pendingPayments[i]==payments[j].id){
          payments[j].status ="Approved";
          payments[j].paymentstatus ="Card Debited";
          payments[j].approvedby="Ms. Deepali Patekar"
          var d =new Date();
          payments[j].approvedon=d.toLocaleString();
        }
      }
    }

     localStorage.setItem('payments', JSON.stringify(payments));

    this.router.navigate(['main/maker-payment-list'], { queryParams: { otp: 'success' } })


  }

}
