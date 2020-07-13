import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkBillerComponent } from './add-bulk-biller.component';

describe('AddBulkBillerComponent', () => {
  let component: AddBulkBillerComponent;
  let fixture: ComponentFixture<AddBulkBillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkBillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
