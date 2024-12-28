import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarEntradaComponent } from './comprar-entrada.component';

describe('ComprarEntradaComponent', () => {
  let component: ComprarEntradaComponent;
  let fixture: ComponentFixture<ComprarEntradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprarEntradaComponent]
    });
    fixture = TestBed.createComponent(ComprarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
