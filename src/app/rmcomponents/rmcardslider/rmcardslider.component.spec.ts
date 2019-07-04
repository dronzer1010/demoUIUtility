import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmcardsliderComponent } from './rmcardslider.component';

describe('RmcardsliderComponent', () => {
  let component: RmcardsliderComponent;
  let fixture: ComponentFixture<RmcardsliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmcardsliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmcardsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
