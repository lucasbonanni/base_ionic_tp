import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController } from 'ionic-angular';
import { AuthService } from '../../app/auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ChatPage } from '../chat/chat';
import { usuarios } from '../../models/users';
import { BusyLoaderProvider } from '../../providers/busy-loader/busy-loader';


@Component({
  selector: 'login-register',
  templateUrl: 'login-register.html'
})
export class LoginRegister implements OnInit {

  registerCredentials = { email: '', password: '', photoURL: '', displayName: '' };
  private: ActionSheetController;

  public isLoginActive: boolean;

  public constructor(
    public nav: NavController,
    public authService: AuthService,
    private auth: AuthServiceProvider,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private busyLoader: BusyLoaderProvider) {
  }

  ngOnInit(): void {
    this.isLoginActive = true;
  }
  public tabChange($event) {
    this.isLoginActive = $event;
  }

  public login() {
    this.busyLoader.showBusyLoader();
    this.auth.signInWithEmail(this.registerCredentials).then(allowed => {
      console.log(allowed);
      this.busyLoader.dismissBusyLoader();
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      this.showMessage('Verifique sus credenciales');
      this.busyLoader.dismissBusyLoader();
    });
  }

  // showLoading() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Por favor espere...',
  //     dismissOnPageChange: true
  //   });
  //   this.loading.present();
  // }

  loginWithGithub() {
    this.auth.signInWithGithub().then(() => {
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      this.showMessage(error);
    });;
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(() => {
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      this.showMessage(error);
    });
  }

  EmailPasswordRegister(){
    this.busyLoader.showBusyLoader();
    this.auth.signUp(this.registerCredentials).then(() => {
      this.busyLoader.dismissBusyLoader();
      this.nav.setRoot(ChatPage);
    }).catch(error => {
      this.busyLoader.dismissBusyLoader();
      this.showMessage(error);
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar un usuario',
      buttons: [
        {
          text: usuarios[0].perfil + ' ' + usuarios[0].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[0].nombre;
            this.registerCredentials.password = usuarios[0].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[0].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=1'
            this.login();
          }
        }, {
          text: usuarios[1].perfil + ' ' + usuarios[1].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[1].nombre;
            this.registerCredentials.password = usuarios[1].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[1].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=2'
            this.login();
          }
        }, {
          text: usuarios[2].perfil + ' ' + usuarios[2].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[2].nombre;
            this.registerCredentials.password = usuarios[2].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[2].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=3'
            this.login();
            
          }
        },
        {
          text: usuarios[3].perfil + ' ' + usuarios[3].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[3].nombre;
            this.registerCredentials.password = usuarios[3].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[3].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=4'
            this.login();
          }
        },
        {
          text: usuarios[4].perfil + ' ' + usuarios[4].nombre,
          handler: () => {
            this.registerCredentials.email = usuarios[4].nombre;
            this.registerCredentials.password = usuarios[4].clave;
            this.registerCredentials.displayName = 'usuario ' + usuarios[4].perfil;
            this.registerCredentials.photoURL = 'https://loremflickr.com/320/240/picture,face?random=5'
            this.login();
          }
        }
      ]
    });
    actionSheet.present();
  }


  showMessage(text:string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}