import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundviewComponent } from './refundview.component';

describe('RefundviewComponent', () => {
  let component: RefundviewComponent;
  let fixture: ComponentFixture<RefundviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
