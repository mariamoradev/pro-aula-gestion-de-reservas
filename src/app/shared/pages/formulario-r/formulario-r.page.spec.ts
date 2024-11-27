import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioRPage } from './formulario-r.page';

describe('FormularioRPage', () => {
  let component: FormularioRPage;
  let fixture: ComponentFixture<FormularioRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
