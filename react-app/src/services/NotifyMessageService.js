import PNotify from 'pnotify/dist/es/PNotify';

// eslint-disable-next-line
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
    return PNotify;
  }
}
export default NotifyMessageService;
