import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmreportnameComponent } from './rmreportname.component';

describe('RmreportnameComponent', () => {
  let component: RmreportnameComponent;
  let fixture: ComponentFixture<RmreportnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmreportnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmreportnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
