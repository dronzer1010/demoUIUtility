import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmorganisationdetailComponent } from './rmorganisationdetail.component';

describe('RmorganisationdetailComponent', () => {
  let component: RmorganisationdetailComponent;
  let fixture: ComponentFixture<RmorganisationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmorganisationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmorganisationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
