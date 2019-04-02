import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routingcomponents/dashboard/dashboard.component';
import { PendingBillerComponent } from './routingcomponents/pendingbiller/pendingbiller.component';
import { BillerUnitaryComponent } from './routingcomponents/billerunitary/billerunitary.component';
import { BillerlistComponent } from './routingcomponents/billerlist/billerlist.component';
import { PaymentListComponent } from './routingcomponents/paymentlist/paymentlist.component';
import { MakePaymentComponent } from './routingcomponents/makepayment/makepayment.component';
import { PendingPaymentsComponent } from './routingcomponents/pendingpayments/pendingpayments.component';
import { MakerBillerBulkComponent } from './routingcomponents/maker-biller-bulk/maker-biller-bulk.component';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { StartpageComponent } from './startpage/startpage.component';
import { OtpapprovePaymentComponent } from './routingcomponents/otpapprovepayment/otpapprovepayment.component';
import { OtpapproveBillerComponent } from './routingcomponents/otpapprovebiller/otpapprovebiller.component';
import { CardviewComponent } from './routingcomponents/cardview/cardview.component';
import { MyprofileComponent } from './supportingcomponents/myprofile/myprofile.component';
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
import { NotificationmatrixComponent } from './supportingcomponents/notificationmatrix/notificationmatrix.component'
import { RepositoryComponent } from './supportingcomponents/repository/repository.component';
import { SamplebillsComponent } from './supportingcomponents/samplebills/samplebills.component';
import { TemplatesComponent } from './supportingcomponents/templates/templates.component'
import { BillerBulkComponent } from './routingcomponents/billerbulk/billerbulk.component';

const appRoutes: Routes = [ 
    { path:'main',component:UserhomeComponent,
    children:[
    {path:'pending-biller',component:PendingBillerComponent},
    {path:'unitary-biller',component:BillerUnitaryComponent},
    {path:'billerlist',component:BillerlistComponent},
    {path:'paymentlist',component:PaymentListComponent},
    {path:'make-payment',component:MakePaymentComponent},
    {path:'pending-payments',component:PendingPaymentsComponent},
    //{path:'maker-biller-bulk',component:MakerBillerBulkComponent},  
    {path:'biller-bulk',component:BillerBulkComponent}, 
    {path:'dashboard',component:DashboardComponent},                                                                                                              
    {path:'otp-approve-payment',component:OtpapprovePaymentComponent},
    {path:'otp-approve-biller',component:OtpapproveBillerComponent},
    {path:'cardview',component:CardviewComponent},
    {path:'profile',component:MyprofileComponent},
    {path:'userview',component:UserviewComponent},
    {path:'unitary-user',component:UserunitaryComponent},
    {path:'unitary-group',component:UnitarygroupComponent},
    {path:'unitary-rule',component:UnitaryruleComponent},
    {path:'groupview',component:GroupviewComponent},
    {path:'ruleview',component:RuleviewComponent},
    {path:'unitary-card',component:CardunitaryComponent},
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
    {path:'rejectmsg',component:RejectmsgComponent},
    {path:'notification',component:NotificationmatrixComponent},
    {path:'repository',component:RepositoryComponent},
    {path:'sample-bills',component:SamplebillsComponent},
    {path:'templates',component:TemplatesComponent}
]},

    // otherwise redirect to home
    {path:'',component:LoginComponent},  
    {path:'otp',component:OtpComponent},  
    
    {path:'firstlogin',component:AccountsetupComponent},
    
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);