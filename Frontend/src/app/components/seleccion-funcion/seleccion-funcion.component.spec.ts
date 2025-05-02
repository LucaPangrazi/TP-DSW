import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionFuncionComponent } from './seleccion-funcion.component';

describe('SeleccionFuncionComponent', () => {
  let component: SeleccionFuncionComponent;
  let fixture: ComponentFixture<SeleccionFuncionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionFuncionComponent]
    });
    fixture = TestBed.createComponent(SeleccionFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
