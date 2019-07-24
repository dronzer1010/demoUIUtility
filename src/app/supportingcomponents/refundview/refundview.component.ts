import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpEventType} from '@angular/common/http';
import {Config} from '../../config'
import { ToastrService } from 'ngx-toastr'
const path = new Config().getutilityBaseUrl();
@Component({
  selector: 'app-refundview',
  templateUrl: './refundview.component.html',
  styleUrls: ['./refundview.component.css']
})
export class RefundviewComponent implements OnInit {
refunddata:any=[]
select=false;
selectall:boolean=false;
selectallbiller:boolean=false;
public checkedValueArray: any = [];
public temp: any;
  public cntChk: any;
  public flag: any;
  rowsOnPage = 300;
  sortBy = "email";
  filename:string;
  sortOrder = "asc";
  constructor(private httpService: HttpClient,private toastr: ToastrService) { }

  ngOnInit() {
    this.getIsgdata()
  }

  changeAll(refData): void {
    
    if(this.checkedValueArray.length==this.refunddata.length){
    this.cntChk=1
    }else{
    this.checkedValueArray = [];
    this.cntChk=0
    }
    console.log(this.selectall)
    if (this.cntChk == 0) {
      this.cntChk = 1;
      this.temp = true;
      this.selectall=true;
      this.select=true;
      for (var i = 0; i < refData.length; i++) {
        this.checkedValueArray[i] = refData[i].id;
      }
      this.cntChk = 0;
    }
   
    else {
      this.cntChk = 0;
      this.temp = false;
      this.checkedValueArray = [];
      this.select=false;
    }
    console.log(this.checkedValueArray)
  }

  change(id): void {
    this.flag = 0;
    for (var i = 0; i < this.checkedValueArray.length; i++) {
      if (this.checkedValueArray[i] == id) {
        this.checkedValueArray.splice(i, 1);
        this.flag = 1;
      }
    }
    if (this.flag == 0) {
      this.checkedValueArray.push(id);
     
    }

    if (this.checkedValueArray.length > 0) {
      this.temp = true;
      if(this.checkedValueArray.length<this.refunddata.length){
        this.selectall=false
      }else{
        this.selectall=true;
        this.cntChk = 1;
      }
      console.log(this.selectall)
     
    }
    else {
      this.temp = false;
      if(this.checkedValueArray.length<this.refunddata.length){
        this.selectall=false
      }else{
        this.selectall=true;
      }
      console.log(this.selectall)
     
    }
    console.log(this.checkedValueArray)
  }

  private getIsgdata(){
    this.httpService.get(`${path}api/v2/get_isg_data`).subscribe(resp=>{
      console.log(resp)
      this.refunddata=resp['data']
    },error=>{
      console.log(error)
    })
  }

 refundpayments(){
    this.httpService.post(`${path}api/v2/isg_response_data`,this.checkedValueArray).subscribe(resp=>{
      console.log(resp)
      this.toastr.success("Payment Refund Process Initiated",'Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
       
        this.getIsgdata()
    },error=>{
      console.log(error)
      this.toastr.error("Failed to refund",'Error',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
        this.getIsgdata()
    })
  }
}
