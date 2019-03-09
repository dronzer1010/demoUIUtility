import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billerlist',
  templateUrl: './billerlist.component.html',
  styleUrls: ['./billerlist.component.css']
})
export class BillerlistComponent implements OnInit {
  display='none'; 
  billdata:any=[];
  billerlength:number=0;
  noofrole="No bills available"
  filterQuery = "";
  rowsOnPage = 300;
  sortBy = "email";
  sortOrder = "asc";
  constructor() { }

  ngOnInit() {
    this.billdata=JSON.parse(localStorage.getItem('billdetails'));
    console.log(this.billdata)
    if(this.billdata==null){
      this.billerlength=0
      this.noofrole="No bills available"
    }else{
      this.billerlength=this.billdata.length;
      if(this.billerlength>1){
        this.noofrole="No of Bills:"
      }else{
        this.noofrole="No of Bill:"
      }
    }
  }
  openModalDialog(){
    this.display=''; //Set block css
 }

 closeModalDialog(){
  this.display='block'; //set none css after close dialog
 }

}
