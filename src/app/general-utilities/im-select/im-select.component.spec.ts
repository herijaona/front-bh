import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImSelectComponent } from './im-select.component';

describe('ImSelectComponent', () => {
  let component: ImSelectComponent;
  let fixture: ComponentFixture<ImSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
