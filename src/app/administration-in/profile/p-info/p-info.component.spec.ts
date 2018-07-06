import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PInfoComponent } from './p-info.component';

describe('PInfoComponent', () => {
  let component: PInfoComponent;
  let fixture: ComponentFixture<PInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
