import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotosListComponent } from './product-photos-list.component';

describe('ProductPhotosListComponent', () => {
  let component: ProductPhotosListComponent;
  let fixture: ComponentFixture<ProductPhotosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
