import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlCarousel } from 'ngx-owl-carousel';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { Router,ActivatedRoute } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'

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
  todate:Date = new Date();
  fromdate:Date = new Date();
  displayWelcomModal:string='none'
  userdata:any={};
  username:string="deepali.patekar@axisbank.com"
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
}
public utilityparams:string;
public params:string;
rolename:any;

  public currentCard: any=0;
  approvedcard:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019",
    aprovedtime: "12:10:52",
    cardholder: "Test card",
    digits: "4859 XXXX XXXX 0005",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "12:09:38",
    orgid: 73,
    regcmt: "",
    status: 1},
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019",
  aprovedtime: "19:17:24",
  cardholder: "Test Card 1",
  digits: "4859 xxxx xxxx 0047",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "17:30:29",
  orgid: 73,
  regcmt: "",
  status: 1
    }
  ]
  constructor(private httpService: HttpClient,private router: Router,private activatedRoute: ActivatedRoute,private usrservice:UserserviceService) { }

  ngOnInit() {
    this.getUserDetail()
   // this.rolename=localStorage.getItem('rolename')
    this.params = this.activatedRoute.snapshot.queryParams["msg"];
    console.log(this.rolename)
    if(this.params=='firstloginas'){
   
      this.displayWelcomModal='block'
    
    }

    this.loadallcards()
   
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
  this.carddata=[{
    "cardnumber": "1232323433331234",
    "cardholder": "Sample",
    "valid": "09/11"
  },
{

    "cardnumber": "2323243254643634",
    "cardholder": "test",
    "valid": "26/11"
}]

this.billdata=JSON.parse(localStorage.getItem('billdetails'));
      this.paymentdata=JSON.parse(localStorage.getItem('payments'));
      console.log(this.billdata)
      if(this.billdata!=null){
      this.pendingbillers = this.billdata.filter((data)=>data['status']=='Pending with checker');
      this.apprbillers = this.billdata.filter((data)=>data['status']=='Registered');
      this.rejbillers = this.billdata.filter((data)=>data['status']=='Rejected');
      if(this.pendingbillers==null){
        this.billerlength=0
      
      }else{
        this.billerlength=this.pendingbillers.length;
      }
      if(this.apprbillers==null){
        this.apprbilllength=0
      }else{
        this.apprbilllength=this.apprbillers.length;
      }
      if(this.rejbillers==null){
        this.rejbilllength=0
      }else{
        this.rejbilllength=this.rejbillers.length;
      }
    }else{
      this.billerlength=0
      this.apprbilllength=0
      this.rejbilllength=0
    }
    if(this.paymentdata!=null){
      this.penPaydata = this.paymentdata.filter((data)=>data['status']=='Pending');
      this.apprPaydata = this.paymentdata.filter((data)=>data['status']=='Approved');
      this.rejPayData = this.paymentdata.filter((data)=>data['status']=='Rejected');
      console.log(this.apprPaydata)
      if(this.penPaydata==null){
        this.penpaylength=0
      }else{
        this.penpaylength=this.penPaydata.length; 
      }
      if(this.apprPaydata==null){
        this.apprpaylength=0
      }else{
        this.apprpaylength=this.apprPaydata.length; 
      }
      if(this.rejPayData==null){
        this.rejpaylength=0
      }else{
        this.rejpaylength=this.rejPayData.length; 
      }
    }else{
  this.penpaylength=0
  this.apprpaylength=0
  this.rejpaylength=0
    }
}

private getUserDetail(){
  this.usrservice.getUserDetails().subscribe(res=>{
    //console.log(res)
    this.userdata=res['Data'];
    console.log(this.userdata)
    this.rolename=this.userdata['dualrole']
  },error=>{
    console.log(error)
  })
    }


}
