import { Component, OnInit } from '@angular/core';
//import { NotificationMatrixService } from './notificationmatrix.service';
import { Users } from '../../models/users';
// import{UserService} from '../../api/user.service'
// import * as $ from 'jquery';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-notificationmatrix',
  templateUrl: './notificationmatrix.component.html',
  styleUrls: ['./notificationmatrix.component.css']
})
export class NotificationmatrixComponent implements OnInit {
  public asNotificationDetails: any;
  public userpsms: any;
  public userpotp: any;
  public userval: any;
  public userpemail: any;  
  public myNotificationDetails: any;
  public test: any;
  private regOtpUserPending: boolean = false;
  private regSmsUserPending: boolean = false;
  private regEmailUserPending: boolean = false;
  private regOtpUserApprove: boolean = false;
  private regSmsUserApprove: boolean = false;
  private regEmailUserApprove: boolean = false;
  private regOtpUserReject: boolean = false;
  private regSmsUserReject: boolean = false;
  private regEmailUserReject: boolean = false;
  private regOtpCardPending: boolean = false;
  private regSmsCardPending: boolean = false;
  private regEmailCardPending: boolean = false;
  private regOtpCardApprove: boolean = false;
  private regSmsCardApprove: boolean = false;
  private regEmailCardApprove: boolean = false;
  private regOtpCardReject: boolean = false;
  private regSmsCardReject: boolean = false;
  private regEmailCardReject: boolean = false;
  private regOtpGroupPending: boolean = false;
  private regSmsGroupPending: boolean = false;
  private regEmailGroupPending: boolean = false;
  private regOtpGroupApprove: boolean = false;
  private regSmsGroupApprove: boolean = false;
  private regEmailGroupApprove: boolean = false;
  private regOtpGroupReject: boolean = false;
  private regSmsGroupReject: boolean = false;
  private regEmailGroupReject: boolean = false;
  private regOtpRulePending: boolean = false;
  private regSmsRulePending: boolean = false;
  private regEmailRulePending: boolean = false;
  private regOtpRuleApprove: boolean = false;
  private regSmsRuleApprove: boolean = false;
  private regEmailRuleApprove: boolean = false;
  private regOtpRuleReject: boolean = false;
  private regSmsRuleReject: boolean = false;
  private regEmailRuleReject: boolean = false;
  private regOtpPrivilegesPending: boolean = false;
  private regSmsPrivilegesPending: boolean = false;
  private regEmailPrivilegesPending: boolean = false;
  private regOtpPrivilegesApprove: boolean = false;
  private regSmsPrivilegesApprove: boolean = false;
  private regEmailPrivilegesApprove: boolean = false;
  private regOtpPrivilegesReject: boolean = false;
  private regSmsPrivilegesReject: boolean = false;
  private regEmailPrivilegesReject: boolean = false;
  private regOtpSuppliersPending: boolean = false;
  private regSmsSuppliersPending: boolean = false;
  private regEmailSuppliersPending: boolean = false;
  private regOtpSuppliersApprove: boolean = false;
  private regSmsSuppliersApprove: boolean = false;
  private regEmailSuppliersApprove: boolean = false;
  private regOtpSuppliersReject: boolean = false;
  private regSmsSuppliersReject: boolean = false;
  private regEmailSuppliersReject: boolean = false;
  private regOtpLoginApprove: boolean = false;
  private regSmsLoginApprove: boolean = false;
  private regEmailLoginApprove: boolean = false;
  private regSmsPaymentApprove : boolean = false;
  private regEmailPaymentApprove : boolean = false;
  private regOtpPaymentApprove : boolean = false;
  private regSmsPaymentPending : boolean = false;
  private regEmailPaymentPending : boolean = false;
  private regOtpPaymentPending : boolean = false;
  private regSmsPaymentReject : boolean = false;
  private regEmailPaymentReject : boolean = false;
  private regOtpPaymentReject : boolean = false;
  private enOtpUserPending: boolean = false;
  private enSmsUserPending: boolean = false;
  private enEmailUserPending: boolean = false;
  private enOtpUserApprove: boolean = false;
  private enSmsUserApprove: boolean = false;
  private enEmailUserApprove: boolean = false;
  private enOtpUserReject: boolean = false;
  private enSmsUserReject: boolean = false;
  private enEmailUserReject: boolean = false;
  private enOtpCardPending: boolean = false;
  private enSmsCardPending: boolean = false;
  private enEmailCardPending: boolean = false;
  private enOtpCardApprove: boolean = false;
  private enSmsCardApprove: boolean = false;
  private enEmailCardApprove: boolean = false;
  private enOtpCardReject: boolean = false;
  private enSmsCardReject: boolean = false;
  private enEmailCardReject: boolean = false;
  private enOtpGroupPending: boolean = false;
  private enSmsGroupPending: boolean = false;
  private enEmailGroupPending: boolean = false;
  private enOtpGroupApprove: boolean = false;
  private enSmsGroupApprove: boolean = false;
  private enEmailGroupApprove: boolean = false;
  private enOtpGroupReject: boolean = false;
  private enSmsGroupReject: boolean = false;
  private enEmailGroupReject: boolean = false;
  private enOtpRulePending: boolean = false;
  private enSmsRulePending: boolean = false;
  private enEmailRulePending: boolean = false;
  private enOtpRuleApprove: boolean = false;
  private enSmsRuleApprove: boolean = false;
  private enEmailRuleApprove: boolean = false;
  private enOtpRuleReject: boolean = false;
  private enSmsRuleReject: boolean = false;
  private enEmailRuleReject: boolean = false;
  private enOtpPrivilegesPending: boolean = false;
  private enSmsPrivilegesPending: boolean = false;
  private enEmailPrivilegesPending: boolean = false;
  private enOtpPrivilegesApprove: boolean = false;
  private enSmsPrivilegesApprove: boolean = false;
  private enEmailPrivilegesApprove: boolean = false;
  private enOtpPrivilegesReject: boolean = false;
  private enSmsPrivilegesReject: boolean = false;
  private enEmailPrivilegesReject: boolean = false;
  private enOtpSuppliersPending: boolean = false;
  private enSmsSuppliersPending: boolean = false;
  private enEmailSuppliersPending: boolean = false;
  private enOtpSuppliersApprove: boolean = false;
  private enSmsSuppliersApprove: boolean = false;
  private enEmailSuppliersApprove: boolean = false;
  private enOtpSuppliersReject: boolean = false;
  private enSmsSuppliersReject: boolean = false;
  private enEmailSuppliersReject: boolean = false;
  private enOtpLoginApprove: boolean = false;
  private enSmsLoginApprove: boolean = false;
  private enEmailLoginApprove: boolean = false;
  private enSmsPaymentApprove : boolean = false;
  private enEmailPaymentApprove : boolean = false;
  private enOtpPaymentApprove : boolean = false;
  private enSmsPaymentPending : boolean = false;
  private enEmailPaymentPending : boolean = false;
  private enOtpPaymentPending : boolean = false;
  private enSmsPaymentReject : boolean = false;
  private enEmailPaymentReject : boolean = false;
  private enOtpPaymentReject : boolean = false;
  currentUser: any;
  isUser:boolean;
  isCard:boolean;
  isGroup:boolean;
  isRule:boolean;
  isSupplier:boolean;
  isPayment:boolean;
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
  isAuthmatrix:boolean;
  isRm:boolean;
  loadUsrDet:boolean=false;
  rolename:string;
  paymenttab:boolean=false
  logintab:boolean=false;
  registrationtab:boolean=true;
  usertab:boolean=true;
  cardtab:boolean=false;
  ruletab:boolean=false;
  grouptab:boolean=false;
  billertab:boolean=false;
  public enableMe: any;
  public enableLogin:boolean=false;
  public Showme: any;
  constructor() { }

