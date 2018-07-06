import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSpaceFrontComponent } from './deal-space-front.component';

describe('DealSpaceFrontComponent', () => {
  let component: DealSpaceFrontComponent;
  let fixture: ComponentFixture<DealSpaceFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSpaceFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSpaceFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
