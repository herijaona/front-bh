import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydeskComponent } from './mydesk.component';

describe('MydeskComponent', () => {
  let component: MydeskComponent;
  let fixture: ComponentFixture<MydeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
