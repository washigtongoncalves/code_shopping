import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotosUploadComponent } from './product-photos-upload.component';

describe('ProductPhotosUploadComponent', () => {
  let component: ProductPhotosUploadComponent;
  let fixture: ComponentFixture<ProductPhotosUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotosUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
