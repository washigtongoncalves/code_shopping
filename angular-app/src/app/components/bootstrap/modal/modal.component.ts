import { Component, ElementRef } from '@angular/core';

// Necessário para o Typescript não exibir erro na hora de compilar,
// pois ele não conhece a variável do jQuery por padrão
declare let $;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent 
{
  constructor(private element: ElementRef) { }

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
