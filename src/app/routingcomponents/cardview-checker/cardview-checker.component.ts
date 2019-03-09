import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardview-checker',
  templateUrl: './cardview-checker.component.html',
  styleUrls: ['./cardview-checker.component.css']
})
export class CardviewCheckerComponent implements OnInit {
  activeTab:string;
  pendingcards:any=[{approvedby: "",
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
  approvedcards:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019",
    aprovedtime: "12:10 PM",
    cardholder: "Test card 5",
    digits: "4859 XXXX XXXX 0005",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "12:09 PM",
    orgid: 73,
    regcmt: "",
    status: 1},
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019",
  aprovedtime: "07:17 PM",
  cardholder: "Test Card 1",
  digits: "4859 xxxx xxxx 0047",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "05:30 PM",
  orgid: 73,
  regcmt: "",
  status: 1
    }
  ];
  rejectedcards:any=[
    {approvedby: "Mr. K.V. HEBBAR",
    aproveddate: "28-02-2019",
    aprovedtime: "04:23 PM",
    cardholder: "Test card 5",
    digits: "4859 XXXX XXXX 6564",
    expirydate: "09/22",
    id: 1,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "12:09 PM",
    orgid: 73,
    regcmt: "Invalid Expiry",
    status: 0},
    {
      approvedby: "Mr. K.V. HEBBAR",
  aproveddate: "28-02-2019",
  aprovedtime: "08:17 PM",
  cardholder: "Test Card 1",
  digits: "4859 xxxx xxxx 9864",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "06:21 PM",
  orgid: 73,
  regcmt: "invalid Card Details",
  status: 0
    }];
    apprcrd:boolean=true;
    rejcrd:boolean=false;
    pencrd:boolean=false;
  constructor() { }

  ngOnInit() {
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
