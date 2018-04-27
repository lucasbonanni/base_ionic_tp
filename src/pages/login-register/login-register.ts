import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../app/auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from '../../app/shared/user.entity';
import { ConsoleMessagesProvider } from '../../providers/console-messages/console-messages';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';


@Component({
    selector: 'login-register',
    templateUrl: 'login-register.html'
})
export class LoginRegister implements OnInit {
    items: Observable<any[]>;
    itemsRef: AngularFireList<any>;
    public user : User;
    loading: Loading;
    createSuccess: boolean = false;

    public isLoginActive:boolean;

    ngOnInit(): void {
        this.isLoginActive = true;

        // this.user.email = "test@test.com";
        // this.user.password = "123456";
    }

    public constructor(
        public nav: NavController, 
        public db: AngularFireDatabase, 
        public authService: AuthService, 
        private messageService: ConsoleMessagesProvider,
        private auth: AuthServiceProvider, 
        private alertCtrl: AlertController, 
        private loadingCtrl: LoadingController) 
    {
        this.itemsRef = db.list('List');
        // If we navigated to this page, we will have an item available as a nav param
        this.items = this.itemsRef.valueChanges();
        this.user = new User('','');

    }

    public tabChange($event){
        this.isLoginActive = $event;
    }

    public googleLogin() {
        this.authService.googleLogin();
    }

    public EmailPasswordRegister($user){
        this.register();
        // this.messageService.debbugInfo("EmailPasswordRegister",$user);
    }

    public EmailPasswordLogin($user) {
        this.login();
        // this.messageService.debbugInfo("login",$user,"asdlfkj", this.items);
        // this.authService.withEmailAndPasswordLogin(this.user.email, this.user.password);
    }

    public createAccount() {
        this.nav.push('RegisterPage');
      }
    
      public login() {
        this.showLoading()
        this.auth.login(this.user).subscribe(allowed => {
          if (allowed) {        
            // this.nav.setRoot(HomePage);
            this.nav.push(HomePage);
          } else {
            this.showError("No tiene acceso");
          }
        },
          error => {
            this.showError(error);
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
          title: 'Falló',
          subTitle: text,
          buttons: ['OK']
        });
        alert.present();
      }
    
    
      public register() {
        this.auth.register(this.user).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Success", "Account created.");
          } else {
            this.showPopup("Error", "Problem creating account.");
          }
        },
          error => {
            this.showPopup("Error", error);
          });
      }
    
      showPopup(title, text) {
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: text,
          buttons: [
            {
              text: 'OK',
              handler: data => {
                if (this.createSuccess) {
                  this.nav.popToRoot();
                }
              }
            }
          ]
        });
        alert.present();
    }




}