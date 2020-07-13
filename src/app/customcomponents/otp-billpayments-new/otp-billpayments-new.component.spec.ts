import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpBillpaymentsNewComponent } from './otp-billpayments-new.component';

describe('OtpBillpaymentsNewComponent', () => {
  let component: OtpBillpaymentsNewComponent;
  let fixture: ComponentFixture<OtpBillpaymentsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpBillpaymentsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpBillpaymentsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
