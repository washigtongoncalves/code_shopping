import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  search: string;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  submit() {
    this.onSearch.emit(this.search);
    return false;
  }
}
