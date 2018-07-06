import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMindsetComponent } from './zone-mindset.component';

describe('ZoneMindsetComponent', () => {
  let component: ZoneMindsetComponent;
  let fixture: ComponentFixture<ZoneMindsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneMindsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneMindsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
