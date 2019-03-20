import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

// Necessário para o Typescript não exibir erro na hora de compilar,
// pois ele não conhece a variável do jQuery por padrão
declare let $;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onShowModal: EventEmitter<Event> = new EventEmitter<Event>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onShownModal: EventEmitter<Event> = new EventEmitter<Event>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onHideModal: EventEmitter<Event> = new EventEmitter<Event>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onHiddenModal: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    const jQueryElement = this.getJQueryElement();
    jQueryElement.find('[modal-title]').addClass('modal-title');
    jQueryElement.find('[modal-body]').addClass('modal-body');
    jQueryElement.find('[modal-footer]').addClass('modal-footer');

    // Eventos do component Modal do Bootstrap
    jQueryElement.on('show.bs.modal'  , (e) => this.onShowModal.emit(e));
    jQueryElement.on('shown.bs.modal' , (e) => this.onShownModal.emit(e));
    jQueryElement.on('hide.bs.modal'  , (e) => this.onHideModal.emit(e));
    jQueryElement.on('hidden.bs.modal', (e) => this.onHiddenModal.emit(e));
  }

  hide() {
    this.getJQueryElement().modal('hide');
  }

  show() {
    this.getJQueryElement().modal('show');
  }

  private getJQueryElement() {
    const nativeElement = this.element.nativeElement;
    return $(nativeElement.firstChild);
  }
}