  ngOnInit() {
    this.enableMe = false;
    this.Showme = false;
    this.loadUserDetails();
    setTimeout(() => {
      this.loadNoticationMatrix();
    }, 2000);
  }

  private loadUserDetails(){
    // this.userservice.getUserDetails().subscribe(users => {
     
      //this.loadUsrDet=true;
      //this.currentUser = users['Data'];
      this.currentUser = {"landlineno":null,"empid":"T012","firstname":"Mr. Thirumurugan","roleid":2,"rolename":"Authorised Signatory","isactive":1,"groupid":97,"isseq":0,"authmtrix":"Complex","mobileno":"9821142184","orgid":66,"lastname":"J","dob":"05-01-1980","companyname":"SHRIRAM CITY UNION FINANCE LIMITED-Regional Accounts","grpname":"A","id":296,"designation":"Sr. Manager","department":"Regional Accts Expenses Team","email":"mukund.javir01@axisbank.com","tabpermissionids":"pid=1,52,38,4,22,26,18,61,11,60;cid=17,77,76,28,19,23,54,80,39,79,74,75,2,62,82,61;"};
console.log(this.currentUser)
      this.rolename=this.currentUser['rolename']
      if(this.currentUser.tabpermissionids !=null){
      var str = this.currentUser.tabpermissionids;
      str = str.replace("pid=" ,"");
      str = str.replace(";cid=",",");
      str = str.replace(";","");
      str = str.replace(" " , "");
      var tab_arr = str.split(",");
      console.log("Permission:"+tab_arr)
    
      //console.log("Organisation:"+this.isOrgEdit)
      this.isUser = this.checkValInArray("4",tab_arr)
      console.log(this.isUser)
      this.isCard = this.checkValInArray("22",tab_arr)
     // console.log(this.isCard+"Card True")
      this.isGroup = this.checkValInArray("52",tab_arr)
      this.isRule = this.checkValInArray("38",tab_arr)
      this.isSupplier = this.checkValInArray("26",tab_arr)
      this.isPayment = this.checkValInArray("18",tab_arr)
      //console.log(this.isPayment+"Pay True")
      this.isViewuser = this.checkValInArray("17",tab_arr)
      //console.log(tab_arr);
      this.isUniuser = this.checkValInArray("6",tab_arr)
      this.isBulkuser = this.checkValInArray("7",tab_arr)
      this.isAppruser = this.checkValInArray("76",tab_arr)
      this.isViewcard = this.checkValInArray("23",tab_arr)
      this.isUnicard = this.checkValInArray("24",tab_arr)
      console.log(this.isUnicard);
      this.isApprcard = this.checkValInArray("77",tab_arr)
      this.isViewgroup = this.checkValInArray("54",tab_arr)
      this.isUnigroup = this.checkValInArray("53",tab_arr)
      this.isApprgroup = this.checkValInArray("80",tab_arr)
      this.isRuleValidate = this.checkValInArray("39",tab_arr)
      this.isUnirule = this.checkValInArray("40",tab_arr)
      this.isRuleappr = this.checkValInArray("79",tab_arr)
      this.isViewsup = this.checkValInArray("28",tab_arr)
      this.isUnisup = this.checkValInArray("27",tab_arr)
      console.log(this.isUnisup)
      this.isBulksup = this.checkValInArray("51",tab_arr)
      this.isApprsup = this.checkValInArray("74",tab_arr)
      this.isViewpay = this.checkValInArray("19",tab_arr)
      this.isUnipay = this.checkValInArray("20",tab_arr)
      this.isApprpay = this.checkValInArray("75",tab_arr)
      this.isBulkpay = this.checkValInArray("21",tab_arr)
    }
    //console.log(this.currentUser);
      this.isAuthmatrix=true;
      this.isRm=false;
    //   if(users['Data']['orgid']!=null){
    //   if(users['Data']['authmtrix']=="Complex"){
    //     this.isAuthmatrix=true;
    //   }else{
    //     this.isAuthmatrix=false;
    //   }
    // }
      // if(users['Data']['rolename']=="RM"){
      //   this.isRm=true;
      // }else{
      //   this.isRm=false;
      // }

      //console.log("Hello RM:"+this.isRm+" "+users['Data']);
  
       
      // });
  }

