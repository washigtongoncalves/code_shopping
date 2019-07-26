import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotosDeleteModalComponent } from './product-photos-delete-modal.component';

describe('ProductPhotosDeleteModalComponent', () => {
  let component: ProductPhotosDeleteModalComponent;
  let fixture: ComponentFixture<ProductPhotosDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotosDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotosDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
