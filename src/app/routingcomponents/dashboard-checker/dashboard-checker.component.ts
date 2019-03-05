import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlCarousel } from 'ngx-owl-carousel';


@Component({
  selector: 'app-dashboard-checker',
  templateUrl: './dashboard-checker.component.html',
  styleUrls: ['./dashboard-checker.component.css']
})
export class DashboardCheckerComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  carddata:any;
  billdata:any=[];
  pendingbillers:any=[];
  billerlength:number=0;
  public currentCard: any=0;
  approvedcard:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019",
    aprovedtime: "12:10:52",
    cardholder: "Qqwqwqw",
    digits: "3354xxxx xxxx8553",
    expirydate: "04/21",
    id: 203,
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
  cardholder: "Anurag",
  digits: "6777xxxx xxxx6879",
  expirydate: "06/21",
  id: 205,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "17:30:29",
  orgid: 73,
  regcmt: "",
  status: 1
    },
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019",
  aprovedtime: "19:20:40",
  cardholder: "Annu",
  digits: "9865xxxx xxxx7909",
  expirydate: "06/24",
  id: 206,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "17:30:42",
  orgid: 73,
  regcmt: "",
  status: 1
    }
  ]
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('./assets/cards.json').subscribe(data=>{
      this.carddata=data;
      console.log(this.carddata)
      this.billdata=JSON.parse(localStorage.getItem('billdetails'));
      console.log(this.billdata)
      this.pendingbillers = this.billdata.filter((data)=>data['status']=='Pending');
      if(this.pendingbillers==null){
        this.billerlength=0
      
      }else{
        this.billerlength=this.pendingbillers.length;
        
      }
    })
  }
  fun() {
    this.owlElement.next([200])
    //duration 200ms
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
}
