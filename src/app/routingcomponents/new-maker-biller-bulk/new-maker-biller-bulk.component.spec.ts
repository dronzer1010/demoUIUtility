import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMakerBillerBulkComponent } from './new-maker-biller-bulk.component';

describe('NewMakerBillerBulkComponent', () => {
  let component: NewMakerBillerBulkComponent;
  let fixture: ComponentFixture<NewMakerBillerBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMakerBillerBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMakerBillerBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
