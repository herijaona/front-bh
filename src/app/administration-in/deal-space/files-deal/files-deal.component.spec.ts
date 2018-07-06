import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDealComponent } from './files-deal.component';

describe('FilesDealComponent', () => {
  let component: FilesDealComponent;
  let fixture: ComponentFixture<FilesDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
