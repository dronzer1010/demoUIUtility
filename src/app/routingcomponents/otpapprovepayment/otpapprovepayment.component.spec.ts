import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpapproveComponent } from './otpapprovepayment.component';

describe('OtpapproveComponent', () => {
  let component: OtpapproveComponent;
  let fixture: ComponentFixture<OtpapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
