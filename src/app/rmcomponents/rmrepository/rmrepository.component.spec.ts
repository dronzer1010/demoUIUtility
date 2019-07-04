import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrepositoryComponent } from './rmrepository.component';

describe('RmrepositoryComponent', () => {
  let component: RmrepositoryComponent;
  let fixture: ComponentFixture<RmrepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
