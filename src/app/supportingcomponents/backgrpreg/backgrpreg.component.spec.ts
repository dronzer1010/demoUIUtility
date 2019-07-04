import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgrpregComponent } from './backgrpreg.component';

describe('BackgrpregComponent', () => {
  let component: BackgrpregComponent;
  let fixture: ComponentFixture<BackgrpregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgrpregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgrpregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
