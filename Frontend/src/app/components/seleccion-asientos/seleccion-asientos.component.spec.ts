import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionAsientosComponent } from './seleccion-asientos.component';

describe('SeleccionAsientosComponent', () => {
  let component: SeleccionAsientosComponent;
  let fixture: ComponentFixture<SeleccionAsientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionAsientosComponent]
    });
    fixture = TestBed.createComponent(SeleccionAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
