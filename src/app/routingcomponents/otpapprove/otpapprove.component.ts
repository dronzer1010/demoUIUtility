import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-otpapprove',
  templateUrl: './otpapprove.component.html',
  styleUrls: ['./otpapprove.component.css']
})
export class OtpapproveComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
