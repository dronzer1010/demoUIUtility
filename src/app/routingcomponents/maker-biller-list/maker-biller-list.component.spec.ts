import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerBillerListComponent } from './maker-biller-list.component';

describe('MakerBillerListComponent', () => {
  let component: MakerBillerListComponent;
  let fixture: ComponentFixture<MakerBillerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerBillerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerBillerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