  private loadNoticationMatrix(){
    //this.asNotificationMatrixService.getNotificationDetails().then(resp => {
     // this.asNotificationDetails = resp.data;
     this.asNotificationDetails ="nmblist NULL";
      console.log(this.asNotificationDetails)
      if(this.asNotificationDetails!="nmblist NULL"){
      if (this.asNotificationDetails.user.userpotp == 2) {
        this.regOtpUserPending = true;
      }
      if (this.asNotificationDetails.user.userpsms == 2) {
        this.regSmsUserPending = true;
      }
      if (this.asNotificationDetails.user.userpemail == 2) {
        this.regEmailUserPending = true;
      }
      if (this.asNotificationDetails.user.useraotp == 1) {
        this.regOtpUserApprove = true;
      }
      if (this.asNotificationDetails.user.userasms == 1) {
        this.regSmsUserApprove = true;
      }
      if (this.asNotificationDetails.user.useraemail == 1) {
        this.regEmailUserApprove = true;
      }
      if (this.asNotificationDetails.user.userrotp == 3) {
        this.regOtpUserReject = true;
      }
      if (this.asNotificationDetails.user.userrsms == 3) {
        this.regSmsUserReject = true;
      }
      if (this.asNotificationDetails.user.userremail == 3) {
        this.regEmailUserReject = true;
      }
      if (this.asNotificationDetails.cards.cardspotp == 2) {
        this.regOtpCardPending = true;
      }
      if (this.asNotificationDetails.cards.cardspsms == 2) {
        this.regSmsCardPending = true;
      }
      if (this.asNotificationDetails.cards.cardspemail == 2) {
        this.regEmailCardPending = true;
      }
      if (this.asNotificationDetails.cards.cardsaotp == 1) {
        this.regOtpCardApprove = true;
      }
      if (this.asNotificationDetails.cards.cardsasms == 1) {
        this.regSmsCardApprove = true;
      }
      if (this.asNotificationDetails.cards.cardsaemail == 1) {
        this.regEmailCardApprove = true;
      }
      if (this.asNotificationDetails.cards.cardsrotp == 3) {
        this.regOtpCardReject = true;
      }
      if (this.asNotificationDetails.cards.cardsrsms == 3) {
        this.regSmsCardReject = true;
      }
      if (this.asNotificationDetails.cards.cardsremail == 3) {
        this.regEmailCardReject = true;
      }
      if (this.asNotificationDetails.group.grouppotp == 2) {
        this.regOtpGroupPending = true;
      }
      if (this.asNotificationDetails.group.grouppsms == 2) {
        this.regSmsGroupPending = true;
      }
      if (this.asNotificationDetails.group.grouppemail == 2) {
        this.regEmailGroupPending = true;
      }
      if (this.asNotificationDetails.group.groupaotp == 1) {
        this.regOtpGroupApprove = true;
      }
      if (this.asNotificationDetails.group.groupasms == 1) {
        this.regSmsGroupApprove = true;
      }
      if (this.asNotificationDetails.group.groupaemail == 1) {
        this.regEmailGroupApprove = true;
      }
      if (this.asNotificationDetails.group.grouprotp == 3) {
        this.regOtpGroupReject = true;
      }
      if (this.asNotificationDetails.group.grouprsms == 3) {
        this.regSmsGroupReject = true;
      }
      if (this.asNotificationDetails.group.groupremail == 3) {
        this.regEmailGroupReject = true;
      }
      if (this.asNotificationDetails.rules.rulespotp == 2) {
        this.regOtpRulePending = true;
      }
      if (this.asNotificationDetails.rules.rulespsms == 2) {
        this.regSmsRulePending = true;
      }
      if (this.asNotificationDetails.rules.rulespemail == 2) {
        this.regEmailRulePending = true;
      }
      if (this.asNotificationDetails.rules.rulesaotp == 1) {
        this.regOtpRuleApprove = true;
      }
      if (this.asNotificationDetails.rules.rulesasms == 1) {
        this.regSmsRuleApprove = true;
      }
      if (this.asNotificationDetails.rules.rulesaemail == 1) {
        this.regEmailRuleApprove = true;
      }
      if (this.asNotificationDetails.rules.rulesrotp == 3) {
        this.regOtpRuleReject = true;
      }
      if (this.asNotificationDetails.rules.rulesrsms == 3) {
        this.regSmsRuleReject = true;
      }
      if (this.asNotificationDetails.rules.rulesremail == 3) {
        this.regEmailRuleReject = true;
      }
      if (this.asNotificationDetails.privileges.privilegespotp == 2) {
        this.regOtpPrivilegesPending = true;
      }
      if (this.asNotificationDetails.privileges.privilegespsms == 2) {
        this.regSmsPrivilegesPending = true;
      }
      if (this.asNotificationDetails.privileges.privilegespemail == 2) {
        this.regEmailPrivilegesPending = true;
      }
      if (this.asNotificationDetails.privileges.privilegesaotp == 1) {
        this.regOtpPrivilegesApprove = true;
      }
      if (this.asNotificationDetails.privileges.privilegesasms == 1) {
        this.regSmsPrivilegesApprove = true;
      }
      if (this.asNotificationDetails.privileges.privilegesaemail == 1) {
        this.regEmailPrivilegesApprove = true;
      }
      if (this.asNotificationDetails.privileges.privilegesrotp == 3) {
        this.regOtpPrivilegesReject = true;
      }
      if (this.asNotificationDetails.privileges.privilegesrsms == 3) {
        this.regSmsPrivilegesReject = true;
      }
      if (this.asNotificationDetails.privileges.privilegesremail == 3) {
        this.regEmailPrivilegesReject = true;
      }
      if (this.asNotificationDetails.suppliers.supplierspotp == 2) {
        this.regOtpSuppliersPending = true;
      }
      if (this.asNotificationDetails.suppliers.supplierspsms == 2) {
        this.regSmsSuppliersPending = true;
      }
      if (this.asNotificationDetails.suppliers.supplierspemail == 2) {
        this.regEmailSuppliersPending = true;
      }
      if (this.asNotificationDetails.suppliers.suppliersaotp == 1) {
        this.regOtpSuppliersApprove = true;
      }
      if (this.asNotificationDetails.suppliers.suppliersasms == 1) {
        this.regSmsSuppliersApprove = true;
      }
      if (this.asNotificationDetails.suppliers.suppliersaemail == 1) {
        this.regEmailSuppliersApprove = true;
      }
      if (this.asNotificationDetails.suppliers.suppliersrotp == 3) {
        this.regOtpSuppliersReject = true;
      }
      if (this.asNotificationDetails.suppliers.suppliersrsms == 3) {
        this.regSmsSuppliersReject = true;
      }
      if (this.asNotificationDetails.suppliers.suppliersremail == 3) {
        this.regEmailSuppliersReject = true;
      }
      if (this.asNotificationDetails.login.loginotp == 2) {
        this.regOtpLoginApprove = true;
      }
      if (this.asNotificationDetails.login.loginsms == 1) {
        this.regSmsLoginApprove = true;
      }
      if (this.asNotificationDetails.login.loginemail == 1) {
        this.regEmailLoginApprove = true;
      }
      if (this.asNotificationDetails.payments.paymentspotp == 2){
        this.regOtpPaymentPending = true;
      }
      if (this.asNotificationDetails.payments.paymentspemail == 2){
        this.regEmailPaymentPending = true;
      }
      if (this.asNotificationDetails.payments.paymentspsms == 2){
        this.regSmsPaymentPending = true;
      }
      if (this.asNotificationDetails.payments.paymentsaotp == 1){
        this.regOtpPaymentApprove = true;
      }
      if (this.asNotificationDetails.payments.paymentsaemail ==1){
        this.regEmailPaymentApprove = true;
      }
      if (this.asNotificationDetails.payments.paymentsasms == 1){
        this.regSmsPaymentApprove = true;
      }
      if (this.asNotificationDetails.payments.paymentsrotp == 3){
        this.regOtpPaymentReject = true;
      }
      if (this.asNotificationDetails.payments.paymentsremail == 3){
        this.regEmailPaymentReject = true;
      }
      if (this.asNotificationDetails.payments.paymentsrsms == 3){
        this.regSmsPaymentReject = true;
      }
    }else{
     
      console.log(this.isUnisup)
      this.regSmsUserPending=this.isAppruser
      this.regSmsUserApprove=this.isUniuser
      this.regEmailUserApprove=this.isUniuser
      this.regEmailUserReject=this.isUniuser
      this.regSmsUserReject=this.isUniuser
      this.regEmailUserPending=this.isAppruser
      this.regOtpUserApprove=this.isAppruser
      this.regSmsCardPending=this.isApprcard
      this.regSmsCardApprove=this.isUnicard
      this.regEmailCardApprove=this.isUnicard
      this.regEmailCardReject=this.isUnicard
      this.regSmsCardReject=this.isUnicard
      this.regEmailCardPending=this.isApprcard
      this.regOtpCardApprove=this.isApprcard
      this.regSmsPrivilegesPending=this.isAppruser
      this.regSmsPrivilegesApprove=this.isUniuser
      this.regEmailPrivilegesApprove=this.isUniuser
      this.regEmailPrivilegesReject=this.isUniuser
      this.regSmsPrivilegesReject=this.isUniuser
      this.regEmailPrivilegesPending=this.isAppruser
      this.regOtpPrivilegesApprove=this.isAppruser
      this.regSmsGroupPending=this.isApprgroup
      this.regSmsGroupApprove=this.isUnigroup
      this.regEmailGroupApprove=this.isUnigroup
      this.regEmailGroupReject=this.isUnigroup
      this.regSmsGroupReject=this.isUnigroup
      this.regEmailGroupPending=this.isApprgroup
      this.regOtpGroupApprove=this.isApprgroup
      this.regSmsRulePending=this.isRuleappr
      this.regSmsRuleApprove=this.isUnirule
      this.regEmailRuleApprove=this.isUnirule
      this.regEmailRuleReject=this.isUnirule
      this.regSmsRuleReject=this.isUnirule
      this.regEmailRulePending=this.isRuleappr
      this.regOtpRuleApprove=this.isRuleappr
      this.regSmsSuppliersPending=this.isApprsup
      this.regSmsSuppliersApprove=this.isUnisup
      this.regEmailSuppliersApprove=this.isUnisup
      this.regEmailSuppliersReject=this.isUnisup
      this.regSmsSuppliersReject=this.isUnisup
      this.regEmailSuppliersPending=this.isApprsup
      this.regOtpSuppliersApprove=this.isApprsup
      this.regSmsPaymentPending=this.isApprpay
      this.regSmsPaymentApprove=this.isUnipay
      this.regEmailPaymentApprove=this.isUnipay
      this.regEmailPaymentReject=this.isUnipay
      this.regSmsPaymentReject=this.isUnipay
      this.regEmailPaymentPending=this.isApprpay
      this.regOtpPaymentApprove=this.isApprpay
      this.regOtpLoginApprove=true;
      }
    
    //});
  }

