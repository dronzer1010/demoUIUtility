import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-maker-make-payment',
  templateUrl: './maker-make-payment.component.html',
  styleUrls: ['./maker-make-payment.component.css']
})
export class MakerMakePaymentComponent implements OnInit {
  select=false;
  billertype:boolean=false;
  billdetails:boolean=true;
  conf:boolean=false;
  currenCard :number=-1;
  success:boolean=false;
  reviewCard:boolean=false;
  cardHolder:string=""
  cardNumber:string="";
  cardExpiry:string="";
  cardinitiatedby:string="";
  cardinitiatedon:string="";
  cardapprovedby:string="";
  cardapprovedon:string="";
  selectedcard:any={}
  public checkedValueArray: any = [];
  selectall:boolean=false;
  public temp: any;
  public cntChk: any;
  public flag: any;
  display='none'; 
  states:any;
  paymentData : any={};
  billers:any;
  billerlist:any=[];
  bills :any = [];
  payments:any=[];
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  activeElement :number;
  billDates=['6th' ,'6th' , '6th' , '6th' ,'6th','6th','6th']
  dueDates=['15th' ,'15th' , '15th' , '15th' ,'15th','15th','15th']
  fetchingBill=false;
  public currentCard: any=0;
  pendingPayments:any=[]
  approvedcard:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019 12:10 PM",
    aprovedtime: "12:10 PM",
    cardholder: "Test card",
    digits: "4859 XXXX XXXX 0005",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019 12:09 PM",
    initiatedtime: "12:09:38",
    orgid: 73,
    regcmt: "",
    status: 1},
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019 07:17 PM",
  aprovedtime: "07:17 PM",
  cardholder: "Test Card 1",
  digits: "4859 XXXX XXXX 0047",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019 17:30 PM",
  initiatedtime: "17:30:29",
  orgid: 73,
  regcmt: "",
  status: 1
    }
  ]
  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.billrdetails();
    this.getActivecard()
    this.fetchAllBills()
  }

  getActivecard(){
    this.currenCard=-1;
    if(this.currenCard ==-1){
      this.activeElement=1
      this.getCardbyId(1);
    }
    this.cardHolder="Test card"
    this.cardNumber="4859 XXXX XXXX 0005"
    this.cardExpiry="09/22"
    this.cardinitiatedby="Mr. Naveen Lohiya"
    this.cardinitiatedon="28-02-2019 12:09 PM"
    this.cardapprovedby="Mr. K.V. HEBBAR"
    this.cardapprovedon="28-02-2019 12:10 PM"
    
    this.selectedcard=this.approvedcard[0]
    console.log(this.selectedcard)
  }

  // goToNextCard() {
  //   if (this.approvedcard.length - 1 == this.currentCard) {
  //     this.currentCard = 0;
  //   }
  //   else {
  //     this.currentCard++;
  //   }
  
  // }
  
  // goToPrevCard() {
  //   if (this.currentCard == 0) {
  //     this.currentCard = this.approvedcard.length - 1;
  //   }
  //   else {
  //     this.currentCard--;
  //   }
  // }

  getBiller(stateid){
  
    this.httpService.get('./assets/billers.json').subscribe(
      data=>{
        this.billers=data;
        for(var i=0;i<this.billers.length;i++){
          if(this.billers[i]['code']==stateid){
            this.billerlist=[];
            this.billerlist=this.billers[i]['billers']
          }
        }
        console.log(this.billerlist)
       
      }
    )
  }

  openModalDialog(){
    this.display=''; //Set block css
 }
 closeModalDialog(){
  this.display='block'; //set none css after close dialog
 }
  billrdetails(){
    this.billertype=false;
    this.billdetails=true;
    this.reviewCard=false;

    var allBills = JSON.parse(localStorage.getItem('billdetails'));

    this.bills = allBills.filter((bill)=>{
      return (bill['status']=="Approved")
    })

    console.log(this.bills);
    this.payments = this.bills.map((bill)=>{
      var payment={};
      payment['id'] = bill.id;
      payment['amount']=null;
      payment['duedate']=null;
      payment['billnumber']=null;
      payment['bill']=bill;
      payment['status']=null;
      payment['initiatedby']=null;
      payment['initiatedon']=null;
      payment['approvedby']=null;
      payment['approvedon']=null;



      return payment;
    })

    console.log(this.payments);

  
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getCardDetails(card:any){
    //console.log(card)
    this.selectedcard=card;
    //this.approvedcard[this.currentCard]=card
    console.log(this.selectedcard)
    this.cardHolder=card['cardholder']
    this.cardNumber=card['digits']
    this.cardExpiry=card['expirydate']
    this.cardinitiatedby=card['initiatedby']
    this.cardinitiatedon=card['initiateddate']
    this.cardapprovedby=card['approvedby']
    this.cardapprovedon=card['aproveddate']
  }

  getCardbyId(id:number){
    console.log(id)
    this.activeElement = id;
  }


  fetchAllBills(){
    for(var i=0;i<this.payments.length;i++){
    
        var d =new Date();
        this.payments[i].amount = (Math.random()*(3000-1000)).toFixed(2);
        this.payments[i].duedate = this.dueDates[this.getRandomInt(7)];
        this.payments[i].billdate = this.billDates[this.getRandomInt(7)];
        this.payments[i].billnumber = d.getTime();
      
    }
  }


  fetchBill(id){
    console.log("hello")
    this.fetchingBill = true;
    for(var i=0;i<this.payments.length;i++){
      if(this.payments[i].id == id){
        var d =new Date();
        this.payments[i].amount = (Math.random()*(3000-1000)).toFixed(2);
        this.payments[i].duedate = this.dueDates[this.getRandomInt(7)];
        this.payments[i].billdate = this.billDates[this.getRandomInt(7)];
        this.payments[i].billnumber = d.getTime();
      }
    }
    this.fetchingBill = false;




    
  }


  changeAll(pendingbillerpage): void {
    
    if(this.checkedValueArray.length==this.payments.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.cntChk=0
    }
    console.log(this.selectall)
    if (this.cntChk == 0) {
      this.cntChk = 1;
      this.temp = true;
      this.selectall=true;
      this.select=true;
      for (var i = 0; i < pendingbillerpage.length; i++) {
        this.checkedValueArray[i] = pendingbillerpage[i].id;
      }
      this.cntChk = 0;
    }
   
    else {
      this.cntChk = 0;
      this.temp = false;
      this.checkedValueArray = [];
      this.select=false;
    }
    console.log(this.checkedValueArray)
  }

  change(id): void {
    this.flag = 0;
    for (var i = 0; i < this.checkedValueArray.length; i++) {
      if (this.checkedValueArray[i] == id) {
        this.checkedValueArray.splice(i, 1);
        this.flag = 1;
      }
    }
    if (this.flag == 0) {
      this.checkedValueArray.push(id);
     
    }

    if (this.checkedValueArray.length > 0) {
      this.temp = true;
      if(this.checkedValueArray.length<this.payments.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)
     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.payments.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)
     
    }
    console.log(this.checkedValueArray)
  }  





  cnfsend(){
    this.billdetails=false;
    this.conf=true;
    this.billertype=false;
   
    this.reviewCard=true;




    for(var i=0;i<this.payments.length;i++){
      for(var j=0;j<this.checkedValueArray.length;j++){
        if(this.payments[i].id == this.checkedValueArray[j]){
          this.pendingPayments.push(this.payments[i]);
        }
      }
    }
  }

  succesadd(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    this.success=true;
    this.reviewCard=false;



    var tempPendingPayments = this.pendingPayments.map((payment)=>{
      var card = this.selectedcard
      console.log(card)
      payment['status']='Pending';
      payment['paymentstatus']='Pending';
      payment['card']=card;
      return payment;
    });

    localStorage.setItem('payments' , JSON.stringify(tempPendingPayments));
  }

  backbilltype(){
    this.billdetails=false;
    this.billertype=true;
    this.conf=false;
    this.success=false;
    this.reviewCard=false;
  }

  backbilldetails(){
    this.billdetails=true;
    this.billertype=false;
    this.conf=false;
    this.success=false;
    this.reviewCard=false;
  }
  review(){
    this.billdetails=false;
    this.billertype=false;
    this.conf=false;
    this.success=false;
    this.reviewCard=true;
  }
}
