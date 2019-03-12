import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface iCategory
{
    id: number, 
    name: string
}

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit
{
  private api = 'http://localhost:8000/api';
  private token: string;
  private category: iCategory = {
      id: null, 
      name: null
  };
  
  @ViewChild(ModalComponent)
  private modal: ModalComponent;
  
  @Output() 
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  
  @Output() 
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient) { }
  
  ngOnInit()
  {
      this.token = localStorage.getItem('token');
  }
  
  submit()
  {
      const token = this.token;
      
      let success = (category) => {
          this.onSuccess.emit(category);
          this.modal.hide();
      };
      let error = (err) => this.onError.emit(err);
      this.http
          .put(`${this.api}/categories/${this.category.id}`, this.category, {
              headers : {
                 'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe(success, error);
  }
  
  showModal(category: iCategory)
  {
      this.category.id = category.id;
      this.category.name = category.name;
      this.modal.show();
  }
  
  hideModal()
  {
      this.modal.hide();
  }
  
  // Eventos do componente de Modal
  onShowModal($event: Event)
  {
      console.log('Show Edit Modal Event');
      console.log($event);
  }
  
  onShownModal($event: Event)
  {
      console.log('Shown Edit Modal Event');
      console.log($event);
  }
  
  onHiddenModal($event: Event)
  {
      console.log('Hidden Edit Modal Event');
      console.log($event);
  }
  
  onHideModal($event: Event)
  {
      console.log('Hide Edit Modal Event');
      console.log($event);
  }
}
