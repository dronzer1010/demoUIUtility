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
import { AuthGuard } from './gaurd/auth.gaurd';
import { SetpasswordComponent } from './authentication/setpassword/setpassword.component';
import { GeneratepasswordComponent } from './authentication/generatepassword/generatepassword.component'
import { BackusrupComponent } from './supportingcomponents/backusrup/backusrup.component';
const appRoutes: Routes = [ 
    { path:'main',component:UserhomeComponent,
    children:[
    {path:'pending-biller',component:PendingBillerComponent,canActivate: [AuthGuard]},
    {path:'unitary-biller',component:BillerUnitaryComponent,canActivate: [AuthGuard]},
    {path:'billerlist',component:BillerlistComponent,canActivate: [AuthGuard]},
    {path:'paymentlist',component:PaymentListComponent,canActivate: [AuthGuard]},
    {path:'make-payment',component:MakePaymentComponent,canActivate: [AuthGuard]},
    {path:'pending-payments',component:PendingPaymentsComponent,canActivate: [AuthGuard]},
    //{path:'maker-biller-bulk',component:MakerBillerBulkComponent},  
    {path:'biller-bulk',component:BillerBulkComponent,canActivate: [AuthGuard]}, 
    {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},                                                                                                              
    {path:'otp-approve-payment',component:OtpapprovePaymentComponent,canActivate: [AuthGuard]},
    {path:'otp-approve-biller',component:OtpapproveBillerComponent,canActivate: [AuthGuard]},
    {path:'cardview',component:CardviewComponent,canActivate: [AuthGuard]},
    {path:'profile',component:MyprofileComponent,canActivate: [AuthGuard]},
    {path:'userview',component:UserviewComponent,canActivate: [AuthGuard]},
    {path:'unitary-user',component:UserunitaryComponent,canActivate: [AuthGuard]},
    {path:'unitary-group',component:UnitarygroupComponent,canActivate: [AuthGuard]},
    {path:'unitary-rule',component:UnitaryruleComponent,canActivate: [AuthGuard]},
    {path:'groupview',component:GroupviewComponent,canActivate: [AuthGuard]},
    {path:'ruleview',component:RuleviewComponent,canActivate: [AuthGuard]},
    {path:'unitary-card',component:CardunitaryComponent,canActivate: [AuthGuard]},
    {path:'user-bulk',component:UserbulkComponent,canActivate: [AuthGuard]},
    {path:'pending-user',component:PendingusersComponent,canActivate: [AuthGuard]},
    {path:'pending-group',component:PendinggroupsComponent,canActivate: [AuthGuard]},
    {path:'pending-rules',component:PendingrulesComponent,canActivate: [AuthGuard]},
    {path:'organisation',component:OrganisationComponent,canActivate: [AuthGuard]},
    {path:'pending-card',component:PendingcardsComponent,canActivate: [AuthGuard]},
    {path:'successmsg',component:SuccessComponent,canActivate: [AuthGuard]},
    {path:'otp-user/:ids',component:OtpuserComponent,canActivate: [AuthGuard]},
    {path:'otp-card/:ids',component:OtpCardComponent,canActivate: [AuthGuard]},
    {path:'otp-group/:ids',component:OtpGroupComponent,canActivate: [AuthGuard]},
    {path:'otp-rule/:ids',component:OtpRuleComponent,canActivate: [AuthGuard]},
    {path:'rejectmsg',component:RejectmsgComponent,canActivate: [AuthGuard]},
    {path:'notification',component:NotificationmatrixComponent,canActivate: [AuthGuard]},
    {path:'repository',component:RepositoryComponent,canActivate: [AuthGuard]},
    {path:'sample-bills',component:SamplebillsComponent,canActivate: [AuthGuard]},
    {path:'templates',component:TemplatesComponent,canActivate: [AuthGuard]}
]},

    // otherwise redirect to home
    {path:'',component:LoginComponent},  
    {path:'otp',component:OtpComponent,canActivate: [AuthGuard]},  
    {path:'setpassword',component:SetpasswordComponent}, 
    {path:'gen-pwd',component:GeneratepasswordComponent},
    {path:'firstlogin',component:AccountsetupComponent},
    { path : 'useruploadback', component: BackusrupComponent},
    
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});