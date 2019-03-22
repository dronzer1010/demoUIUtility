import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  orgdata:any={};
  address:string;
  city:string;
  state:string;
  constructor() { }

  ngOnInit() {
    this.orgdata={"id":66,"bankacc":null,"regdate":"2018-01-08 10:01:16.000","companyname":"Axis Bank Ltd","address":"Axis house, Wadia International Center, Parel","contact":"04443925300","city":"Mumbai","state":"Maharashtra","pincode":"600004","tin":null,"pan":"AAACS7703H","domain":"www.axisbank.com","authmtrix":"Standard","status":1,"regcmt":null,"convfee":1.05,"corpgstin":"33AAACS7703H1ZL","isseq":0,"cpname":"Reg.accts","cpmobile":"9941004649","cpemail":"deepali.patekar@axisbank.com","refadminid":1}
  }

}
