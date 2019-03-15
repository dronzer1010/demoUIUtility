import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplebillsComponent } from './samplebills.component';

describe('SamplebillsComponent', () => {
  let component: SamplebillsComponent;
  let fixture: ComponentFixture<SamplebillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplebillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplebillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
