import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-add-bill-payment',
  templateUrl: './add-bill-payment.component.html',
  styleUrls: ['./add-bill-payment.component.css']
})
export class AddBillPaymentComponent implements OnInit {
  billerList: any = [];
  paymentData:any = {};
  recentBiller:any= [];
  cardData:any=[];
  billerAcc:string;
  consumerNo:string;
  billerName:string;
  billerIfsc:string;
  billerBankName:string;
  billerBranchName:string;
  cardHolder:string=""
  cardNumber:string="";
  cardExpiry:string="";
  billerId:number;
  cardId:number;
  activecard:string="activeCard"
  charArray:any=[];
  sIndex: number = null;
  /**filtered Supplier based on character */
  filteredBillers:any[];
  currenCard :number=-1;
  cardSelect:boolean=false;
  selectedItem:number;
  activeElement :number;
  activeSupEle:number;
  approvedcards:any=[];
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  tick2:boolean=false;
  tick3:boolean=false;
  tick4:boolean=false;
  selectbiller:boolean=false;
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.setCharArray()
    this.loadApprovedCards()
    this.recentBiller=[
      {
         "id":123,
         "name":"Maharashtra State Electricity",
         "consumer_no":"3425436436",
      },
     
   ]

   this.billerList=[
    {
      "consumer_no":"3425436436",
      "biller_name":"Maharashtra State Electricity",
      "state":"Maharashtra",
      "parameter1":"Consumer No",
      "parameter2":"BU Code Name",
      "bu_code_bu_name":"4323 Sn/Dn.",
      "account_no":"34546645756",
      "bank":"State Bank of India",
      "branch_name":"Panki",
      "ifsc":"SBIN0011607",
      "id":123


    }
 ]
 this.loadSuppliers()
  }

    /**
   * onchange of alphabet
   */

  gotostep2(){
    if(this.selectbiller==true){
      this.step1=false;
      this.step2=true;
      this.step3=false;
    }else{
      this.toastr.warning("Please Select Supplier first!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  
  }
  gotostep1(){
    this.step1=true;
    this.step2=false;
    this.step3=false;
  }

  gotostep3(){
  
      if(this.paymentData['amount'].includes(',')){
        this.toastr.warning("Comma Separated Amount is not allowed!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }else{
        this.step1=false;
        this.step2=false;
        this.step3=true;
      }
 
   
  }

  private loadSuppliers(){
    //this.loaderService.display(true);
    //this.supplierservice.getSuppliers().subscribe(data=>{
    //  this.supplyList=data['data'].filter(supplier=>(supplier["status"]=="Approved"))
  
      this.filteredBillers=this.billerList
      
      console.log("This Supplier List")
      console.log(this.billerList)
      //this.loaderService.display(false);
    // },error=>{
    //   console.log(error)
    // })
  }  

  filterBillerByChar(character:string){
    this.filteredBillers=[];
    this.filteredBillers = this.billerList.filter(biller =>{

       return (biller['biller_name'][0].toUpperCase() == character)
     })
    
     console.log("here comes filtered suppliers")
     console.log(this.filteredBillers)
  }

  nextChar(c) {
   return String.fromCharCode(c.charCodeAt(0) + 1);
 }

 setCharArray(){
   this.charArray.push('A');
   var tempNextChar='A'
   for(var i=0;i<25;i++){
     tempNextChar= this.nextChar(tempNextChar)
     this.charArray.push(tempNextChar)
   }


   console.log('Here is char array')
 }

 listClick(event, newValue) {
   console.log(newValue);
   this.selectedItem = newValue;  // don't forget to update the model here
   // ... do other stuff here ...
}

changeSupColor(id:number){
  this.activeSupEle = id;
}

private loadApprovedCards(){

  this.currenCard=-1;
//  this.cardservice.getAll().subscribe(data=>{
    //console.log(data["data"])
  //  this.cardData=data["data"]
    
  //   for(let i = 0; i < this.cardData.length; i++){
  //     if(this.cardData[i].status == 1){
  //         this.approvedcards.push(this.cardData[i]);
  //     }
  // }
  this.approvedcards=[
    {
       "expirydate":"03/22",
       "aprovedtime":"02:42 PM",
       "cardfulldigits":"1323353535453653",
       "approvedby":"Mr. Parth Vaishanav",
       "cardholder":"Sample Card",
       "orgid":262,
       "initiatedtime":"02:40 PM",
       "aproveddate":"31-05-2020",
       "digits":"1323 XXXX XXXX 3653",
       "id":186,
       "initiateddate":"31-05-2020",
       "initiatedby":"Mr. Rajesh Gohil",
       "regcmt":"",
       "status":1
    },
    {
      "expirydate":"03/22",
      "aprovedtime":"02:42 PM",
      "cardfulldigits":"2334353535452322",
      "approvedby":"Mr. Parth Vaishanav",
      "cardholder":"Sample Card",
      "orgid":262,
      "initiatedtime":"02:40 PM",
      "aproveddate":"31-05-2020",
      "digits":"2334 XXXX XXXX 2322",
      "id":187,
      "initiateddate":"31-05-2020",
      "initiatedby":"Mr. Rajesh Gohil",
      "regcmt":"",
      "status":1
   }
 ]

  console.log(this.approvedcards)

    if(this.currenCard ==-1){
      this.activeElement=this.approvedcards[0]["id"]
      this.cardById(this.approvedcards[0]["id"]);
    }
  // },error=>{
  //   console.log(error)
  // })
}

cardById(id:number){

 // this.paymentservice.getCardById(id).subscribe(data=>{
    console.log("This Card List by Id")
   // console.log(data)
    var data={
      "msg":"succes",
      "code":"OK",
      "data":[
         {
            "expirydate":"03/22",
            "aprovedtime":"02:42 PM",
            "approvedby":"Mr. Parth Vaishanav",
            "cardholder":"Sample Card",
            "orgid":262,
            "initiatedtime":"02:40 PM",
            "aproveddate":"31-05-2020",
            "digits":"1323 XXXX XXXX 3653",
            "id":186,
            "initiateddate":"31-05-2020",
            "initiatedby":"Mr. Rajesh Gohil",
            "regcmt":"",
            "status":1
         }
      ]
   }

    this.cardNumber=data['data'][0]['digits']
    this.cardHolder=data['data'][0]['cardholder']
    this.cardExpiry=data['data'][0]['expirydate']
    this.cardId=data['data'][0]['id']
    console.log(this.cardNumber+" "+this.cardHolder+" "+this.cardExpiry+" "+this.cardId)
    this.activeElement = id;
  // },error=>{
  //   console.log(error)
  // })
}

billerById(id:number){
  this.selectbiller=true;
      //this.paymentservice.getSupplierById(id).subscribe(data=>{
      
       
        for(var resp of this.filteredBillers){
          if(resp['id']==id){
            this.billerName=resp['biller_name']
            this.consumerNo=resp['consumer_no']
            this.billerAcc=resp['account_no']
            this.billerBankName=resp['bank']
            this.billerBranchName=resp['branch']
            this.billerIfsc=resp['ifsc']
            this.billerId=resp['id']
          }
        }
        
       
      // },error=>{
      //   console.log(error)
      // })
    }
  

}