  savematrixdata(): void {
    let obj: any = {};
    if (this.regOtpUserPending == true) {
      obj.userpotp = 2;
    } else {
      obj.userpotp = 0;
    }
    if (this.regSmsUserPending == true) {
      obj.userpsms = 2;
    } else {
      obj.userpsms = 0;
    }
    if (this.regEmailUserPending == true) {
      obj.userpemail = 2;
    } else {
      obj.userpemail = 0;
    }
    if (this.regOtpUserApprove == true) {
      obj.useraotp = 1;
    } else {
      obj.useraotp = 0;
    }
    if (this.regSmsUserApprove == true) {
      obj.userasms = 1;
    } else {
      obj.userasms = 0;
    }
    if (this.regEmailUserApprove == true) {
      obj.useraemail = 1;
    } else {
      obj.useraemail = 0;
    }
    if (this.regOtpUserReject == true) {
      obj.userrotp = 3;
    } else {
      obj.userrotp = 0;
    }
    if (this.regSmsUserReject == true) {
      obj.userrsms = 3;
    } else {
      obj.userrsms = 0;
    }
    if (this.regEmailUserReject == true) {
      obj.userremail = 3;
    } else {
      obj.userremail = 0;
    }
    if (this.regOtpCardPending == true) {
      obj.cardspotp = 2;
    } else {
      obj.cardspotp = 0;
    }
    if (this.regSmsCardPending == true) {
      obj.cardspsms = 2;
    } else {
      obj.cardspsms = 0;
    }
    if (this.regEmailCardPending == true) {
      obj.cardspemail = 2;
    } else {
      obj.cardspemail = 0;
    }
    if (this.regOtpCardApprove == true) {
      obj.cardsaotp = 1;
    } else {
      obj.cardsaotp = 0;
    }
    if (this.regSmsCardApprove == true) {
      obj.cardasms = 1;
    } else {
      obj.cardsasms = 0;
    }
    if (this.regEmailCardApprove == true) {
      obj.cardsaemail = 1;
    } else {
      obj.cardsaemail = 0;
    }
    if (this.regOtpCardReject == true) {
      obj.cardsrotp = 3;
    } else {
      obj.cardsrotp = 0;
    }
    if (this.regSmsCardReject == true) {
      obj.cardsrsms = 3;
    } else {
      obj.cardsrsms = 0;
    }
    if (this.regEmailCardReject == true) {
      obj.cardsremail = 3;
    } else {
      obj.cardsremail = 0;
    }
    if (this.regOtpGroupPending == true) {
      obj.grouppotp = 2;
    } else {
      obj.grouppotp = 0;
    }
    if (this.regSmsGroupPending == true) {
      obj.grouppsms = 2;
    } else {
      obj.grouppsms = 0;
    }
    if (this.regEmailGroupPending == true) {
      obj.grouppemail = 2;
    } else {
      obj.grouppemail = 0;
    }
    if (this.regOtpGroupApprove == true) {
      obj.groupaotp = 1;
    } else {
      obj.groupaotp = 0;
    }
    if (this.regSmsGroupApprove == true) {
      obj.groupasms = 1;
    } else {
      obj.groupasms = 0;
    }
    if (this.regEmailGroupApprove == true) {
      obj.groupaemail = 1;
    } else {
      obj.groupaemail = 0;
    }
    if (this.regOtpGroupReject == true) {
      obj.grouprotp = 3;
    } else {
      obj.grouprotp = 0;
    }
    if (this.regSmsGroupReject == true) {
      obj.grouprsms = 3;
    } else {
      obj.grouprsms = 0;
    }
    if (this.regEmailGroupReject == true) {
      obj.groupremail = 3;
    } else {
      obj.groupremail = 0;
    }
    if (this.regOtpRulePending == true) {
      obj.rulespotp = 2;
    } else {
      obj.rulespotp = 0;
    }
    if (this.regSmsRulePending == true) {
      obj.rulespsms = 2;
    } else {
      obj.rulespsms = 0;
    }
    if (this.regEmailRulePending == true) {
      obj.rulespemail = 2;
    } else {
      obj.rulespemail = 0;
    }
    if (this.regOtpRuleApprove == true) {
      obj.rulesaotp = 1;
    } else {
      obj.rulesaotp = 0;
    }
    if (this.regSmsRuleApprove == true) {
      obj.rulesasms = 1;
    } else {
      obj.rulesasms = 0;
    }
    if (this.regEmailRuleApprove == true) {
      obj.rulesaemail = 1;
    } else {
      obj.rulesaemail = 0;
    }
    if (this.regOtpRuleReject == true) {
      obj.rulesrotp = 3;
    } else {
      obj.rulesrotp = 0;
    }
    if (this.regSmsRuleReject == true) {
      obj.rulesrsms = 3;
    } else {
      obj.rulesrsms = 0;
    }
    if (this.regEmailRuleReject == true) {
      obj.rulesremail = 3;
    } else {
      obj.rulesremail = 0;
    }
    if (this.regOtpPrivilegesPending == true) {
      obj.privilegespotp = 2;
    } else {
      obj.privilegespotp = 0;
    }
    if (this.regSmsPrivilegesPending == true) {
      obj.privilegespsms = 2;
    } else {
      obj.privilegespsms = 0;
    }
    if (this.regEmailPrivilegesPending == true) {
      obj.privilegespemail = 2;
    } else {
      obj.privilegespemail = 0;
    }
    if (this.regOtpPrivilegesApprove == true) {
      obj.privilegesaotp = 1;
    } else {
      obj.privilegesaotp = 0;
    }
    if (this.regSmsPrivilegesApprove == true) {
      obj.privilegesasms = 1;
    } else {
      obj.privilegesasms = 0;
    }
    if (this.regEmailPrivilegesApprove == true) {
      obj.privilegesaemail = 1;
    } else {
      obj.privilegesaemail = 0;
    }
    if (this.regOtpPrivilegesReject == true) {
      obj.privilegesrotp = 3;
    } else {
      obj.privilegesrotp = 0;
    }
    if (this.regSmsPrivilegesReject == true) {
      obj.privilegesrsms = 3;
    } else {
      obj.privilegesrsms = 0;
    }
    if (this.regEmailPrivilegesReject == true) {
      obj.privilegesremail = 3;
    } else {
      obj.privilegesremail = 0;
    }
    if (this.regOtpSuppliersPending == true) {
      obj.supplierspotp = 2;
    } else {
      obj.supplierspotp = 0;
    }
    if (this.regSmsSuppliersPending == true) {
      obj.supplierspsms = 2;
    } else {
      obj.supplierspsms = 0;
    }
    if (this.regEmailSuppliersPending == true) {
      obj.supplierspemail = 2;
    } else {
      obj.supplierspemail = 0;
    }
    if (this.regOtpSuppliersApprove == true) {
      obj.suppliersaotp = 1;
    } else {
      obj.suppliersaotp = 0;
    }
    if (this.regSmsSuppliersApprove == true) {
      obj.suppliersasms = 1;
    } else {
      obj.suppliersasms = 0;
    }
    if (this.regEmailSuppliersApprove == true) {
      obj.suppliersaemail = 1;
    } else {
      obj.suppliersaemail = 0;
    }
    if (this.regOtpSuppliersReject == true) {
      obj.suppliersrotp = 3;
    } else {
      obj.suppliersrotp = 0;
    }
    if (this.regSmsSuppliersReject == true) {
      obj.suppliersrsms = 3;
    } else {
      obj.suppliersrsms = 0;
    }
    if (this.regEmailSuppliersReject == true) {
      obj.suppliersremail = 3;
    } else {
      obj.suppliersremail = 0;
    }
    if (this.regOtpLoginApprove == true) {
      obj.loginotp = 2;
    } else {
      obj.loginotp = 0;
    }
    if (this.regSmsLoginApprove == true) {
      obj.loginsms = 1;
    } else {
      obj.loginsms = 0;
    }
    if (this.regEmailLoginApprove == true) {
      obj.loginemail = 1;
    } else {
      obj.loginemail = 0;
    }
    if (this.regOtpPaymentPending == true){
      obj.paymentspotp = 2;
    }else{
      obj.paymentspotp = 0;
    }
    if (this.regSmsPaymentPending == true)
    {
      obj.paymentspsms = 2;
    }else{
       obj.paymentspsms = 0;
    }
    if (this.regEmailPaymentPending == true)
    {
      obj.paymentspemail = 2;
    }else{
      obj.paymentspemail = 0;
    }
    if (this.regOtpPaymentApprove == true)
    {
      obj.paymentsaotp = 1;
    }else{
      obj.paymentsaotp = 0;
    }
    if (this.regSmsPaymentApprove == true)
    {
      obj.paymentsasms = 1;
    }else{
      obj.paymentsasms = 0;
    }
    if (this.regEmailPaymentApprove == true){
      obj.paymentsaemail = 1;
    }else{
      obj.paymentsaemail = 0;
    }
    if (this.regOtpPaymentReject == true)
    {
      obj.paymentsrotp = 3;
    }else{
      obj.paymentsrotp = 0;
    }
    if (this.regSmsPaymentReject == true)
    {
      obj.paymentsrsms = 3;
    }else{
      obj.paymentsrsms = 0;
    }
    if (this.regEmailPaymentReject == true)
    {
      obj.paymentsremail = 3;
    }else{
      obj.paymentsremail = 0;
    }
    this.enableMe = false;
    this.Showme = false;
    console.log(obj)
    // this.asNotificationMatrixService.sendNotificationDetails(obj).then(resp => {
    //   this.myNotificationDetails = resp.data;
    // });
  }

