import { Component, OnInit } from '@angular/core';
import{LoaderService} from '../../api/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardunitary',
  templateUrl: './cardunitary.component.html',
  styleUrls: ['./cardunitary.component.css']
})
export class CardunitaryComponent implements OnInit {
  cardData: any = {};
  constructor(private loaderService: LoaderService,private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loaderService.display(true);
    var cardno_arr =[];
    for(var key in this.cardData['digits'])
    cardno_arr.push(this.cardData['digits'][key]);
    this.cardData['digits'] = cardno_arr.join("");
    console.log(this.cardData)
    this.loaderService.display(false);
    this.router.navigate(['/successmsg'],{queryParams:{msg:'cardsuccess'}});
    // this.cardservice.registercard(this.cardData).subscribe(
    //   data=>{
    //     console.log(data)
    //     if(data['code']=='CONFLICT'){
    //       this.loaderService.display(false);
    //       this.toastr.warning("Card is already Exist!",'Alert',{
    //         timeOut:3000,
    //         positionClass:'toast-top-center'
    //         })
    //     }else{
    //     this.loaderService.display(false);
    //    this.router.navigate(['/main/successmsg'],{queryParams:{msg:'cardsuccess'}});
    //     }
    //   },error => {
    //     this.loaderService.display(false);
    //     console.log("Failed to Register")
    // })
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.cardData));
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
