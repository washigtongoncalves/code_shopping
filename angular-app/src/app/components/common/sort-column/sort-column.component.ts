import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: '[sortColumn]',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.css']
})
export class SortColumnComponent implements OnInit {

  @Input()
  sortColumn: { column: string, sort: string };

  @Input()
  columnName: string;

  constructor() {}

  ngOnInit() {}

  @HostListener('click')
  changeSort() {
    this.sortColumn.column = this.columnName;
    this.sortColumn.sort = this.sortColumn.sort === 'DESC' ? 'ASC' : 'DESC';
  }

  showArrowDown(): boolean {
    return this.sortColumn.column === this.columnName && this.sortColumn.sort === 'DESC';
  }

  showArrowUp(): boolean {
    return this.sortColumn.column === this.columnName && this.sortColumn.sort === 'ASC';
  }
}
