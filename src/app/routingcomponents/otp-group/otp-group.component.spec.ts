import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpGroupComponent } from './otp-group.component';

describe('OtpGroupComponent', () => {
  let component: OtpGroupComponent;
  let fixture: ComponentFixture<OtpGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
