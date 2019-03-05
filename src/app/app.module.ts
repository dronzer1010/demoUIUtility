import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { DashboardCheckerComponent } from './routingcomponents/dashboard-checker/dashboard-checker.component';
import { CheckerApproveBillerComponent } from './routingcomponents/checker-approve-biller/checker-approve-biller.component';
import {MatDialogModule} from '@angular/material/dialog';
//import {  } from './routingcomponents/checker-approve-biller/checker-approve-biller.component';
import { HttpClientModule } from '@angular/common/http'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
// import * as $ from 'jquery';
import { MakerBillerUnitaryComponent } from './routingcomponents/maker-biller-unitary/maker-biller-unitary.component';
import { BillerlistComponent } from './routingcomponents/billerlist/billerlist.component';
import { HeaderComponent } from './supportingcomponents/header/header.component';
import {DataTableModule} from "angular2-datatable";
import { DashboardMakerComponent } from './routingcomponents/dashboard-maker/dashboard-maker.component';
import { MakerPaymentListComponent } from './routingcomponents/maker-payment-list/maker-payment-list.component';
import { MakerMakePaymentComponent } from './routingcomponents/maker-make-payment/maker-make-payment.component';
import { MatRadioModule, MatCheckboxModule, MatSelectModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { CheckerApprovePaymentsComponent } from './routingcomponents/checker-approve-payments/checker-approve-payments.component';
import { MakerBillerBulkComponent } from './routingcomponents/maker-biller-bulk/maker-biller-bulk.component';
// import { OwlModule } from 'ngx-owl-carousel';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { LoginCheckerComponent } from './authentication/login-checker/login-checker.component';
import { OtpCheckerComponent } from './authentication/otp-checker/otp-checker.component';
import { StartpageComponent } from './startpage/startpage.component';
import { HeadercheckerComponent } from './supportingcomponents/headerchecker/headerchecker.component';
import { CheckerBillersComponent } from './routingcomponents/checker-billers/checker-billers.component';
import { CheckerPaymentsComponent } from './routingcomponents/checker-payments/checker-payments.component';
import {AutoTabDirective} from './directives/autotab.directive';
import { CheckerPaymentListComponent } from './routingcomponents/checker-payment-list/checker-payment-list.component';
import { MakerBillerListComponent } from './routingcomponents/maker-biller-list/maker-biller-list.component'

import { CarouselModule } from 'ngx-owl-carousel-o';
import { OtpapproveComponent } from './routingcomponents/otpapprove/otpapprove.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardCheckerComponent,
    CheckerApproveBillerComponent,
    MakerBillerUnitaryComponent,
    BillerlistComponent,
    HeaderComponent,
    DashboardMakerComponent,
    MakerPaymentListComponent,
    MakerMakePaymentComponent,   
    CheckerApprovePaymentsComponent,
    MakerBillerBulkComponent,
    LoginComponent,
    OtpComponent,
    LoginCheckerComponent,
    OtpCheckerComponent,
    StartpageComponent,
    HeadercheckerComponent,
    CheckerBillersComponent,
    CheckerPaymentsComponent,
    AutoTabDirective,
    CheckerPaymentListComponent,
    MakerBillerListComponent,
    OtpapproveComponent    
   
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    //MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    // MatRadioModule,
    // MatSelectModule,
    MatDialogModule,
    CarouselModule ,
    HttpClientModule,


MatNativeDateModule,
    
    DataTableModule,
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
