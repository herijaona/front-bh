import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeDateComponent } from './some-date.component';

describe('SomeDateComponent', () => {
  let component: SomeDateComponent;
  let fixture: ComponentFixture<SomeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomeDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
