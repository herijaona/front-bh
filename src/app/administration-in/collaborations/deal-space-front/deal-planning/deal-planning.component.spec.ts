import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealPlanningComponent } from './deal-planning.component';

describe('DealPlanningComponent', () => {
  let component: DealPlanningComponent;
  let fixture: ComponentFixture<DealPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
