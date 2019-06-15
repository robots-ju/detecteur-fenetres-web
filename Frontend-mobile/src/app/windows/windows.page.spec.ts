import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowsPage } from './windows.page';

describe('WindowsPage', () => {
  let component: WindowsPage;
  let fixture: ComponentFixture<WindowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
