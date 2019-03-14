import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent
{
  private category: CategoryInterface = {
      'name': '',
      'active': true
  };
  
  @ViewChild(ModalComponent)
  private modal: ModalComponent;
  
  @Output() 
  onSuccess: EventEmitter<any> = new EventEmitter<any>();
  
  @Output() 
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }
  
  submit()
  {
      let success = (category) => {
          this.onSuccess.emit(category);
          this.modal.hide();
      };
      let error = (err) => this.onError.emit(err);
      this.categoryHttp
          .update(this.category)
          .subscribe(success, error);
  }
  
  showModal(category: CategoryInterface)
  {
      this.category.id = category.id;
      this.category.name = category.name;
      this.category.active = category.active;
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
