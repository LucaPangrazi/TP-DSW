import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMovieComponent } from './add-edit-movie.component';

describe('AddEditMovieComponent', () => {
  let component: AddEditMovieComponent;
  let fixture: ComponentFixture<AddEditMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMovieComponent]
    });
    fixture = TestBed.createComponent(AddEditMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
