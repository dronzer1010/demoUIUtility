import { Component, OnInit } from '@angular/core';
import {IfscVerificationService} from '../../api/ifsc-verification.service'
import { Ifsc } from '../../models/ifsc';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-rmifsc',
  templateUrl: './rmifsc.component.html',
  styleUrls: ['./rmifsc.component.css']
})
export class RmifscComponent implements OnInit {
  ifsc: string;
  ifscdetails: Ifsc[] = [];
  isViewifsc:boolean ;
  display: string;
  constructor(private ifscservice : IfscVerificationService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Ifsc called");
    console.log(this.ifsc);
   
this.ifscservice.getIfscDetails(this.ifsc).subscribe(res=>{
this.ifscdetails = res['data'];
this.display = res['success'];
console.log(this.display);
debugger
console.log(this.isViewifsc);
console.log(res['success']);
   
   if( res['success'] == true){
    this.isViewifsc = true;
    this.ifscdetails = res['data'];
   }else{
    this.isViewifsc = false; 
    console.log(this.isViewifsc);
   }
 
 console.log("ifscdetails");
 console.log(this.ifscdetails);

},error=>{
 console.log("Bank Details not Available");
 this.toastr.warning("Bank Details not available","Alert",{
  timeOut:3000,
  positionClass:'toast-top-center'
  })
});
    
}

}
