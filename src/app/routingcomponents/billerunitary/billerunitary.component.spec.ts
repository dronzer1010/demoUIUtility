import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerUnitaryComponent } from './billerunitary.component';

describe('MakerBillerUnitaryComponent', () => {
  let component: BillerUnitaryComponent;
  let fixture: ComponentFixture<BillerUnitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerUnitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerUnitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
