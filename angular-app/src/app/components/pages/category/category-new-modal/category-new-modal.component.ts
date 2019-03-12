import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit 
{
  private api = 'http://localhost:8000/api';
  private token: string;
  public category = { name: '' };
  
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
          .post(this.api + '/categories', this.category, {
              headers : {
                 'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe(success, error);
  }
  
  showModal()
  {
      this.modal.show();
  }
  
  hideModal()
  {
      this.modal.hide();
  }
  
  // Eventos do componente de Modal
  onShowModal($event: Event)
  {
      console.log('Show Modal Event');
      console.log($event);
  }
  
  onShownModal($event: Event)
  {
      console.log('Shown Modal Event');
      console.log($event);
  }
  
  onHiddenModal($event: Event)
  {
      console.log('Hidden Modal Event');
      console.log($event);
  }
  
  onHideModal($event: Event)
  {
      console.log('Hide Modal Event');
      console.log($event);
  }
}