  resetmatrixdata():void {
    this.enableLogin=true;
     if(this.isUniuser){
     //this.enOtpUserPending=this.isUniuser
     this.enSmsUserApprove=this.isUniuser
     this.enEmailUserApprove=this.isUniuser
     this.enSmsUserReject=this.isUniuser
     this.enEmailUserReject=this.isUniuser
     }
     if(this.isAppruser){
       this.enOtpUserApprove=this.isAppruser
       //this.enOtpUserReject=this.isAppruser
       this.enSmsUserPending=this.isAppruser
       this.enEmailUserPending=this.isAppruser
     }
     if(this.isUniuser){
       //this.enOtpUserPending=this.isUniuser
       this.enSmsPrivilegesApprove=this.isUniuser
       this.enEmailPrivilegesApprove=this.isUniuser
       this.enSmsPrivilegesReject=this.isUniuser
       this.enEmailPrivilegesReject=this.isUniuser
       }
       if(this.isAppruser){
         this.enOtpPrivilegesApprove=this.isAppruser
         //this.enOtpUserReject=this.isAppruser
         this.enSmsPrivilegesPending=this.isAppruser
         this.enEmailPrivilegesPending=this.isAppruser
       }
     if(this.isUnicard){
       //this.enOtpCardPending=this.isUnicard
       this.enSmsCardApprove=this.isUnicard
       this.enEmailCardApprove=this.isUnicard
       this.enSmsCardReject=this.isUnicard
       this.enEmailCardReject=this.isUnicard
     }
     if(this.isApprcard){
       this.enOtpCardApprove=this.isApprcard
       this.enSmsCardPending=this.isApprcard
       this.enEmailCardPending=this.isApprcard
     } 
 
     if(this.isUnigroup){
       //this.enOtpCardPending=this.isUnicard
       this.enSmsGroupApprove=this.isUnigroup
       this.enEmailGroupApprove=this.isUnigroup
       this.enSmsGroupReject=this.isUnigroup
       this.enEmailGroupReject=this.isUnigroup
     }
     if(this.isApprgroup){
       this.enOtpGroupApprove=this.isApprgroup
       this.enSmsGroupPending=this.isApprgroup
       this.enEmailGroupPending=this.isApprgroup
     } 
 
     if(this.isUnirule){
       //this.enOtpCardPending=this.isUnicard
       this.enSmsRuleApprove=this.isUnirule
       this.enEmailRuleApprove=this.isUnirule
       this.enSmsRuleReject=this.isUnirule
       this.enEmailRuleReject=this.isUnirule
     }
     if(this.isRuleappr){
       this.enOtpRuleApprove=this.isRuleappr
       this.enSmsRulePending=this.isRuleappr
       this.enEmailRulePending=this.isRuleappr
     } 
 
     if(this.isUnisup){
       //this.enOtpCardPending=this.isUnicard
       this.enSmsSuppliersApprove=this.isUnisup
       this.enEmailSuppliersApprove=this.isUnisup
       this.enSmsSuppliersReject=this.isUnisup
       this.enEmailSuppliersReject=this.isUnisup
     }
     if(this.isApprsup){
       this.enOtpSuppliersApprove=this.isApprsup
       this.enSmsSuppliersPending=this.isApprsup
       this.enEmailSuppliersPending=this.isApprsup
     }
 
     if(this.isUnipay){
       //this.enOtpCardPending=this.isUnicard
       this.enSmsPaymentApprove=this.isUnipay
       this.enEmailPaymentApprove=this.isUnipay
       this.enSmsPaymentReject=this.isUnipay
       this.enEmailPaymentReject=this.isUnipay
     }
     if(this.isApprpay){
       this.enOtpPaymentApprove=this.isApprpay
       this.enSmsPaymentPending=this.isApprpay
       this.enEmailPaymentPending=this.isApprpay
     }
     this.Showme = true;
   }

