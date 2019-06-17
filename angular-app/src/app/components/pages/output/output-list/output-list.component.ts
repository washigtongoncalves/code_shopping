import { Component, OnInit } from '@angular/core';
import { OutputHttpService } from '../../../../services/http/output-http.service';
import { OutputInterface } from '../../../../interfaces/output.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'output-list',
  templateUrl: './output-list.component.html',
  styleUrls: ['./output-list.component.css']
})
export class OutputListComponent implements OnInit {

  sortColumn = { column: '', sort: ''};
  searchTerm: string;

  public outputs: Array<OutputInterface> = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  constructor(private outputHttp: OutputHttpService) { }

  ngOnInit() {
    this.getOutputs();
  }

  getOutputs() {
    this.outputHttp
        .list({ page: this.pagination.currentPage, sort: this.sortColumn, search: this.searchTerm })
        .subscribe((response) => {
            this.outputs = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
  }

  pageChange(page: number) {
    this.pagination.currentPage = page;
    this.getOutputs();
  }

  sortChange() {
    this.getOutputs();
  }

  search($event) {
    this.searchTerm = $event;
    this.getOutputs();
  }
}
