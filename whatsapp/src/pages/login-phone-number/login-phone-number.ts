import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider
  ) {
  }

  ionViewDidLoad() {
    this.firebaseAuth.getUser().then((user) => { 
      console.log(user);
    });
    // Monta o formulário de autenticação via telefone
    this.firebaseAuth.makePhoneNumberForm("#firebaseUI");
  }
}
