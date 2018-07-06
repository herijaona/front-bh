import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReceivedComponent } from './application-received.component';

describe('ApplicationReceivedComponent', () => {
  let component: ApplicationReceivedComponent;
  let fixture: ComponentFixture<ApplicationReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
