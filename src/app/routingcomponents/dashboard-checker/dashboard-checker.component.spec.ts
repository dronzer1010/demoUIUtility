import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCheckerComponent } from './dashboard-checker.component';

describe('DashboardCheckerComponent', () => {
  let component: DashboardCheckerComponent;
  let fixture: ComponentFixture<DashboardCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
