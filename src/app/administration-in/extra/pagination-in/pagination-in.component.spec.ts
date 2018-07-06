import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationInComponent } from './pagination-in.component';

describe('PaginationInComponent', () => {
  let component: PaginationInComponent;
  let fixture: ComponentFixture<PaginationInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
