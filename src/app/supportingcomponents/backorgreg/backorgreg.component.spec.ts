import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackorgregComponent } from './backorgreg.component';

describe('BackorgregComponent', () => {
  let component: BackorgregComponent;
  let fixture: ComponentFixture<BackorgregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackorgregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackorgregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
