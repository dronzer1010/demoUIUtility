import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmpaymentsComponent } from './rmpayments.component';

describe('RmpaymentsComponent', () => {
  let component: RmpaymentsComponent;
  let fixture: ComponentFixture<RmpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
