import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpuserComponent } from './otpuser.component';

describe('OtpuserComponent', () => {
  let component: OtpuserComponent;
  let fixture: ComponentFixture<OtpuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
