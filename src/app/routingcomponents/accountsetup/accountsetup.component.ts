import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';
//import { AccountsetupService } from './accountsetup.service';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;
//import { SessionService } from '../sessionservice/storage.service';
import { ToastrService } from 'ngx-toastr'
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-accountsetup',
  templateUrl: './accountsetup.component.html',
  styleUrls: ['./accountsetup.component.css']
})
export class AccountsetupComponent implements OnInit {
  public authentication: any;
  public setnewpassword: any;
  public getToken : any= {};
  public approveorg: any;
  public approvethroughuser: any;
  public approvethroughgroup: any;
  public approvethroughrule: any;
  public reviewdetails: any;
  public showsteponebutton: boolean=false;
  public showstepsecondbutton: boolean=false;
  public showstepthirdbutton: boolean=false;
  public showstepfourbutton: boolean=false;
  public showstepfivebutton: boolean=false;
  public showstepsixbutton: boolean=false;
  public onAuthCode: boolean=true;
  public onSetPassword: boolean=false;
  public onApprOrg: boolean=false;
  public onApprUsr: boolean=false;
  public onApprGrp: boolean=false;
  public onApprRule: boolean=false;
  public authcodedata: any;
  public authcode: any;
  public password: any;
  public confirmpassword: any;
  public userpassworddata: any;
  public organisation: any;
  public getOrgtoken: any;
  public approveOrgdata: any;
  public comment: any;
  public rejectionOrgdata: any;
  public getPendingUsersdata: any;
  public getPendingGroupsdata: any;
  public asGroupsPendingDetails: any;
  public temp: any;
  public checkedValueArray: any = [];
  public showHide: any;
  public test: any;
  public flag: any;
  public cntChk: any;
  public approveGroupdata: any;
  public rejectGroupmsg: any;
  public getPendingRulesdata: any;
  public pendingRules:any=[];
  public approveRuledata: any;
  public getPendinguserdata: any;
  public getrejectuserdata: any;
  public getOrgDetail:any;
  public authmatrix:any;
  public useremail:any;
  isSelectedUser = false;
  isSelectedGroup = false;
  isSelectedRule = false;
  isAllSelectedUser = false;
  isAllSelectedRule = false;
  isAllSelectedGroup = false;
  displayLoginModal:string='none';
  displayTncmodal:string='none;'
  displayPrivmodal:string='none;'
  enableLogin:boolean=true;
  checkValue:boolean=false;
  isViewuser:boolean;
  isUniuser:boolean;
  isBulkuser:boolean;
  isAppruser:boolean;
  isViewcard:boolean;
  isUnicard:boolean;
  isApprcard:boolean;
  isViewgroup:boolean;
  isUnigroup:boolean;
  isApprgroup:boolean;
  isRuleValidate:boolean;
  isUnirule:boolean;
  isRuleappr:boolean;
  isViewsup:boolean;
  isUnisup:boolean;
  isBulksup:boolean;
  isApprsup:boolean;
  isViewpay:boolean;
  isUnipay:boolean;
  isApprpay:boolean;
  isBulkpay:boolean;
  
  constructor(private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.authentication = true;
    this.setnewpassword = false;
    this.approveorg = false;
    this.approvethroughuser = false;
    this.temp = false;
    this.showHide = false;
    this.flag = 0;
    this.cntChk = 0;
  }

