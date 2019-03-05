import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maker-biller-list',
  templateUrl: './maker-biller-list.component.html',
  styleUrls: ['./maker-biller-list.component.css']
})
export class MakerBillerListComponent implements OnInit {
  display='none';
  billdata:any=[];
  constructor() { }

  ngOnInit() {
this.billdata=JSON.parse(localStorage.getItem('billdetails'));
console.log(this.billdata)
  }
  openModalDialog(){
    this.display=''; //Set block css
  }
  closeModalDialog(){
    this.display='block'; //set none css after close dialog
  }
}
