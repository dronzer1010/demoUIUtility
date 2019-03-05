import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerApproveBillerComponent } from './checker-approve-biller.component';

describe('CheckerApproveBillerComponent', () => {
  let component: CheckerApproveBillerComponent;
  let fixture: ComponentFixture<CheckerApproveBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerApproveBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerApproveBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
