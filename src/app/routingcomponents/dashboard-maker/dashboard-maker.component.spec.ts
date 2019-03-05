import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMakerComponent } from './dashboard-maker.component';

describe('DashboardMakerComponent', () => {
  let component: DashboardMakerComponent;
  let fixture: ComponentFixture<DashboardMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
