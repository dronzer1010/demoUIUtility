import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpBillsNewComponent } from './otp-bills-new.component';

describe('OtpBillsNewComponent', () => {
  let component: OtpBillsNewComponent;
  let fixture: ComponentFixture<OtpBillsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpBillsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpBillsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
