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
  usrapprsuccess:boolean=false;
  grpapprsuccess:boolean=false;
  ruleapprsuccess:boolean=false;
  crdapprsuccess:boolean=false;
  
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
    }else if(this.params=='usrapprsuccess'){
      this.usrapprsuccess=true;
    }else if(this.params=='crdapprsuccess'){
      this.crdapprsuccess=true;
    }else if(this.params=='ruleapprsuccess'){
      this.ruleapprsuccess=true;
    }else if(this.params=='grpapprsuccess'){
      this.grpapprsuccess=true;
    }
    else{
      this.groupsuccess=false;
      this.cardsuccess=false;
      this.rulesuccess=false;
      this.usersucess=false;
      this.grpapprsuccess=false;
      this.usrapprsuccess=false;
      this.ruleapprsuccess=false;
      this.crdapprsuccess=false;
     
    }
  }

}
