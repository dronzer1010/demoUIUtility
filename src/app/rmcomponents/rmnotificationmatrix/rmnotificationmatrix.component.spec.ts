import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmnotificationmatrixComponent } from './rmnotificationmatrix.component';

describe('RmnotificationmatrixComponent', () => {
  let component: RmnotificationmatrixComponent;
  let fixture: ComponentFixture<RmnotificationmatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmnotificationmatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmnotificationmatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
