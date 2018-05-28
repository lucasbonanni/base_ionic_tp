import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { LoginRegister } from '../pages/login-register/login-register';
import { ChatPage } from '../pages/chat/chat';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { BusyLoaderProvider } from '../providers/busy-loader/busy-loader';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginRegister;

  pages: Array<{title: string, component: any}>;
  splash: boolean = true;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AuthServiceProvider,
    private busyLoader: BusyLoaderProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: ChatPage },
      { title: 'List', component: ListPage },
      { title: 'chat', component: ChatPage },
      // { title: 'Login', component: LoginRegister }
    ];

  }

  initializeApp() {
    this.busyLoader.showBusyLoader();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      setTimeout(() => {
        this.splash = false
        this.busyLoader.dismissBusyLoader();
      }, 3000);
    });
    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = ChatPage;
        } else {
          this.rootPage = LoginRegister;
        }
      },
      () => {
        this.rootPage = LoginRegister;
      }
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