   checkValInArray(tabid:string , tab_array:string[]){
  
    return (tab_array.indexOf(tabid)==-1)?false:true;
}

clickRegTab(){
  this.registrationtab=true;
  this.usertab=true;
  this.paymenttab=false;
  this.billertab=false;
  this.ruletab=false;
  this.grouptab=false;
  this.cardtab=false;
  this.logintab=false;
}
clickPayTab(){
  this.registrationtab=false;
  this.usertab=false;
  this.paymenttab=true;
  this.billertab=false;
  this.ruletab=false;
  this.grouptab=false;
  this.cardtab=false;
  this.logintab=false;
}

clickLoginTab(){
  this.registrationtab=false;
  this.usertab=false;
  this.paymenttab=false;
  this.billertab=false;
  this.ruletab=false;
  this.grouptab=false;
  this.cardtab=false;
  this.logintab=true;
}

clickUserTab(){
  this.registrationtab=true;
  this.usertab=true;
  this.paymenttab=false;
  this.billertab=false;
  this.ruletab=false;
  this.grouptab=false;
  this.cardtab=false;
  this.logintab=false;
}

clickCardTab(){
  this.registrationtab=true;
  this.usertab=false;
  this.paymenttab=false;
  this.billertab=false;
  this.ruletab=false;
  this.grouptab=false;
  this.cardtab=true;
  this.logintab=false;
}

clickGroupTab(){
  this.registrationtab=true;
  this.usertab=false;
  this.paymenttab=false;
  this.billertab=false;
  this.ruletab=false;
  this.grouptab=true;
  this.cardtab=false;
  this.logintab=false;
}
clickRuleTab(){
  this.registrationtab=true;
  this.usertab=false;
  this.paymenttab=false;
  this.billertab=false;
  this.ruletab=true;
  this.grouptab=false;
  this.cardtab=false;
  this.logintab=false;
}

clickbillTab(){
  this.registrationtab=true;
  this.usertab=false;
  this.paymenttab=false;
  this.billertab=true;
  this.ruletab=false;
  this.grouptab=false;
  this.cardtab=false;
  this.logintab=false;
}

}
