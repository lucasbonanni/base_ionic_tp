import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginRegister } from '../pages/login-register/login-register';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginRegisterTabsComponent } from './login-register-tabs/login-register-tabs.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register.form.component';
import { ConsoleMessagesProvider } from '../providers/console-messages/console-messages';
import { firebaseConfig } from '../environments/environment';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ChatPage } from '../pages/chat/chat';
import { DataFireProvider } from '../providers/data-fire/data-fire';
import { AngularFirestore } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginRegister,
    LoginRegisterTabsComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginRegister,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthGuard,
    ConsoleMessagesProvider,
    AuthServiceProvider,
    DataFireProvider,
    AngularFirestore
  ]
})
export class AppModule {}
