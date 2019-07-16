import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuthProvider } from '../../providers/auth/firebase-auth';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseAuth: FirebaseAuthProvider,
    private authService: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    const unsubscribed = this.firebaseAuth.getFirebase().auth().onAuthStateChanged(user => {
      if (user) { // Se o usuário estiver autenticado no Firebase, tenta autentica-lo na API da aplicação
        const success = (token) => this.redirectToMainPage(); // Se ocorrer sucesso, retorna o token da API e redireciona o usuário para a página principal
        const error = (erro) => this.redirectToCustumerCreateAccountPage(); // Se ocorrer um erro, o usuário será redirecionado para a página de criação de novos usuários
        this.authService.login().subscribe(success, error);
        unsubscribed();
      }
    });
    // Monta o formulário de autenticação via telefone
    this.firebaseAuth.makePhoneNumberForm("#firebaseUI");
  }

  private redirectToMainPage() {
    this.navCtrl.setRoot(MainPage);
  }

  private redirectToCustumerCreateAccountPage() {

  }
}
