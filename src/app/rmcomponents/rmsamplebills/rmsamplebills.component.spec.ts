import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsamplebillsComponent } from './rmsamplebills.component';

describe('RmsamplebillsComponent', () => {
  let component: RmsamplebillsComponent;
  let fixture: ComponentFixture<RmsamplebillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmsamplebillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsamplebillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
