import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: '[sortColumn]',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent {

  @Input()
  sortColumn: { column: string, sort: string };

  @Input()
  columnName: string;

  @Output()
  onChangeSort: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('click')
  changeSort() {
    this.sortColumn.column = this.columnName;
    this.sortColumn.sort = this.sortColumn.sort === 'DESC' ? 'ASC' : 'DESC';
    this.onChangeSort.emit();
  }

  showArrowDown(): boolean {
    return this.sortColumn.column === this.columnName && this.sortColumn.sort === 'DESC';
  }

  showArrowUp(): boolean {
    return this.sortColumn.column === this.columnName && this.sortColumn.sort === 'ASC';
  }
}
