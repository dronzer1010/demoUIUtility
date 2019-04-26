import { Component, OnInit } from '@angular/core';
import{LoaderService} from '../../api/loader.service';
import { Router } from '@angular/router';
import {CardserviceService} from '../../api/cardservice.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-cardunitary',
  templateUrl: './cardunitary.component.html',
  styleUrls: ['./cardunitary.component.css']
})
export class CardunitaryComponent implements OnInit {
  cardData: any = {};
  digit1:any;
  digit2:any;
  digit3:any;
  digit4:any;
  digit5:any;
  digit6:any;
  digit7:any;
  digit8:any;
  digit9:any;
  digit10:any;
  digit11:any;
  digit12:any;
  digit13:any;
  digit14:any;
  digit15:any;
  digit16:any;
  constructor(private loaderService: LoaderService,private router: Router,private cardservice:CardserviceService,private toastr:ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loaderService.display(true);
    // var cardno_arr =[];
    // for(var key in this.cardData['digits'])
    // cardno_arr.push(this.cardData['digits'][key]);
    // this.cardData['digits'] = cardno_arr.join("");
    this.cardData['digits']=this.digit1+this.digit2+this.digit3+this.digit4+this.digit5+this.digit6+this.digit7+this.digit8+this.digit9+this.digit10+this.digit11+this.digit12+this.digit13+this.digit14+this.digit15+this.digit16
    console.log(this.cardData)
   // this.loaderService.display(false);
   // this.router.navigate(['/main/successmsg'],{queryParams:{msg:'cardsuccess'}});
    this.cardservice.registercard(this.cardData).subscribe(
      data=>{
        console.log(data)
        if(data['code']=='CONFLICT'){
          this.loaderService.display(false);
          this.toastr.warning("Card is already Exist!",'Alert',{
            timeOut:3000,
            positionClass:'toast-top-center'
            })
        }else{
        this.loaderService.display(false);
       this.router.navigate(['/main/successmsg'],{queryParams:{msg:'cardsuccess'}});
        }
      },error => {
        console.log(error)
        this.loaderService.display(false);
        this.toastr.error("Failed to register!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
    })
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.cardData));
  }

  onInputEntry(event, nextInput) {
    let input = event.target;
    let length = input.value.length;
    let maxLength = input.attributes.maxlength.value;
  
    if (length >= maxLength) {
      nextInput.focus();
    }
  }

}
