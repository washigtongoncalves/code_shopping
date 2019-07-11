import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
// import * as firebaseui from 'firebaseui'; // Já está sendo inportado pelo método scriptjs
import firebaseConfig from '../../app/firebase-config';
import scriptjs from 'scriptjs';

// Necessário para não ter que digitar window.firebaseui
declare const firebaseui;
(<any>window).firebase = firebase;

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // Carrega o script do FirebaseUI já com a tradução para o Português Brasileiro
    scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
      firebase.initializeApp(firebaseConfig);
      const uiConfig = {
        signInOptions: [
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
      };
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseUI', uiConfig);
    });
  }

}
