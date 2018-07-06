import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifRegisterComponent } from './notif-register.component';

describe('NotifRegisterComponent', () => {
  let component: NotifRegisterComponent;
  let fixture: ComponentFixture<NotifRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
