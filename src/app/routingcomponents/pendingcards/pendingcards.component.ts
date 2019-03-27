import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import * as $ from 'jquery';
// import { AsCardsService } from './asapprovecard.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-pendingcards',
  templateUrl: './pendingcards.component.html',
  styleUrls: ['./pendingcards.component.css']
})
export class PendingcardsComponent implements OnInit {
  public temp: any;
  public rejectedgroupdata: any;
  public rejectedgroupmsg: any;
  public pendingCards: any;
  public pendingCardsid: any;
  public comment: any;
  public currentCard: any;
  public newpendingcards:any = [];
  displayrejmodal:string='none';
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentCard = 0;
    this.newpendingcards=[{approvedby: "",
    aproveddate: "",
    aprovedtime: "",
    cardholder: "Test card 4",
    digits: "4859 XXXX XXXX 4321",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "03:45 PM",
    orgid: 73,
    regcmt: "",
    status: 2},
    {
      approvedby: "",
  aproveddate: "",
  aprovedtime: "",
  cardholder: "Test Card 1",
  digits: "4859 xxxx xxxx 2324",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "05:32 PM",
  orgid: 73,
  regcmt: "",
  status: 2
    }];
    console.log(this.newpendingcards)
  }

  navigateNext() {
    this.router.navigate(['../paymentapproveotp']);
  }

  gotoOTP(id: any): void {
    // if (!!this.pendingCardsid) { 
    this.router.navigate(['/main/otp-card'],{queryParams:{ids:id}});
    // } else {
    //   alert("First select at least one checkbox.");
    // }
  }

  goToNextCard() {
    if (this.newpendingcards.length - 1 == this.currentCard) {
      this.currentCard = 0;
    }
    else {
      this.currentCard++;
    }

  }

  goToPrevCard() {
    if (this.currentCard == 0) {
      this.currentCard = this.newpendingcards.length - 1;
    }
    else {
      this.currentCard--;
    }
  }

  rejectGroupById(id: any): void {
    // this.asCardsService.rejectedCard(id, this.comment).then(resp => {
    //   this.rejectedgroupdata = resp.data;
    //   this.rejectedgroupmsg = resp.msg;
    //   if (this.rejectedgroupmsg == "succes") {
    //     this.router.navigate(['/ascards']);
    //   }
    // });
    this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'cardreject'}});
  }

  openrejmod(){
    this.displayrejmodal='block'
  }
  closerehmod(){
    this.displayrejmodal='none'
  }
}
