import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmfetchreportComponent } from './rmfetchreport.component';

describe('RmfetchreportComponent', () => {
  let component: RmfetchreportComponent;
  let fixture: ComponentFixture<RmfetchreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmfetchreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmfetchreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
