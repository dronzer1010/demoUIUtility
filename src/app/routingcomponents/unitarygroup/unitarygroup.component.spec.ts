import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitarygroupComponent } from './unitarygroup.component';

describe('UnitarygroupComponent', () => {
  let component: UnitarygroupComponent;
  let fixture: ComponentFixture<UnitarygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitarygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitarygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
