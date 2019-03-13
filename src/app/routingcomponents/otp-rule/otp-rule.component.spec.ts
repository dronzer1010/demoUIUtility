import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpRuleComponent } from './otp-rule.component';

describe('OtpRuleComponent', () => {
  let component: OtpRuleComponent;
  let fixture: ComponentFixture<OtpRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
