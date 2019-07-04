import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmdashboardComponent } from './rmdashboard.component';

describe('RmdashboardComponent', () => {
  let component: RmdashboardComponent;
  let fixture: ComponentFixture<RmdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
