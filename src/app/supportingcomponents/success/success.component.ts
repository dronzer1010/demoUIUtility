import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,NavigationEnd,RoutesRecognized   } from '@angular/router';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  previousUrl: string;
  currentUrl: string;
  params:string;
  groupsuccess:boolean=false;
  cardsuccess:boolean=false;
  usersucess:boolean=false;
  rulesuccess:boolean=false;
  
  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.queryParams["msg"];
    console.log(this.params);
    if(this.params=='groupsuccess'){
      this.groupsuccess=true;
    }else if(this.params=='cardsuccess'){
      this.cardsuccess=true;
    }else if(this.params=='rulesuccess'){
      this.rulesuccess=true;
    }else if(this.params=='usersuccess'){
      this.usersucess=true;
    }
    else{
      this.groupsuccess=false;
      this.cardsuccess=false;
      this.rulesuccess=false;
      this.usersucess=false;
     
    }
  }

}
