import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

// Necessário para o Typescript não exibir erro na hora de compilar,
// pois ele não conhece a variável do jQuery por padrão
declare let $;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit 
{
  @Output()  
  onHide: EventEmitter<Event> = new EventEmitter<Event>();
      
  constructor(private element: ElementRef) { }
  
  ngOnInit()
  {
      const jQueryElement = this.getJQueryElement();
      jQueryElement.find('[modal-title]').addClass('modal-title');
      jQueryElement.find('[modal-body]').addClass('modal-body');
      jQueryElement.find('[modal-footer]').addClass('modal-footer');
      jQueryElement.on('hidden.bs.modal', (e) => this.onHide.emit(e));
  }

  hide()
  {
      this.getJQueryElement().modal('hide');
  }
  
  show()
  {
      this.getJQueryElement().modal('show');
  }
  
  private getJQueryElement()
  {
      const nativeElement = this.element.nativeElement;
      return $(nativeElement.firstChild);
  }
}
