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

const appRoutes: Routes = [ 
    {path:'pending-biller',component:CheckerApproveBillerComponent},
    {path:'unitary-biller',component:MakerBillerUnitaryComponent},
    {path:'billerlist',component:BillerlistComponent},
    {path:'dashboard-maker',component:DashboardMakerComponent},
    {path:'maker-payment-list',component:MakerPaymentListComponent},
    {path:'make-payment',component:MakerMakePaymentComponent},
    {path:'checker-approve-payments',component:CheckerApprovePaymentsComponent},
    {path:'maker-biller-bulk',component:MakerBillerBulkComponent},  
    {path:'login',component:LoginComponent},  
    {path:'otp',component:OtpComponent},  
    {path:'login_checker',component:LoginCheckerComponent}, 
    {path:'otp_checker',component:OtpCheckerComponent},
    {path:'landing',component:StartpageComponent},
    {path:'checker-biller',component:CheckerBillersComponent}, 
    {path:'checker-payments',component:CheckerPaymentsComponent},
    {path:'dashboard-checker',component:DashboardCheckerComponent},                                                                                                              
    {path:'checker-payment-list',component:CheckerPaymentListComponent},
    {path:'maker-biller-list',component:MakerBillerListComponent},
    {path:'otp-approve-payment',component:OtpapprovePaymentComponent},
    {path:'otp-approve-biller',component:OtpapproveBillerComponent},
    {path:'cardview',component:CardviewComponent},
    {path:'cardview-checker',component:CardviewCheckerComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);