import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryLinkModalComponent } from './product-category-link-modal.component';

describe('ProductCategoryLinkModalComponent', () => {
  let component: ProductCategoryLinkModalComponent;
  let fixture: ComponentFixture<ProductCategoryLinkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryLinkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
