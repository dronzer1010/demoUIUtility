import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlCarousel } from 'ngx-owl-carousel';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { Router,ActivatedRoute } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'
import{CardserviceService} from '../../api/cardservice.service'
import{DashboardService} from '../../api/dashboard.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  carddata:any;
  filterQuery = "";
  rowsOnPage = 5;
  sortBy = "email";
  sortOrder = "asc";
  billdata:any=[];
  paymentdata:any=[];
  penPaydata:any=[];
  apprPaydata:any=[];
  rejPayData:any=[];
  pendingbillers:any=[];
  apprbillers:any=[];
  rejbillers:any=[];
  billerlength:number=0;
  apprbilllength:number=0;
  rejbilllength:number=0
  penpaylength:number=0;
  apprpaylength:number=0;
  rejpaylength:number=0
  checkerpenbilllen:number=0
  checkeraprbilllen:number=0
  checkerrejbilllen:number=0
  checkerpenpaylen:number=0
  checkeraprpaylen:number=0
  checkerrejpaylen:number=0
  todate:Date = new Date();
  fromdate:Date = new Date();
  displayWelcomModal:string='none'
  userdata:any={};
  username:string="Authorised Signatory"
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'MM-yyyy',
    defaultOpen: false
}
public utilityparams:string;
public params:string;
cardData:any=[];
rolename:any;
lastpayments:any=[];
  public currentCard: any=0;
  approvedcard:any=[]
  approverDetails:any=[];
selectedIndex = -1;
cardsize:any;
  constructor(private cards:CardserviceService,private httpService: HttpClient,private router: Router,private activatedRoute: ActivatedRoute,private usrservice:UserserviceService,private dashservice: DashboardService) { }

  ngOnInit() {
    this.getUserDetail()
   // this.rolename=localStorage.getItem('rolename')
    this.params = this.activatedRoute.snapshot.queryParams["msg"];
    console.log(this.rolename)
    if(this.params=='firstloginas'){
   
      this.displayWelcomModal='block'
    
    }
console.log(this.approvedcard)

   // this.loadallcards()
   this.lastpaymentsdetails()
   this.loadApprovedCards()
    // this.httpService.get('./assets/cards.json').subscribe(data=>{
    //   this.carddata=data;
    //   console.log(this.carddata)
     
      
    // })
  }
  fun() {
    this.owlElement.next([200])
    //duration 200ms
}

closemodal(){
  this.displayWelcomModal='none'; 
}

goToNextCard() {
  if (this.approvedcard.length - 1 == this.currentCard) {
    this.currentCard = 0;
  }
  else {
    this.currentCard++;
  }

}

goToPrevCard() {
  if (this.currentCard == 0) {
    this.currentCard = this.approvedcard.length - 1;
  }
  else {
    this.currentCard--;
  }
}

private loadallcards(){
 


}

private getUserDetail(){
  this.usrservice.getUserDetails().subscribe(res=>{
    //console.log(res)
    this.userdata=res['Data'];
    console.log(this.userdata)
    this.rolename=this.userdata['dualrole']
    this.username=this.userdata['firstname']+" "+this.userdata['lastname']
    if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
      this.getCheckerpayLength()
      this.getCheckerbillLength()
    }else if(this.rolename=='maker' || this.rolename=='as' || this.rolename=='ccmaker'){
      this.getDefpayLength()
      this.getDefbillLength()
    }
  },error=>{
    console.log(error)
  })
    }

    private loadApprovedCards(){

  
      this.dashservice.getAllCards().then(data=>{
        //console.log(data["data"])
       this.cardData=data["data"]
        console.log(this.cardData)
        for(let i = 0; i < this.cardData.length; i++){
          if(this.cardData[i].status == "Approved"){
              this.approvedcard.push(this.cardData[i]);
          }
      }

      if(this.cardData.length>0){
        this.cardsize=this.cardData.length
      }else{
        this.cardsize=0
      }
  
      console.log(this.approvedcard)
  
        // if(this.currenCard ==-1){
        //   this.activeElement=this.approvedcard[0]["id"]
        //   this.getCardbyId(this.approvedcard[0]["id"]);
        // }
      },error=>{
        console.log(error)
      })
    }

    private getDefbillLength(){
      this.dashservice.getbilldefaultcount().then(resp=>{
        console.log(resp)
        this.billerlength=resp['pending']
        this.apprbilllength=resp['registered']
        this.rejbilllength=resp['rejected']
      },error=>{
        console.log(error)
      })
    }

    private getDefpayLength(){
      this.dashservice.getpaydefaultcount().then(resp=>{
        console.log(resp)
        this.penpaylength=resp['pending']
        this.apprpaylength=resp['approved']
        this.rejpaylength=resp['rejected']
      },error=>{
        console.log(error)
      })
    }

    private getCheckerpayLength(){
      this.dashservice.getpaycheckercount().then(resp=>{
        this.penpaylength=resp['pending']
        this.apprpaylength=resp['approved']
        this.rejpaylength=resp['rejected']
      },error=>{
        console.log(error)
      })
    }

    private getCheckerbillLength(){
      this.dashservice.getbillcheckercount().then(resp=>{
        this.billerlength=resp['pending']
        this.apprbilllength=resp['registered']
        this.rejbilllength=resp['rejected']

      },error=>{
        console.log(error)
      })
    }

    gotpaymentview(){
      this.router.navigate(['/main/paymentlist']);
    }

    gotobillview(){
      this.router.navigate(['/main/billerlist']);
    }

    gotopenbillview(){
      if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
        this.router.navigate(['/main/pending-biller']);
      }else if(this.rolename=='maker' || this.rolename=='as' || this.rolename=='ccmaker'){
        this.router.navigate(['/main/billerlist']);
      }
      
    }

    gotopenpayview(){
      if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
        this.router.navigate(['/main/pending-payments']);
      }else if(this.rolename=='maker' || this.rolename=='as' || this.rolename=='ccmaker'){
        this.router.navigate(['/main/paymentlist']);
      }
      
    }

    private lastpaymentsdetails(){
      this.dashservice.getlast5payments().then(resp=>{
        console.log(resp)
        this.apprPaydata=resp['data']
      },error=>{
        console.log(error)
      })
    }

    getapproverdetails(id,index){
      this.selectedIndex = index;
      this.dashservice.paylogs(id).then(resp=>{
        console.log(resp)
        this.approverDetails=resp['data']
        console.log(this.approverDetails)
      },error=>{
        console.log(error)
      })
  
    }


}
