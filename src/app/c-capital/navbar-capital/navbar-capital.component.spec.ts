import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCapitalComponent } from './navbar-capital.component';

describe('NavbarCapitalComponent', () => {
  let component: NavbarCapitalComponent;
  let fixture: ComponentFixture<NavbarCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
