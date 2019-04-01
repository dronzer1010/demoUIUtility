import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-samplebills',
  templateUrl: './samplebills.component.html',
  styleUrls: ['./samplebills.component.css']
})
export class SamplebillsComponent implements OnInit {
  private _albums: any = [];
  charArray:any=[];
  key: string = 'caption'; //set default
  reverse: boolean = false;
  filteredBills:any[];
  filterShow:boolean=true;
  constructor(private _lightbox: Lightbox,private httpService: HttpClient) {

   }

  ngOnInit() {
    //this.loadSamplebills()
    this.httpService.get('./assets/bills.json').subscribe(
      data=>{
        this._albums=data;
      }
    )
    this.setCharArray();
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
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

  nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  filterSupplierByChar(character:string){
    this.filterShow=false;
    this.filteredBills=[];
    this.filteredBills = this._albums.filter(bill =>{

       return (bill['caption'][0].toUpperCase() == character)
     })
    
     console.log("here comes filtered suppliers")
     console.log(this.filteredBills)
  }
  

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
