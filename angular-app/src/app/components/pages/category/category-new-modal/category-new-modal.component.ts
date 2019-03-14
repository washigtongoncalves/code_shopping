import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent 
{
  public category: CategoryInterface = {
      'name': '',
      'active' : true
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
          .create(this.category)
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
      console.log('Show New Modal Event');
      console.log($event);
  }
  
  onShownModal($event: Event)
  {
      console.log('Shown New Modal Event');
      console.log($event);
  }
  
  onHiddenModal($event: Event)
  {
      console.log('Hidden New Modal Event');
      console.log($event);
  }
  
  onHideModal($event: Event)
  {
      console.log('Hide New Modal Event');
      console.log($event);
  }
}
