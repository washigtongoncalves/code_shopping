import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

enum Types {
    success = 'success',
    error = 'error'
}

@Injectable({
  providedIn: 'root'
})
export class NotifyMessageService {

  success(text: string) {
    this.alert(text, Types.success);
  }

  error(text: string) {
    this.alert(text, Types.error);
  }

  private alert(text: string, type: Types) {
    this.pnotify.alert({text, type});
  }

  private get pnotify() {
    // tslint:disable-next-line:no-unused-expression
    PNotifyButtons;
    return PNotify;
  }
}
