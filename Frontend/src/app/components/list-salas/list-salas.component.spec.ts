import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalasComponent } from './list-salas.component';

describe('ListSalasComponent', () => {
  let component: ListSalasComponent;
  let fixture: ComponentFixture<ListSalasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSalasComponent]
    });
    fixture = TestBed.createComponent(ListSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
