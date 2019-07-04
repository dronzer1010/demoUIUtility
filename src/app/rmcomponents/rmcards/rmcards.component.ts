import { Component, OnInit } from '@angular/core';
import {RmservicesService} from '../../api/rmservices.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rmcards',
  templateUrl: './rmcards.component.html',
  styleUrls: ['./rmcards.component.css']
})
export class RmcardsComponent implements OnInit {
  public approvedcards: any = [];
  public pendingcards: any = [];
  public rejectcards: any = [];
  expirymonth:any;
  expiryyear:any;
  activeTab:string;
  cards:any=[];
  apprcrd:boolean=true;
  rejcrd:boolean=false;
  pencrd=false;
  rolename:any;
  public id: string;
  constructor(private route: ActivatedRoute,private rmservice: RmservicesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadpendingcards();
  }

  private loadpendingcards(){
    this.rmservice.getAllCards(this.id).then(resp => {
      this.cards = resp.data;
      console.log(this.cards)
      for(let i = 0; i < this.cards.length; i++){
          if(this.cards[i].status == "Approved"){
              this.approvedcards.push(this.cards[i]);
          }
      }
      for(let i = 0; i < this.cards.length; i++){
          if(this.cards[i].status == "Pending"){
              this.pendingcards.push(this.cards[i]);
          }
      }
      for(let i = 0; i < this.cards.length; i++){
          if(this.cards[i].status == "Rejected"){
              this.rejectcards.push(this.cards[i]);
          }
      }
  });
  }

  apprcard(){
    this.rejcrd=false;
    this.apprcrd=true;
    this.pencrd=false;

  }

  pencard(){
    this.rejcrd=false;
    this.apprcrd=false;
    this.pencrd=true;

  }

  rejcard(){
    this.rejcrd=true;
    this.apprcrd=false;
    this.pencrd=false;

  }


}
