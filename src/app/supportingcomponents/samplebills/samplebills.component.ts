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
  constructor(private _lightbox: Lightbox,private httpService: HttpClient) {
    
   }

  ngOnInit() {
    //this.loadSamplebills()
    this.httpService.get('./assets/bills.json').subscribe(
      data=>{
        this._albums=data;
      }
    )
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
