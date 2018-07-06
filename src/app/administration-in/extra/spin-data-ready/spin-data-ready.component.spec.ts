import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinDataReadyComponent } from './spin-data-ready.component';

describe('SpinDataReadyComponent', () => {
  let component: SpinDataReadyComponent;
  let fixture: ComponentFixture<SpinDataReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinDataReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinDataReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
