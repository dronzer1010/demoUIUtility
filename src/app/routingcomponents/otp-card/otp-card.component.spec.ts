import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCardComponent } from './otp-card.component';

describe('OtpCardComponent', () => {
  let component: OtpCardComponent;
  let fixture: ComponentFixture<OtpCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
