import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackruleregComponent } from './backrulereg.component';

describe('BackruleregComponent', () => {
  let component: BackruleregComponent;
  let fixture: ComponentFixture<BackruleregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackruleregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackruleregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
