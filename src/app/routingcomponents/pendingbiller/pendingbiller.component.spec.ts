import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillerComponent } from './pendingbiller.component';

describe('CheckerApproveBillerComponent', () => {
  let component: PendingBillerComponent;
  let fixture: ComponentFixture<PendingBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
