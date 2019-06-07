import { Directive,  OnInit, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

const className = 'is-invalid';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isInvalid]'
})
export class IsInvalidDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private control: NgControl
  ) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.element.nativeElement;
    toogleClassInvalid(this.control, nativeElement);
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[isInvalidControl]'
})
export class IsInvalidControlDirective implements OnInit {

  control: NgControl;

  constructor(private element: ElementRef) { }

  @Input()
  set isInvalidControl(value: NgControl) {
    this.control = value;
  }

  ngOnInit() {
    const nativeElement: HTMLElement = this.element.nativeElement;
    toogleClassInvalid(this.control, nativeElement);
  }
}

function toogleClassInvalid(control: NgControl, nativeElement: HTMLElement) {
  control.valueChanges.subscribe(() => {
    if (control.invalid && (control.dirty || control.touched)) {
      if (!nativeElement.classList.contains(className)) {
        nativeElement.classList.add(className);
      }
    } else {
      nativeElement.classList.remove(className);
    }
  });
}
