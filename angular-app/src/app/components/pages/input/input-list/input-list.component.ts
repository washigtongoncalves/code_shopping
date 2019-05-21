import { Component, OnInit, ViewChild } from '@angular/core';
import { InputNewModalComponent } from '../input-new-modal/input-new-modal.component';
import { InputHttpService } from 'src/app/services/http/input-http.service';
import { InputInterface } from 'src/app/interfaces/input.interface';
import { InputInsertService } from './input-insert.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.css']
})
export class InputListComponent implements OnInit {

  sortColumn = { column: '', sort: ''};
  searchTerm: string;

  public inputs: Array<InputInterface> = [];

  @ViewChild(InputNewModalComponent)
  inputNewModal: InputNewModalComponent;

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  constructor(
    private inputHttp: InputHttpService,
    protected inputInsertService: InputInsertService
  ) {
    this.inputInsertService.inputListComponent = this;
  }

  ngOnInit() {
    this.getInputs();
  }

  getInputs() {
    this.inputHttp
        .list({ page: this.pagination.currentPage, sort: this.sortColumn, search: this.searchTerm })
        .subscribe((response) => {
            this.inputs = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
  }

  pageChange(page: number) {
    this.pagination.currentPage = page;
    this.getInputs();
  }

  sortChange() {
    this.getInputs();
  }

  search($event) {
    this.searchTerm = $event;
    this.getInputs();
  }
}
