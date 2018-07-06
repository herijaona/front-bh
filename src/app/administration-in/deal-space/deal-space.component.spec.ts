import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealSpaceComponent } from './deal-space.component';

describe('DealSpaceComponent', () => {
  let component: DealSpaceComponent;
  let fixture: ComponentFixture<DealSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
