import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unitaryrule',
  templateUrl: './unitaryrule.component.html',
  styleUrls: ['./unitaryrule.component.css']
})
export class UnitaryruleComponent implements OnInit {
  groupData: any = {};
  groups:any[] = [];
  ruleField:any={};
  rules:any[]=[];
  _rules:any[]=[];
  isSelected = false;
  usergroups:any=[];
  constructor() { }

  ngOnInit() {
  }

}
