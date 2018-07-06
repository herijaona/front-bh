import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveAccountComponent } from './inactive-account.component';

describe('InactiveAccountComponent', () => {
  let component: InactiveAccountComponent;
  let fixture: ComponentFixture<InactiveAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
