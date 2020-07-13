import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{LoaderService} from '../../api/loader.service'
// import * as $ from 'jquery';
 import { CardserviceService } from '../../api/cardservice.service';
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
  constructor(private router: Router,private cardservice: CardserviceService,private loader: LoaderService) { }

  ngOnInit() {
    this.currentCard = 0;
this.loadpendingcards();

    console.log(this.newpendingcards)
  }

  navigateNext() {
    this.router.navigate(['../paymentapproveotp']);
  }

  gotoOTP(id: any): void {
    // if (!!this.pendingCardsid) { 
    this.router.navigate(['/main/otp-card',id]);
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
    this.loader.display(true)
    this.cardservice.rejectedCard(id, this.comment).then(resp => {
      this.rejectedgroupdata = resp.data;
      this.rejectedgroupmsg = resp.msg;
      if (this.rejectedgroupmsg == "succes") {
        this.loader.display(false)
         this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'cardreject'}});
      }else{
        this.loader.display(false)
        console.log("Something went wrong")
      }
    },error=>{
      console.log(error)
      this.loader.display(false)
    });
   // this.router.navigate(['/main/rejectmsg'],{queryParams:{msg:'cardreject'}});
  }

  openrejmod(){
    this.displayrejmodal='block'
  }
  closerehmod(){
    this.displayrejmodal='none'
  }


  private loadpendingcards(){
    this.loader.display(true)
    this.cardservice.getAllCards().then(resp => {
      this.pendingCards = resp.data;
      if(this.pendingCards!=null){
        
      for (let i = 0; i < this.pendingCards.length; i++) {
        if (this.pendingCards[i].status == "Pending") {
          this.newpendingcards.push(this.pendingCards[i]);
        }
      }
      this.loader.display(false)
    }else{
      
      this.loader.display(false)
    }
     
    },error=>{
      console.log(error)
      this.loader.display(false)
    });
  }
}
