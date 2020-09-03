import { Component, OnInit, Input  } from '@angular/core';
import {RmservicesService} from '../../api/rmservices.service'
declare var require:any;
@Component({
  selector: 'app-rmhome',
  templateUrl: './rmhome.component.html',
  styleUrls: ['./rmhome.component.css']
})
export class RmhomeComponent implements OnInit {
  @Input() data: any;
  currentUser : any;
  lastsession:string="";
  designation:string="";
  rolename:string="";
  rmname:string="";
  constructor(private rmservice:RmservicesService) { }

  ngOnInit() {
    this.rmservice.getUserDetails().then(res => {
      this.currentUser = res['Data'];
     
      if(this.currentUser!=null || this.currentUser!=undefined){
        this.designation=this.currentUser['designation']
        this.rolename=this.currentUser['rolename']
        this.rmname=this.currentUser['firstname']+" "+this.currentUser['lastname']
            if(this.currentUser['lastsession']!=null){
        this.lastsession=this.currentUser['lastsession']
        let dateFormat = require('dateformat');
        let now = this.lastsession
     this.lastsession=dateFormat(now, "dddd, mmmm dS, yyyy, hh:MM TT");
      }else{
        this.lastsession="mmm dd yyyy  h:mm"
      }
      }
  
      
    });
  }

}
