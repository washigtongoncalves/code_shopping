import { Directive,  OnInit, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

const className = 'is-invalid';

@Directive({
  selector: '[isInvalid]'
})
export class IsInvalidDirective implements OnInit {

  constructor(
    private element: ElementRef, 
    private control: NgControl
  ) { }

  ngOnInit() {
    this.control.valueChanges.subscribe(() => {
      const nativeElement: HTMLElement = this.element.nativeElement;
      if (this.control.invalid && (this.control.dirty || this.control.touched)) {
        if (!nativeElement.classList.contains(className)) {
          nativeElement.classList.add(className);
        }
      } else {
        nativeElement.classList.remove(className);
      }
    });
  }
}
