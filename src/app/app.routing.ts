import { Routes, RouterModule } from '@angular/router';
import { DashboardCheckerComponent } from './routingcomponents/dashboard-checker/dashboard-checker.component';
import { CheckerApproveBillerComponent } from './routingcomponents/checker-approve-biller/checker-approve-biller.component';
import { MakerBillerUnitaryComponent } from './routingcomponents/maker-biller-unitary/maker-biller-unitary.component';
import { BillerlistComponent } from './routingcomponents/billerlist/billerlist.component';
import { DashboardMakerComponent } from './routingcomponents/dashboard-maker/dashboard-maker.component';
import { MakerPaymentListComponent } from './routingcomponents/maker-payment-list/maker-payment-list.component';
import { MakerMakePaymentComponent } from './routingcomponents/maker-make-payment/maker-make-payment.component';
import { CheckerApprovePaymentsComponent } from './routingcomponents/checker-approve-payments/checker-approve-payments.component';
import { MakerBillerBulkComponent } from './routingcomponents/maker-biller-bulk/maker-biller-bulk.component';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { LoginCheckerComponent } from './authentication/login-checker/login-checker.component';
import { OtpCheckerComponent } from './authentication/otp-checker/otp-checker.component';
import { StartpageComponent } from './startpage/startpage.component';
import { CheckerBillersComponent } from './routingcomponents/checker-billers/checker-billers.component';
import { CheckerPaymentsComponent } from './routingcomponents/checker-payments/checker-payments.component';
import { CheckerPaymentListComponent } from './routingcomponents/checker-payment-list/checker-payment-list.component'
import { MakerBillerListComponent } from './routingcomponents/maker-biller-list/maker-biller-list.component'
import { OtpapprovePaymentComponent } from './routingcomponents/otpapprovepayment/otpapprovepayment.component';
import { OtpapproveBillerComponent } from './routingcomponents/otpapprovebiller/otpapprovebiller.component';
import { CardviewComponent } from './routingcomponents/cardview/cardview.component';
import { CardviewCheckerComponent } from './routingcomponents/cardview-checker/cardview-checker.component';
import { MyprofileMakerComponent } from './supportingcomponents/myprofile-maker/myprofile-maker.component';
import { MyprofileCheckerComponent } from './supportingcomponents/myprofile-checker/myprofile-checker.component';
import { UserunitaryComponent } from './routingcomponents/userunitary/userunitary.component';
import { CardunitaryComponent } from './routingcomponents/cardunitary/cardunitary.component';
import { UserbulkComponent } from './routingcomponents/userbulk/userbulk.component';
import { UnitarygroupComponent } from './routingcomponents/unitarygroup/unitarygroup.component';
import { UnitaryruleComponent } from './routingcomponents/unitaryrule/unitaryrule.component';
import { UserviewComponent } from './routingcomponents/userview/userview.component';
import { GroupviewComponent } from './routingcomponents/groupview/groupview.component';
import { RuleviewComponent } from './routingcomponents/ruleview/ruleview.component';
import { AccountsetupComponent } from './routingcomponents/accountsetup/accountsetup.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { OrganisationComponent } from './routingcomponents/organisation/organisation.component';
import { PendingusersComponent } from './routingcomponents/pendingusers/pendingusers.component';
import { PendinggroupsComponent } from './routingcomponents/pendinggroups/pendinggroups.component';
import { PendingrulesComponent } from './routingcomponents/pendingrules/pendingrules.component';
import { PendingcardsComponent } from './routingcomponents/pendingcards/pendingcards.component';
import { SuccessComponent } from './supportingcomponents/success/success.component';
import { OtpuserComponent } from './routingcomponents/otpuser/otpuser.component';
import { RejectmsgComponent } from './supportingcomponents/rejectmsg/rejectmsg.component';
import { OtpCardComponent } from './routingcomponents/otp-card/otp-card.component';
import { OtpRuleComponent } from './routingcomponents/otp-rule/otp-rule.component';
import { OtpGroupComponent } from './routingcomponents/otp-group/otp-group.component';


const appRoutes: Routes = [ 
    { path:'main',component:UserhomeComponent,
    children:[
    {path:'pending-biller',component:CheckerApproveBillerComponent},
    {path:'unitary-biller',component:MakerBillerUnitaryComponent},
    {path:'billerlist',component:BillerlistComponent},
    // {path:'dashboard-maker',component:DashboardMakerComponent},
    {path:'maker-payment-list',component:MakerPaymentListComponent},
    {path:'make-payment',component:MakerMakePaymentComponent},
    {path:'checker-approve-payments',component:CheckerApprovePaymentsComponent},
    {path:'maker-biller-bulk',component:MakerBillerBulkComponent},  
    {path:'checker-biller',component:CheckerBillersComponent}, 
    {path:'checker-payments',component:CheckerPaymentsComponent},
    {path:'dashboard',component:DashboardCheckerComponent},                                                                                                              
    {path:'checker-payment-list',component:CheckerPaymentListComponent},
    {path:'maker-biller-list',component:MakerBillerListComponent},
    {path:'otp-approve-payment',component:OtpapprovePaymentComponent},
    {path:'otp-approve-biller',component:OtpapproveBillerComponent},
    {path:'cardview',component:CardviewComponent},
    {path:'cardview-checker',component:CardviewCheckerComponent},
    {path:'profile',component:MyprofileMakerComponent},
    {path:'profile-checker',component:MyprofileCheckerComponent},
    {path:'userview',component:UserviewComponent},
    {path:'unitary-user',component:UserunitaryComponent},
    {path:'unitary-group',component:UnitarygroupComponent},
    {path:'unitary-rule',component:UnitaryruleComponent},
    {path:'groupview',component:GroupviewComponent},
    {path:'ruleview',component:RuleviewComponent},
    {path:'unitary-card',component:CardunitaryComponent},
    {path:'firstlogin',component:AccountsetupComponent},
    {path:'user-bulk',component:UserbulkComponent},
    {path:'pending-user',component:PendingusersComponent},
    {path:'pending-group',component:PendinggroupsComponent},
    {path:'pending-rules',component:PendingrulesComponent},
    {path:'organisation',component:OrganisationComponent},
    {path:'pending-card',component:PendingcardsComponent},
    {path:'successmsg',component:SuccessComponent},
    {path:'otp-user',component:OtpuserComponent},
    {path:'otp-card',component:OtpCardComponent},
    {path:'otp-group',component:OtpGroupComponent},
    {path:'otp-rule',component:OtpRuleComponent},
    {path:'rejectmsg',component:RejectmsgComponent}
]},

    // otherwise redirect to home
    {path:'',component:LoginComponent},  
    {path:'otp',component:OtpComponent},  
    {path:'login_checker',component:LoginCheckerComponent}, 
    {path:'otp_checker',component:OtpCheckerComponent},
    
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);