import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindsetComponent } from './mindset.component';

describe('MindsetComponent', () => {
  let component: MindsetComponent;
  let fixture: ComponentFixture<MindsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
