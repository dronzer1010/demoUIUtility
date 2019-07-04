import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import{LoaderService} from '../../api/loader.service'
import { ToastrService } from 'ngx-toastr'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Config} from '../../config'
const path = new Config().getBackURL();
@Component({
  selector: 'app-backgrpreg',
  templateUrl: './backgrpreg.component.html',
  styleUrls: ['./backgrpreg.component.css']
})
export class BackgrpregComponent implements OnInit {
  groupdata: any = {};
  showLoader: boolean;
  orgid:any;
  step2:boolean=false;
  constructor(private router: Router,private loaderService: LoaderService,private toastr: ToastrService,private http: HttpClient,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.orgid = this.activatedRoute.snapshot.queryParams["orgid"];
  }

  submitgrpregback(groupdata:any,orgid:any){
    console.log(groupdata)
    return this.http.post(path+`/remotesavebulkuser?orgid=${orgid}`, groupdata);
}

}
