import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSucursalComponent } from './add-edit-sucursal.component';

describe('AddEditSucursalComponent', () => {
  let component: AddEditSucursalComponent;
  let fixture: ComponentFixture<AddEditSucursalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSucursalComponent]
    });
    fixture = TestBed.createComponent(AddEditSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
