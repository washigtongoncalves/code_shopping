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

  private ui;

  constructor() {
    firebase.initializeApp(firebaseConfig);
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
      if (this.ui === undefined) {
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      this.ui.start(selectorElement, uiConfig);
  }

  getFirebase() {
    return firebase;
  }

  async getToken(): Promise<string> {
    try {
      const user = await this.getUser();
      if (!user) {
        throw new Error('User not found');
      }
      const token = await user.getIdTokenResult();
      return token.token;
    } catch(e) {
      return Promise.reject(e);
    }
  }

  async getUser(): Promise<firebase.User | any> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return Promise.resolve(currentUser);
    }
    return new Promise((resolve, reject) => {
      // Escuta o evento de autenticação
      const success = (user) => {
        resolve(user);
        unsubscribed(); // Deixa de escutar o evento
      };
      const error = (erro => { 
        reject(erro);
        unsubscribed(); // Deixa de escutar o evento
      });
      const unsubscribed = this.getFirebase().auth().onAuthStateChanged(success, error);
    });
  }

  private getCurrentUser(): firebase.User | null {
    return this.getFirebase().auth().currentUser;
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
}
