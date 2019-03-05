import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerApprovePaymentsComponent } from './checker-approve-payments.component';

describe('CheckerApprovePaymentsComponent', () => {
  let component: CheckerApprovePaymentsComponent;
  let fixture: ComponentFixture<CheckerApprovePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerApprovePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerApprovePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
