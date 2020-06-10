import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillerComponent } from './view-biller.component';

describe('ViewBillerComponent', () => {
  let component: ViewBillerComponent;
  let fixture: ComponentFixture<ViewBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
