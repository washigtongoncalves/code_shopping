import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpClient } from '@angular/common/http';

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
  
  constructor(private http: HttpClient) { }
  
  ngOnInit()
  {
      this.token = localStorage.getItem('token');
  }
  
  submit()
  {
      const token = this.token;
      this.http
          .post(this.api + '/categories', this.category, {
              headers : {
                 'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe(() => {
              // this.getCategories();
              this.modal.hide();
          });
  }
  
  showModal()
  {
      this.modal.show();
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
