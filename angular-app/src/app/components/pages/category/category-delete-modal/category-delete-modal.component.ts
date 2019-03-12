import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface iCategory 
{
    id: number,
    name: string,
    active?: boolean,
    created_at?: { date: string }
}

@Component({
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent implements OnInit 
{
  private api = 'http://localhost:8000/api';
  private token: string;
  private category: iCategory;
    
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
  
  destroy()
  {
      const token = this.token;
      
      let success = (category) => {
          this.onSuccess.emit(category);
          this.modal.hide();
      };
      let error = (err) => this.onError.emit(err);
      this.http
          .delete(`${this.api}/categories/${this.category.id}`, {
              headers : {
                 'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe(success, error);
  }
  
  showModal(category: iCategory)
  {
      this.category = category;
      this.modal.show();
  }
  
  hideModal()
  {
      this.modal.hide();
  }
  
  // Eventos do componente de Modal
  onShowModal($event: Event)
  {
      console.log('Show Delete Modal Event');
      console.log($event);
  }
  
  onShownModal($event: Event)
  {
      console.log('Shown Delete Modal Event');
      console.log($event);
  }
  
  onHiddenModal($event: Event)
  {
      console.log('Hidden Delete Modal Event');
      console.log($event);
  }
  
  onHideModal($event: Event)
  {
      console.log('Hide Delete Modal Event');
      console.log($event);
  }
}
