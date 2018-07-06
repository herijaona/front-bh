import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDealComponent } from './application-deal.component';

describe('ApplicationDealComponent', () => {
  let component: ApplicationDealComponent;
  let fixture: ComponentFixture<ApplicationDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
