import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbulkComponent } from './userbulk.component';

describe('UserbulkComponent', () => {
  let component: UserbulkComponent;
  let fixture: ComponentFixture<UserbulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserbulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
