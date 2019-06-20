import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackusrupComponent } from './backusrup.component';

describe('BackusrupComponent', () => {
  let component: BackusrupComponent;
  let fixture: ComponentFixture<BackusrupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackusrupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackusrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
