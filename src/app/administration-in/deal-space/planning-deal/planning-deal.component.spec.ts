import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDealComponent } from './planning-deal.component';

describe('PlanningDealComponent', () => {
  let component: PlanningDealComponent;
  let fixture: ComponentFixture<PlanningDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
