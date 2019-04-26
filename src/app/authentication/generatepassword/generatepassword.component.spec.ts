import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratepasswordComponent } from './generatepassword.component';

describe('GeneratepasswordComponent', () => {
  let component: GeneratepasswordComponent;
  let fixture: ComponentFixture<GeneratepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
