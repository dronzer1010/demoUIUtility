import { Component, OnInit } from '@angular/core';

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
    apprcrd:boolean=true;
    rejcrd:boolean=false;
    pencrd=false;
    rolename:any;
  constructor() { }

  ngOnInit() {
    this.rolename=localStorage.getItem('rolename')
this.loadApprovedcards()
this.loadPendingcards()
this.loadRejectedcards()
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

  private loadApprovedcards(){
    this.approvedcards=[
      {approvedby: "Mr. K.V. Hebbar",
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
        approvedby: "Mr. K.V. Hebbar",
    aproveddate: "28-02-2019",
    aprovedtime: "07:17 PM",
    cardholder: "Test Card 1",
    digits: "4859 XXXX XXXX 0047",
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

    for(let data of this.approvedcards){
      var obj={
        approvedby:data['approvedby'],
        aproveddate:data['aproveddate'],
        aprovedtime:data['aprovedtime'],
        cardholder:data['cardholder'],
        expirymonth:data['expirydate'].split("/")[0],
        expiryyear:data['expirydate'].split("/")[1],
        digits:data['digits'],
        initiatedby:data['initiatedby'],
        initiateddate:data['initiateddate'],
        initiatedtime:data['initiatedtime'],
        orgid:data['orgid'],
        regcmt:data['regcmt'],
        status:data['status'],
        id:data['id']
      }
      this.cardapproved.push(obj)
    }
  }
  private loadRejectedcards(){
    this.rejectedcards=[
      {approvedby: "Mr. K.V. Hebbar",
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
        approvedby: "Mr. K.V. Hebbar",
    aproveddate: "28-02-2019",
    aprovedtime: "08:17 PM",
    cardholder: "Test Card 1",
    digits: "4859 XXXX XXXX 9864",
    expirydate: "06/22",
    id: 2,
    initiatedby: "Mr. Naveen Lohiya",
    initiateddate: "28-02-2019",
    initiatedtime: "06:21 PM",
    orgid: 73,
    regcmt: "invalid Card Details",
    status: 0
      }];

    for(let data of this.rejectedcards){
      var obj={
        approvedby:data['approvedby'],
        aproveddate:data['aproveddate'],
        aprovedtime:data['aprovedtime'],
        cardholder:data['cardholder'],
        expirymonth:data['expirydate'].split("/")[0],
        expiryyear:data['expirydate'].split("/")[1],
        digits:data['digits'],
        initiatedby:data['initiatedby'],
        initiateddate:data['initiateddate'],
        initiatedtime:data['initiatedtime'],
        orgid:data['orgid'],
        regcmt:data['regcmt'],
        status:data['status'],
        id:data['id']
      }
      this.cardRejected.push(obj)
    }
  }

  private loadPendingcards(){
    this.pendingcards=[{approvedby: "",
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
  digits: "4859 XXXX XXXX 2324",
  expirydate: "06/22",
  id: 2,
  initiatedby: "Mr. Naveen Lohiya",
  initiateddate: "28-02-2019",
  initiatedtime: "05:32 PM",
  orgid: 73,
  regcmt: "",
  status: 2
    }];

    for(let data of this.pendingcards){
      var obj={
        approvedby:data['approvedby'],
        aproveddate:data['aproveddate'],
        aprovedtime:data['aprovedtime'],
        cardholder:data['cardholder'],
        expirymonth:data['expirydate'].split("/")[0],
        expiryyear:data['expirydate'].split("/")[1],
        digits:data['digits'],
        initiatedby:data['initiatedby'],
        initiateddate:data['initiateddate'],
        initiatedtime:data['initiatedtime'],
        orgid:data['orgid'],
        regcmt:data['regcmt'],
        status:data['status'],
        id:data['id']
      }
      this.cardpending.push(obj)
    }
  }

}
