import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDealSpaceComponent } from './one-deal-space.component';

describe('OneDealSpaceComponent', () => {
  let component: OneDealSpaceComponent;
  let fixture: ComponentFixture<OneDealSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneDealSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDealSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
