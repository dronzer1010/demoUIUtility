import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerBillerBulkComponent } from './maker-biller-bulk.component';

describe('MakerBillerBulkComponent', () => {
  let component: MakerBillerBulkComponent;
  let fixture: ComponentFixture<MakerBillerBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerBillerBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerBillerBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
