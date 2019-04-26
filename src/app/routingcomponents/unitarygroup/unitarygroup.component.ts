import { Component, OnInit } from '@angular/core';
import{LoaderService} from '../../api/loader.service'
import { Router } from '@angular/router';
import {GroupserviceService} from '../../api/groupservice.service'
@Component({
  selector: 'app-unitarygroup',
  templateUrl: './unitarygroup.component.html',
  styleUrls: ['./unitarygroup.component.css']
})
export class UnitarygroupComponent implements OnInit {
  groupdata: any = {};
  showLoader: boolean;
  constructor(private loaderService: LoaderService,private router: Router,private grpservice:GroupserviceService) { }

  ngOnInit() {
  }

  onSubmit() {
    //alert("Hello");
    //console.log(this.cardData);
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.cardData))
    this.loaderService.display(true);
    //console.log(this.groupdata)
    //this.router.navigate(['/main/successmsg'],{queryParams:{msg:'groupsuccess'}});
    //this.loaderService.display(false);
    this.grpservice.registergroup(this.groupdata).subscribe(
      data=>{
        console.log(data)
        this.loaderService.display(false);
        this.router.navigate(['/main/successmsg'],{queryParams:{msg:'groupsuccess'}});
      },error => {
        console.log(error)
        this.loaderService.display(false);
        alert("Failed to Register")
    })
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.groupdata));
  }

}
