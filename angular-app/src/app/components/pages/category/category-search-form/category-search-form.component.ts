import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-search-form',
  templateUrl: './category-search-form.component.html',
  styleUrls: ['./category-search-form.component.css']
})
export class CategorySearchFormComponent {

  search: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  submit() {
    this.onSearch.emit(this.search);
    return false;
  }
}
