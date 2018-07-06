import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealFilesComponent } from './deal-files.component';

describe('DealFilesComponent', () => {
  let component: DealFilesComponent;
  let fixture: ComponentFixture<DealFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