  gotosetPassword() {
    
    // this.accountsetupService.validateauthcode(this.authcode).then(resp => {
    //   this.authcodedata = resp;
    //   //this.showsteponebutton = true;
    //   // this.getOrgtoken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZWVwYWxpLnBhdGVrYXJAYXhpc2Jhbms0NS5jb20iLCJleHAiOjE1NDEyNDc4Njl9.xWL61T4UU3UN173YnBqyS30mmBBbv6shPABl7qjod6E4sdsc5B2l9kcLOPQu_kJCQWwq4spWQEafXURTQt-V0w";
    //   this.getOrgtoken = this.authcodedata.Token;
    //   // todo: after code complete do not undefine and not null
    //   console.log(resp)
    //   this.getToken = {
    //     "token":this.getOrgtoken
    //   }
    //   console.log(this.getOrgtoken)
    //   if (!!this.getOrgtoken) {
    //     this.authentication = false;
    //     this.approveorg = false;
    //     this.approvethroughuser = false;
    //     this.approvethroughgroup = false;
    //     this.approvethroughrule = false;
    //     this.reviewdetails = false;
    //     this.setnewpassword = true;
    //     this.showstepsecondbutton = false;
    //     this.onAuthCode=false;
    //     this.onSetPassword=true;
    //     this.onApprOrg=false;
    //     this.onApprUsr=false;
    //     this.showsteponebutton = true;
    //   } else {
    //     this.toastr.warning("Please enter valid authentication code!",'Alert',{
    //       timeOut:3000,
    //       positionClass:'toast-top-center'
    //       })
    //       console.log("Invlaid toke")
    //   }
    // });
    this.getOrgtoken="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdWt1bmQuamF2aXIwMUBheGlzYmFuay5jb20iLCJleHAiOjE1NTI2NDAyMTJ9.5EEdXFoXAooHrXBvzeZ8p79vgV038zi0f-PRfkUkw3qRMUMt-gHE8lE-2xwt4RKmjUBnZapC0zzFD16mJtzqsQ"
    this.getToken = {
      "token":this.getOrgtoken
    }
    if (!!this.getOrgtoken) {
      this.authentication = false;
      this.approveorg = false;
      this.approvethroughuser = false;
      this.approvethroughgroup = false;
      this.approvethroughrule = false;
      this.reviewdetails = false;
      this.setnewpassword = true;
      this.showstepsecondbutton = false;
      this.onAuthCode=false;
      this.onSetPassword=true;
      this.onApprOrg=false;
      this.onApprUsr=false;
      this.showsteponebutton = true;
    } else {
      this.toastr.warning("Please enter valid authentication code!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
        console.log("Invlaid toke")
    }
  }

  gotoApproveOrg() {
   
    if (!!this.password && !!this.confirmpassword && this.password.length >= 6) {
      if (this.password == this.confirmpassword) {
        // this.accountsetupService.validatepassword(this.getOrgtoken, this.password, this.confirmpassword).then(resp => {
        //   this.userpassworddata = resp;
        //   if (!!this.userpassworddata.data) {
        //     this.authentication = false;
        //     this.setnewpassword = false;
        //     this.approvethroughuser = false;
        //     this.approvethroughgroup = false;
        //     this.approvethroughrule = false;
        //     this.reviewdetails = false;
        //     this.approveorg = true;
        //     this.showsteponebutton = true;
        //     this.showstepsecondbutton = true;
        //     this.showstepthirdbutton = false;
        //     this.onAuthCode=false;
        //     this.onSetPassword=false;
        //     this.onApprOrg=true;
        //     this.onApprUsr=false;
        //     this.accountsetupService.getAllorganisations().then(resp => {
        //       this.organisation = resp.orgs;
        //       this.authmatrix=this.organisation[0]['auth']
              
        //     });
        //   }
        // });
        
        this.authentication = false;
        this.setnewpassword = false;
        this.approvethroughuser = false;
        this.approvethroughgroup = false;
        this.approvethroughrule = false;
        this.reviewdetails = false;
        this.approveorg = true;
        this.showsteponebutton = true;
        this.showstepsecondbutton = true;
        this.showstepthirdbutton = false;
        this.onAuthCode=false;
        this.onSetPassword=false;
        this.onApprOrg=true;
        this.onApprUsr=false;
        this.organisation=[{"id":66,"bankacc":null,"regdate":"08-01-2018 10:01:16","companyname":"Axis Bank Ltd","address":"Axis House Wadia International Parel, Mumbai","contact":"04443925300","city":null,"state":null,"pincode":"400012","tin":null,"pan":"AAACS7703H","domain":"www.axisbank.com","auth":"Complex","status":2,"regcmt":null,"convenience":"1.05","corpgstin":"27AAACS7703H1ZL","isseq":null,"cpemail":null,"cpmobile":null,"cpname":null,"refadminid":0}]
        this.authmatrix=this.organisation[0]['auth']
      }
      else {
        this.toastr.warning("Password and Confirm Password not matched!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
    } else {
      this.toastr.warning("Please enter atleast 6-character in password field!",'Alert',{
        timeOut:3000,
        positionClass:'toast-top-center'
        })
    }
  }

  gotoApproveUsers() {
    // this.accountsetupService.approveOrganisation().then(resp => {
    //   this.approveOrgdata = resp.throughuser;
      
    //   if (this.approveOrgdata == "yes") {
    //     this.authentication = false;
    //     this.setnewpassword = false;
    //     this.approveorg = false;
    //     this.reviewdetails = false;
    //     this.approvethroughuser = true;
    //     this.approvethroughgroup = false;
    //     this.approvethroughrule = false;
    //     this.showsteponebutton = true;
    //     this.showstepsecondbutton = true;
    //     this.showstepthirdbutton = true;
    //     if(this.authmatrix=='Complex'){
    //       this.showstepfivebutton=true;
    //       this.showstepsixbutton=true;
    //     }
    //     this.showstepfourbutton =false;
    //     this.onAuthCode=false;
    //     this.onSetPassword=false;
    //     this.onApprOrg=false;
    //     this.onApprUsr=true;
        
    //     this.accountsetupService.getPendingUsers().then(resp => {
    //     this.getPendingUsersdata = resp.usrsdata;
    //     console.log(resp.usrsdata)
    //     this.changeAll(this.isAllSelectedUser)
    //     });
        
    //   }
    
    //   if (this.approveOrgdata == "no") {
    //     this.authentication = false;
    //     this.setnewpassword = false;
    //     this.approveorg = false;
    //     this.reviewdetails = false;
    //     this.approvethroughuser = false;
    //     this.approvethroughgroup = true;
    //     this.approvethroughrule = false;
    //     this.showsteponebutton = true;
    //     this.showstepsecondbutton = true;
    //     this.showstepthirdbutton = true;
    //     this.showstepfivebutton = false;
    //     this.onAuthCode=false;
    //     this.onSetPassword=false;
    //     this.onApprOrg=false;
    //     this.onApprUsr=false;
    //     this.onApprRule=false;
    //     this.onApprGrp=true;
    //     this.accountsetupService.getAllpendingGroup().then(resp => {
    //     this.getPendingGroupsdata = resp.grps;
    //     this.changeAllgroup(this.isAllSelectedGroup)
    //     });
    //   }
    // });

    this.approveOrgdata="no"
    if (this.approveOrgdata == "yes") {
      this.authentication = false;
      this.setnewpassword = false;
      this.approveorg = false;
      this.reviewdetails = false;
      this.approvethroughuser = true;
      this.approvethroughgroup = false;
      this.approvethroughrule = false;
      this.showsteponebutton = true;
      this.showstepsecondbutton = true;
      this.showstepthirdbutton = true;
      if(this.authmatrix=='Complex'){
        this.showstepfivebutton=true;
        this.showstepsixbutton=true;
      }
      this.showstepfourbutton =false;
      this.onAuthCode=false;
      this.onSetPassword=false;
      this.onApprOrg=false;
      this.onApprUsr=true;
      
      this.getPendingUsersdata=[
        {"id":297,"empid":"S2463","email":"mukund.javir0192@axisbank.com","firstname":"Mr. Mukund","lastname":"Javir","dob":"04-06-1989","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"Officer II","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Corporate Admin","companyname":"Axis bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=1,52,38,4,22,61,11;cid=17,6,7,23,24,53,54,39,40,83,61;"},
        {"id":298,"empid":"S2468","email":"amit.kalekar@axisbank.com","firstname":"Mr. Amit","lastname":"Kalekar","dob":"25-11-1977","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"Asst. Manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Maker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=38,22,26,18,61,11;cid=27,28,51,20,19,21,23,39,0;"},
        {"id":299,"empid":"N645","email":"nitin.chavan@axisbank.com","firstname":"Mr. Nitin","lastname":"Chavan","dob":"07-06-1963","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"AGM","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Checker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"A","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;"},
        {"id":300,"empid":"M1035","email":"shreya.khanduri01@axisbank.com","firstname":"Ms. Shreya","lastname":"Khanduri","dob":"13-05-1971","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"Manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Checker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"B","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;"},
        {"id":381,"empid":"23235456","email":"ravikumar@bank.com","firstname":"Mr. Ravi","lastname":"Kumar","dob":"07-12-0012","mobileno":"1232323232","landlineno":"23232323232","password":null,"department":"Marketting","designation":"Manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Checker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"B","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;"},
        {"id":382,"empid":"7876443","email":"anuragjainaugust12@gmail.com","firstname":"Mr. Karan","lastname":"Kumar","dob":"09-08-0022","mobileno":"1244365768","landlineno":"2324354354","password":null,"department":"Marketign","designation":"manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Maker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=38,22,26,18,61,11;cid=27,28,51,20,19,21,23,39,0;"}
      ]
      this.changeAll(this.isAllSelectedUser)
    
      
    }
    if (this.approveOrgdata == "no") {
      this.authentication = false;
      this.setnewpassword = false;
      this.approveorg = false;
      this.reviewdetails = false;
      this.approvethroughuser = false;
      this.approvethroughgroup = true;
      this.approvethroughrule = false;
      this.showsteponebutton = true;
      this.showstepsecondbutton = true;
      this.showstepthirdbutton = true;
      this.showstepfivebutton = false;
      this.onAuthCode=false;
      this.onSetPassword=false;
      this.onApprOrg=false;
      this.onApprUsr=false;
      this.onApprRule=false;
      this.onApprGrp=true;
      this.getPendingGroupsdata=[{"lwrlimit":"0.00","uprlimit":"100,000,000.00","grpname":"A","orgid":0,"id":97,"adminid":0,"andor":null,"regcmt":null,"status":2,"added":null,"approved":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"groupid":null,"checkval":null,"approvedBy":0},{"lwrlimit":"0.00","uprlimit":"100,000,000.00","grpname":"B","orgid":0,"id":98,"adminid":0,"andor":null,"regcmt":null,"status":2,"added":null,"approved":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"groupid":null,"checkval":null,"approvedBy":0},{"lwrlimit":"0.00","uprlimit":"100,000,000.00","grpname":"C","orgid":0,"id":99,"adminid":0,"andor":null,"regcmt":null,"status":2,"added":null,"approved":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"groupid":null,"checkval":null,"approvedBy":0},{"lwrlimit":"0.00","uprlimit":"0.00","grpname":"D","orgid":0,"id":100,"adminid":0,"andor":null,"regcmt":null,"status":2,"added":null,"approved":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"groupid":null,"checkval":null,"approvedBy":0},{"lwrlimit":"0.00","uprlimit":"0.00","grpname":"E","orgid":0,"id":101,"adminid":0,"andor":null,"regcmt":null,"status":2,"added":null,"approved":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"groupid":null,"checkval":null,"approvedBy":0}]
      this.changeAllgroup(this.isAllSelectedGroup)
      
    }
    
  }

  rejectOrgData() {
    // this.accountsetupService.rejectOrganisation(this.comment).then(resp => {
    //   this.rejectionOrgdata = resp.msg;
    //   if (this.rejectionOrgdata = "succes") {
    //     this.accountsetupService.getAllorganisations().then(resp => {
    //       this.organisation = resp.orgs;
    //     });
    //   }
    // });
  }

  approvePendingUser() {
    
    if(this.checkedValueArray.length != 0){
    this.showstepfourbutton = true;
    this.onAuthCode=false;
    this.onSetPassword=false;
    this.onApprOrg=false;
    this.onApprUsr=false;
    this.onApprRule=false;
    this.onApprGrp=false;

    // this.accountsetupService.approveUser(this.checkedValueArray).then(resp => {
    //   this.getPendinguserdata = resp.msg;
    //   if (this.getPendinguserdata == "succes") {
    //    //this.storage.setData("chlogin_data", this.getOrgtoken);
    //    //this.storage.setData("rmlogin_data", this.getOrgtoken);
    //    this.storage.setData("chlogin_data", this.getToken);
    //    this.storage.setData("rmlogin_data", this.getToken);
    //    //this.router.navigate(['/asdashboard']);
    //    this.getUserEmail();
    //   }
      
    // });
    //this.router.navigate(['/main/dashboard']);
    this.getUserEmail();
    this.displayLoginModal="block"
    
  }else{
    this.displayLoginModal=""
    this.toastr.warning("Please select user to approve!",'Alert',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  }

  OpenTnC(){
this.displayTncmodal='block'
  }
   
  closeTnc(){
    this.displayTncmodal='none'
  }

 

  closePriv(){
    this.displayPrivmodal='none'
  }

  gotodashboard(){
    // this.storage.setData("chlogin_data", this.getToken);
    // this.storage.setData("rmlogin_data", this.getToken);
    this.displayLoginModal="none"
    localStorage.setItem('rolename', 'aschecker');
     this.router.navigate(['/main/dashboard'],{queryParams:{msg:'firstloginas'}});
   }

   rejectUser() {
    // this.accountsetupService.rejectUser().then(resp => {
    //   this.getrejectuserdata = resp.msg;
    //   if (this.getrejectuserdata == "succes") {
    //     this.accountsetupService.getPendingUsers().then(resp => {
    //       this.getPendingUsersdata = resp.usrsdata;
    //     });
    //   }
    // });
  }

  approvePendingGroup() {
    // this.approveGroupdata = "succes";
  //   if(this.checkedValueArray.length != 0){
  //   this.accountsetupService.approveGroup(this.checkedValueArray).then(resp => {
  //     this.approveGroupdata = resp.msg;
  //     if (this.approveGroupdata == "succes") {
  //       this.authentication = false;
  //       this.setnewpassword = false;
  //       this.approveorg = false;
  //       this.reviewdetails = false;
  //       this.approvethroughuser = false;
  //       this.approvethroughgroup = false;
  //       this.approvethroughrule = true;
  //       this.showsteponebutton = true;
  //       this.showstepsecondbutton = true;
  //       this.showstepthirdbutton=true;
  //       this.showstepfivebutton=true;
  //       this.showstepsixbutton=false;
  //       this.onAuthCode=false;
  //       this.onSetPassword=false;
  //       this.onApprOrg=false;
  //       this.onApprUsr=false;
  //       this.onApprRule=true;
  //       this.onApprGrp=false;
  //       this.accountsetupService.getAllPendingRule().then(resp => {
  //         this.getPendingRulesdata = resp.rules;
  //         this.changeAllrule(this.isAllSelectedRule)
  //       });
  //     }
  //   });
  // } else{
  //   this.toastr.warning("Please Select group to approve!",'Alert',{
  //     timeOut:3000,
  //     positionClass:'toast-top-center'
  //     })
  // }

  if(this.checkedValueArray.length != 0){
    
      this.approveGroupdata = 'succes';
      if (this.approveGroupdata == "succes") {
        this.authentication = false;
        this.setnewpassword = false;
        this.approveorg = false;
        this.reviewdetails = false;
        this.approvethroughuser = false;
        this.approvethroughgroup = false;
        this.approvethroughrule = true;
        this.showsteponebutton = true;
        this.showstepsecondbutton = true;
        this.showstepthirdbutton=true;
        this.showstepfivebutton=true;
        this.showstepsixbutton=false;
        this.onAuthCode=false;
        this.onSetPassword=false;
        this.onApprOrg=false;
        this.onApprUsr=false;
        this.onApprRule=true;
        this.onApprGrp=false;
       
          this.getPendingRulesdata = [{"ruleid":126,"orgid":0,"lwramount":"0.00","upramount":"100,000,000.00","ruleseter":0,"ruleformula":"A&A&A","status":2,"regcmt":null,"checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":null,"approved":null,"g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null},
          {"ruleid":127,"orgid":0,"lwramount":"0.00","upramount":"100,000,000.00","ruleseter":0,"ruleformula":"A&B","status":2,"regcmt":null,"checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":null,"approved":null,"g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null},
          {"ruleid":129,"orgid":0,"lwramount":"0.00","upramount":"100,000,000.00","ruleseter":0,"ruleformula":"B&B","status":2,"regcmt":null,"checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":null,"approved":null,"g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null},
          {"ruleid":130,"orgid":0,"lwramount":"0.00","upramount":"100,000,000.00","ruleseter":0,"ruleformula":"A&C","status":2,"regcmt":null,"checkval":null,"isapplicable":null,"chkamt":null,"addedby":0,"approvedby":0,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"added":null,"approved":null,"g1":null,"g2":null,"g3":null,"g4":null,"g5":null,"g6":null,"g7":null,"g8":null,"g9":null,"g10":null,"g11":null,"g12":null,"g13":null,"g14":null,"g15":null,"g16":null,"g17":null,"g18":null,"g19":null,"g20":null,"g21":null,"g22":null,"g23":null,"g24":null,"g25":null,"g26":null,"g27":null,"g28":null,"g29":null,"g30":null,"g31":null,"g32":null,"g33":null,"g34":null,"g35":null,"g36":null,"g37":null,"g38":null,"g39":null,"g40":null,"g41":null,"g42":null,"g43":null,"g44":null,"g45":null,"g46":null,"g47":null,"g48":null,"g49":null,"g50":null,"g51":null,"g52":null,"g53":null,"g54":null,"g55":null,"and1":null,"and2":null,"and3":null,"and4":null,"and5":null,"and6":null,"and7":null,"and8":null,"and9":null,"and10":null,"and11":null,"and12":null,"and13":null,"and14":null,"and15":null,"and16":null,"and17":null,"and18":null,"and19":null,"and20":null,"and21":null,"and22":null,"and23":null,"and24":null,"and25":null,"and26":null,"and27":null,"and28":null,"and29":null,"and30":null,"and31":null,"and32":null,"and33":null,"and34":null,"and35":null,"and36":null,"and37":null,"and38":null,"and39":null,"and40":null,"and41":null,"and42":null}];
          this.changeAllrule(this.isAllSelectedRule)
          
          
      //     for (var data of this.getPendingRulesdata){
      //       var str=[]
      //       var exactrule;
      //     str  = data['ruleformula'].split("&");
      //     var ruleformula=""
      //       for(var i=0;i<str.length;i++){
      //         ruleformula+="\""+str[i]+"\"";
      //         if(i==str.length-1){
      //           exactrule = ruleformula.replace("\"\"" ,"\"&\"");
      //           exactrule = exactrule.replace("\"\"" ,"\"&\"");
      //         }
      //         var obj={
      //           ruleformula:exactrule,
      //           lwramount:data['lwramount'],
      //           upramount:data['upramount']
      //          }
      //       }
      
      //  this.pendingRules.push(obj);
      //     }
      }
 
  }else{
    this.toastr.warning("Please Select group to approve!",'Alert',{
      timeOut:3000,
      positionClass:'toast-top-center'
      })
  }
  }

  approvependingRule() {
    // this.approveRuledata = "succes";
    //    if(this.checkedValueArray.length != 0){
    //     this.accountsetupService.approveRule(this.checkedValueArray).then(resp => {
    //       this.approveRuledata = resp.msg;
    //       if (this.approveRuledata == "succes") {
    //        this.authentication = false;
    //        this.setnewpassword = false;
    //        this.approveorg = false;
    //        this.reviewdetails = false;
    //        this.approvethroughuser = true;
    //        this.approvethroughgroup = false;
    //        this.approvethroughrule = false;
    //        this.showsteponebutton = true;
    //        this.showstepsecondbutton = true;
    //        this.showstepthirdbutton = true;
    //        this.showstepfivebutton=true;
    //        this.showstepsixbutton=true;
    //        this.showstepfourbutton=false;
    //        this.onAuthCode=false;
    //     this.onSetPassword=false;
    //     this.onApprOrg=false;
    //     this.onApprUsr=true;
    //     this.onApprRule=false;
    //     this.onApprGrp=false;
    //        this.accountsetupService.getPendingUsers().then(resp => {
    //          this.getPendingUsersdata = resp.usrsdata;
    //          this.changeAll(this.isAllSelectedUser)
    //        });
    //      }
    //  });
    //    }else{
    //     this.toastr.warning("Please select rule to approve!",'Alert',{
    //       timeOut:3000,
    //       positionClass:'toast-top-center'
    //       })
    //   }

//removable code

      if(this.checkedValueArray.length != 0){
     
          this.approveRuledata = "succes";
          if (this.approveRuledata == "succes") {
           this.authentication = false;
           this.setnewpassword = false;
           this.approveorg = false;
           this.reviewdetails = false;
           this.approvethroughuser = true;
           this.approvethroughgroup = false;
           this.approvethroughrule = false;
           this.showsteponebutton = true;
           this.showstepsecondbutton = true;
           this.showstepthirdbutton = true;
           this.showstepfivebutton=true;
           this.showstepsixbutton=true;
           this.showstepfourbutton=false;
           this.onAuthCode=false;
        this.onSetPassword=false;
        this.onApprOrg=false;
        this.onApprUsr=true;
        this.onApprRule=false;
        this.onApprGrp=false;
         
             this.getPendingUsersdata = [
              {"id":297,"empid":"S2463","email":"mukund.javir0192@axisbank.com","firstname":"Mr. Mukund","lastname":"Javir","dob":"04-06-1989","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"Officer II","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Corporate Admin","companyname":"Axis bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=1,52,38,4,22,61,11;cid=17,6,7,23,24,53,54,39,40,83,61;"},
              {"id":298,"empid":"S2468","email":"amit.kalekar@axisbank.com","firstname":"Mr. Amit","lastname":"Kalekar","dob":"25-11-1977","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"Asst. Manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Maker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=38,22,26,18,61,11;cid=27,28,51,20,19,21,23,39,0;"},
              {"id":299,"empid":"N645","email":"nitin.chavan@axisbank.com","firstname":"Mr. Nitin","lastname":"Chavan","dob":"07-06-1963","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"AGM","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Checker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"A","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;"},
              {"id":300,"empid":"M1035","email":"shreya.khanduri01@axisbank.com","firstname":"Ms. Shreya","lastname":"Khanduri","dob":"13-05-1971","mobileno":"9821142184","landlineno":null,"password":null,"department":"Regional Accts Expenses Team","designation":"Manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Checker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"B","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;"},
              {"id":381,"empid":"23235456","email":"ravikumar@bank.com","firstname":"Mr. Ravi","lastname":"Kumar","dob":"07-12-0012","mobileno":"1232323232","landlineno":"23232323232","password":null,"department":"Marketting","designation":"Manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Checker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"B","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=22,26,18,61,11;cid=28,74,19,75,23,0;"},
              {"id":382,"empid":"7876443","email":"anuragjainaugust12@gmail.com","firstname":"Mr. Karan","lastname":"Kumar","dob":"09-08-0022","mobileno":"1244365768","landlineno":"2324354354","password":null,"department":"Marketign","designation":"manager","role":0,"cardno":null,"limit":0.0,"orgid":0,"gid":0,"rolename":"Maker","companyname":"Axis Bank ltd","organisation":0,"isactive":2,"isinactive":null,"inactivecmt":null,"groupids":null,"grpname":"NA","tabid":0,"tabpid":0,"checkval":null,"isview":null,"tabidlist":null,"initiator":null,"approver":null,"regtime":null,"apprtime":null,"newpassword":null,"oldpassword":null,"confirm":null,"dateadded":null,"timeadded":null,"dateapproved":null,"timeapproved":null,"fileData":null,"isdup":null,"tabpermissionlist":null,"initiatormobilno":null,"approvermobileno":null,"initiatrole":null,"approverole":null,"initiatoremail":null,"initiatorid":0,"approveremail":null,"privstatus":0,"usertitle":null,"authcode":null,"throughuser":null,"privledges":null,"otherprivledges":null,"uploadfilename":null,"agreed":null,"name":null,"regcmt":null,"empid1":false,"email1":false,"name1":false,"dob1":false,"mobileno1":false,"department1":false,"designation1":false,"roleName1":false,"isactive1":false,"grpname1":false,"initiatorby":false,"initiatorOn":false,"approver1":false,"privledges1":false,"fileName1":false,"filterfromdate":null,"filtertodate":null,"fileName":false,"previlage":"pid=38,22,26,18,61,11;cid=27,28,51,20,19,21,23,39,0;"}
       ];
             this.changeAll(this.isAllSelectedUser)
       
         }
   
       }else{
        this.toastr.warning("Please select rule to approve!",'Alert',{
          timeOut:3000,
          positionClass:'toast-top-center'
          })
      }
  }

  rejectPendingGroup() {
    // this.accountsetupService.rejectGroup(this.comment).then(resp => {
    //   this.rejectGroupmsg = resp.msg;
    //   if (this.rejectGroupmsg == "succes") {
    //     this.toastr.success("Group rejected successfully",'Success',{
    //       timeOut:3000,
    //       positionClass:'toast-top-center'
    //       })
    //   }
    // });
  }

   /**
   * check & uncheck functionality
   */

  change(user:any , index:number){
    var temp_index=-1;
   for(var i=0;i<this.checkedValueArray.length;i++){
     if(this.checkedValueArray[i]["_id"]==index){
       temp_index=i;
     }
   }

   if(temp_index>-1){
    this.checkedValueArray.splice(temp_index , 1);
   }else{
    user["_id"] = index;
    this.checkedValueArray.push(user);
   }
   console.log(this.checkedValueArray);
   if(this.checkedValueArray.length==0){
    this.isAllSelectedUser=false;
   }
   if(this.checkedValueArray.length==this.getPendingUsersdata.length){
    this.isAllSelectedUser=true;
   }else{
    this.isAllSelectedUser=false;
   }
  }

  changegroup(group:any , index:number){
    var temp_index=-1;
   for(var i=0;i<this.checkedValueArray.length;i++){
     if(this.checkedValueArray[i]["_id"]==index){
       temp_index=i;
     }
   }

   if(temp_index>-1){
    this.checkedValueArray.splice(temp_index , 1);
   }else{
    group["_id"] = index;
    this.checkedValueArray.push(group);
   }
   console.log(this.checkedValueArray);
   if(this.checkedValueArray.length==0){
    this.isAllSelectedGroup=false;
   }
   if(this.checkedValueArray.length==this.getPendingGroupsdata.length){
    this.isAllSelectedGroup=true;
   }else{
    this.isAllSelectedGroup=false;
   }
  }

  changerule(rule:any , index:number){
    var temp_index=-1;
   for(var i=0;i<this.checkedValueArray.length;i++){
     if(this.checkedValueArray[i]["_id"]==index){
       temp_index=i;
     }
   }

   if(temp_index>-1){
    this.checkedValueArray.splice(temp_index , 1);
   }else{
    rule["_id"] = index;
    this.checkedValueArray.push(rule);
   }
   console.log(this.checkedValueArray);
   if(this.checkedValueArray.length==0){
    this.isAllSelectedRule=false;
   }
   if(this.checkedValueArray.length==this.getPendingRulesdata.length){
    this.isAllSelectedRule=true;
   }else{
    this.isAllSelectedRule=false;
   }
  }


  changeAll(checkedState:boolean){
   
    if(!checkedState){
      this.checkedValueArray=[];
      for(var i=0;i<this.getPendingUsersdata.length;i++){
        this.checkedValueArray.push(this.getPendingUsersdata[i]);
        this.checkedValueArray[i]["_id"]=i;
      }
    }else{
      this.checkedValueArray=[];
    }

    //console.log(this.checkedValueArray)

    //console.log(this.checkedValueArray);
    this.isSelectedUser = !checkedState
    this.isAllSelectedUser=!checkedState
  }

  changeAllgroup(checkedState:boolean){
    console.log(checkedState);

    if(!checkedState){
      this.checkedValueArray=[];
      for(var i=0;i<this.getPendingGroupsdata.length;i++){
        this.checkedValueArray.push(this.getPendingGroupsdata[i]);
        this.checkedValueArray[i]["_id"]=i;
      }
    }else{
      this.checkedValueArray=[];
    }

    console.log(this.checkedValueArray);
    this.isSelectedGroup = !checkedState
    this.isAllSelectedGroup=!checkedState
  }

  changeAllrule(checkedState:boolean){
    console.log(checkedState);

    if(!checkedState){
      this.checkedValueArray=[];
      for(var i=0;i<this.getPendingRulesdata.length;i++){
        this.checkedValueArray.push(this.getPendingRulesdata[i]);
        this.checkedValueArray[i]["_id"]=i;
      }
    }else{
      this.checkedValueArray=[];
    }

    console.log(this.checkedValueArray);
    this.isSelectedRule = !checkedState
    this.isAllSelectedRule=!checkedState
  }

  checkAll(checkedState:boolean){
    console.log(checkedState);

   
   
    this.isSelectedUser = !checkedState
    this.isSelectedGroup = !checkedState
    this.isSelectedRule = !checkedState
  }

  enableLoginbtn(){
    this.checkValue=true;
    if(this.checkValue=true){
      this.enableLogin=false;
    }
  }

  setPriv(str :string){
    console.log("user permission is "+str);
    
    str = str.replace("pid=" ,"");
    str = str.replace(";cid=",",");
    str = str.replace(";","");
    str = str.replace(" ","");
    var tab_arr = str.split(",");
  
    this.isViewuser = this.checkValInArray("17",tab_arr)
    //console.log(tab_arr);
    this.isUniuser = this.checkValInArray("6",tab_arr)
    this.isBulkuser = this.checkValInArray("7",tab_arr)
    this.isAppruser = this.checkValInArray("76",tab_arr)
    this.isViewcard = this.checkValInArray("23",tab_arr)
    this.isUnicard = this.checkValInArray("24",tab_arr)
    //console.log(this.isUnicard);
    this.isApprcard = this.checkValInArray("77",tab_arr)
    this.isViewgroup = this.checkValInArray("54",tab_arr)
    this.isUnigroup = this.checkValInArray("53",tab_arr)
    this.isApprgroup = this.checkValInArray("80",tab_arr)
    this.isRuleValidate = this.checkValInArray("39",tab_arr)
    this.isUnirule = this.checkValInArray("40",tab_arr)
    this.isRuleappr = this.checkValInArray("79",tab_arr)
    this.isViewsup = this.checkValInArray("28",tab_arr)
    this.isUnisup = this.checkValInArray("27",tab_arr)
    this.isBulksup = this.checkValInArray("51",tab_arr)
    this.isApprsup = this.checkValInArray("74",tab_arr)
    this.isViewpay = this.checkValInArray("19",tab_arr)
    this.isUnipay = this.checkValInArray("20",tab_arr)
    this.isApprpay = this.checkValInArray("75",tab_arr)
    this.isBulkpay = this.checkValInArray("21",tab_arr)
    this.displayPrivmodal='block'
  }

  checkValInArray(tabid:string , tab_array:string[]){
    return (tab_array.indexOf(tabid)==-1)?false:true;
  }

  getUserEmail(){
    // this.accountsetupService.getUserDetails().then(res=>{
    //   //console.log(res['Data']['email'])
    //   this.useremail=res['Data']['email'];
    // })
    this.useremail="deepali.patekar@axisbank.com"
  }

}
