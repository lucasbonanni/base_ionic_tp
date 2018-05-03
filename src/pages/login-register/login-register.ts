import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, ActionSheetController } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ChatPage } from '../chat/chat';


@Component({
  selector: 'login-register',
  templateUrl: 'login-register.html'
})
export class LoginRegister implements OnInit {

  loading: Loading;
  registerCredentials = { email: '', password: '' };
  private: ActionSheetController;

  public isLoginActive: boolean;

  public constructor(
    public nav: NavController,
    public authService: AuthService,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.isLoginActive = true;
  }
  public tabChange($event) {
    this.isLoginActive = $event;
  }

  public login() {
    this.showLoading()
    this.auth.signInWithEmail(this.registerCredentials).then(allowed => {
      console.log(allowed);
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      alert(error);
      this.loading.dismiss();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Se produjo un error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  loginWithGithub() {
    this.auth.signInWithGithub().then(() => {
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      alert(error);
    });;
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(() => {
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      alert(error);
    });
  }

  EmailPasswordRegister(){
    this.auth.signUp(this.registerCredentials).then(() => {
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      alert(error);
    });
  }

}