import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeOtpComponent } from './first-time-otp.component';

describe('FirstTimeOtpComponent', () => {
  let component: FirstTimeOtpComponent;
  let fixture: ComponentFixture<FirstTimeOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
