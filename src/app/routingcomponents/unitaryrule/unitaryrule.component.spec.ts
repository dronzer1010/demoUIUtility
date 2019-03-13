import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitaryruleComponent } from './unitaryrule.component';

describe('UnitaryruleComponent', () => {
  let component: UnitaryruleComponent;
  let fixture: ComponentFixture<UnitaryruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitaryruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitaryruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
