import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmfaqComponent } from './rmfaq.component';

describe('RmfaqComponent', () => {
  let component: RmfaqComponent;
  let fixture: ComponentFixture<RmfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
