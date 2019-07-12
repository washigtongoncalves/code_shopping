import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
// import * as firebaseui from 'firebaseui'; // Já está sendo inportado pelo método scriptjs
import scriptjs from 'scriptjs';
import firebaseConfig from '../../app/firebase-config';

// Necessário para não ter que digitar window.firebaseui
declare const firebaseui;
(<any>window).firebase = firebase;

@Injectable()
export class FirebaseAuthProvider {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  private async getFirebaseUI(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (window.hasOwnProperty('firebaseui')) { // Se já tiver carregado o firebaseui, apenas o retorna
        resolve(firebaseui);
        return;
      }
      // Carrega o script do FirebaseUI já com a tradução para o Português Brasileiro
      scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui);
      });
    });
  }

  async makePhoneNumberForm(selectorElement: string) {
      const firebaseui = await this.getFirebaseUI();
      const uiConfig = {
        signInOptions: [
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => false
        }
      };
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start(selectorElement, uiConfig);
  }
}
