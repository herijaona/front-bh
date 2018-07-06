import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZoneMindsetComponent } from './new-zone-mindset.component';

describe('NewZoneMindsetComponent', () => {
  let component: NewZoneMindsetComponent;
  let fixture: ComponentFixture<NewZoneMindsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewZoneMindsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewZoneMindsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
