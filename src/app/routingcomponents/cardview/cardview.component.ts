import { Component, OnInit } from '@angular/core';
import {CardserviceService} from '../../api/cardservice.service'
import{LoaderService} from '../../api/loader.service';
import {UserserviceService} from '../../api/userservice.service'
@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.css']
})
export class CardviewComponent implements OnInit {
  expirymonth:any;
  expiryyear:any;
  activeTab:string;
  pendingcards:any=[];
  cardpending:any=[];
  approvedcards:any=[];
  cardapproved:any=[];
  rejectedcards:any=[];
  cardRejected:any=[];
  userdata:any={};
  cards:any=[];
    apprcrd:boolean=true;
    rejcrd:boolean=false;
    pencrd=false;
    rolename:any;
  constructor(private cardservice: CardserviceService,private userservice: UserserviceService,private loader:LoaderService) { }

  ngOnInit() {
    this.getUserDetail();
    this.loadallcards();
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

  private getUserDetail(){
    this.userservice.getUserDetails().subscribe(res=>{
      //console.log(res)
      this.userdata=res['Data'];
      console.log(this.userdata)
      this.rolename=this.userdata['dualrole']
    },error=>{
      console.log(error)
    })
      }


      private loadallcards(){
        this.loader.display(true);
        this.cardservice.getAll().subscribe(data=>{
          
          this.cards=data["data"];
          console.log(this.cards)
          // this.pendingcards=data["data"]["pendingcards"];
          // this.rejectedcards=data["data"]["rejectedcards"]
          // this.approvedcards=data["data"]["approvedcards"]
          //console.log(this.approvedcards);
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
                this.rejectedcards.push(this.cards[i]);
            }
        }
        this.loader.display(false);
        },error=>{
          this.loader.display(false);
            console.log("Failed to Fetch")
        }
      
        )
      
      }
      
}
