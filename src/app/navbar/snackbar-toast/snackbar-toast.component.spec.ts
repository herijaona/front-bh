import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarToastComponent } from './snackbar-toast.component';

describe('SnackbarToastComponent', () => {
  let component: SnackbarToastComponent;
  let fixture: ComponentFixture<SnackbarToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
