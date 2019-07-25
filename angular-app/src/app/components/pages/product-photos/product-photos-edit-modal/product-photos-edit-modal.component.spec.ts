import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotosEditModalComponent } from './product-photos-edit-modal.component';

describe('ProductPhotosEditModalComponent', () => {
  let component: ProductPhotosEditModalComponent;
  let fixture: ComponentFixture<ProductPhotosEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotosEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotosEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
