import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
// import * as firebaseui from 'firebaseui'; // Já está sendo inportado pelo método scriptjs
import firebaseConfig from '../../app/firebase-config';
import scriptjs from 'scriptjs';

// Necessário para não ter que digitar window.firebaseui
declare const firebaseui;
(<any>window).firebase = firebase;

@Injectable()
export class FirebaseAuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseAuthProvider Provider');
  }

  private getFirebaseUI(): Promise<any> {
    // Carrega o script do FirebaseUI já com a tradução para o Português Brasileiro
    return new Promise((resolve, reject) => {
      scriptjs('https://www.gstatic.com/firebasejs/ui/3.1.1/firebase-ui-auth__pt.js', () => {
        resolve(firebaseui);
      });
    });
  }
}


firebase.initializeApp(firebaseConfig);
      const uiConfig = {
        signInOptions: [
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ]
      };
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseUI', uiConfig);