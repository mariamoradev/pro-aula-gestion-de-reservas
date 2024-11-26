import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortadminPage } from './portadmin.page';

describe('PortadminPage', () => {
  let component: PortadminPage;
  let fixture: ComponentFixture<PortadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PortadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
