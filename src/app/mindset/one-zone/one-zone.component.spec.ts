import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneZoneComponent } from './one-zone.component';

describe('OneZoneComponent', () => {
  let component: OneZoneComponent;
  let fixture: ComponentFixture<OneZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
