import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from '../../../common/validation-message';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'invalid-feedback'
  }
})
export class FieldErrorComponent {

  @Input()
  public field: FormControl;

  @Input()
  public messages;

  @Input()
  public label: string;

  constructor() { }

  get errorKeys() {
    return Object.keys(this.errors);
  }

  get errors() {
    return this.field.errors;
  }

  showErrors() {
    return this.field.invalid && (this.field.dirty || this.field.touched);
  }

  getMessage(error: string): string {
    let replaceTokens: Array<string> = [this.label];
    if (this.messages && this.messages.hasOwnProperty(error)) {
      if (Array.isArray(this.messages[error])) {
        replaceTokens = replaceTokens.concat(this.messages[error]);
      } else {
        replaceTokens.push(this.messages[error]);
      }
    }
    return ValidationMessage.getMessage(error, replaceTokens);
  }
}
