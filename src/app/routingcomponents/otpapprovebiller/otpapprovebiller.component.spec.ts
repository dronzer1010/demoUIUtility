import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpapproveBillerComponent } from './otpapprovebiller.component';

describe('OtpapproveComponent', () => {
  let component: OtpapproveBillerComponent;
  let fixture: ComponentFixture<OtpapproveBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpapproveBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpapproveBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
