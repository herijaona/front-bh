import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealApplicationComponent } from './deal-application.component';

describe('DealApplicationComponent', () => {
  let component: DealApplicationComponent;
  let fixture: ComponentFixture<DealApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
