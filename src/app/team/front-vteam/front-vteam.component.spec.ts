import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontVteamComponent } from './front-vteam.component';

describe('FrontVteamComponent', () => {
  let component: FrontVteamComponent;
  let fixture: ComponentFixture<FrontVteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontVteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontVteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
