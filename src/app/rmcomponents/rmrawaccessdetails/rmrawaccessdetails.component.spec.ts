import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrawaccessdetailsComponent } from './rmrawaccessdetails.component';

describe('RmrawaccessdetailsComponent', () => {
  let component: RmrawaccessdetailsComponent;
  let fixture: ComponentFixture<RmrawaccessdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrawaccessdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrawaccessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
