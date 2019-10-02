import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/PNotifyBrightTheme.css';

class NotifyMessageService {

  success(text) {
    this.alert(text, 'success');
  }

  error(text) {
    this.alert(text, 'error');
  }

  alert(text, type) {
    this.pnotify.alert({text, type});
  }

  get pnotify() {
    // PNotifyButtons;
    return PNotify;
  }
}
export default NotifyMessageService;
