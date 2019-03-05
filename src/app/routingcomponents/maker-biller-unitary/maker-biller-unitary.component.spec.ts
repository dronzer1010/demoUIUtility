import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerBillerUnitaryComponent } from './maker-biller-unitary.component';

describe('MakerBillerUnitaryComponent', () => {
  let component: MakerBillerUnitaryComponent;
  let fixture: ComponentFixture<MakerBillerUnitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerBillerUnitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerBillerUnitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
