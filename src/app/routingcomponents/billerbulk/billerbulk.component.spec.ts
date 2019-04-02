import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerBulkComponent } from './billerbulk.component';

describe('NewMakerBillerBulkComponent', () => {
  let component: BillerBulkComponent;
  let fixture: ComponentFixture<BillerBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillerBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillerBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
