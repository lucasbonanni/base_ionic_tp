import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ConsoleMessagesProvider } from '../../providers/console-messages/console-messages';

@Injectable()
export class AuthService {

  private _isLoggedIn : boolean;

  public get isLoggedIn() : boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(v : boolean) {
    this._isLoggedIn = v;
  }
  

  // store the URL so we can redirect after logging in
  // redirectUrl: string;

  public constructor(public afAuth: AngularFireAuth, public messageService: ConsoleMessagesProvider) {
    this._isLoggedIn = false;
    // this.messageService.consoleInfo(this.isLoggedIn);
  }

  login(): Observable<boolean> {
    // this.messageService.consoleInfo("login",this.isLoggedIn);
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    return Observable.of(true).delay(1000);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  public onAuthStateChanged(): any {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        //User data managment?

        // User is signed in.
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        // ...
        // this.isLoggedIn = true;
      } else {
        // User is signed out.
        // ...
        // this.isLoggedIn = false;
      }
    });
  }

  public googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(result => console.log(result));
  }


  public withEmailAndPasswordLogin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        this.messageService.consoleInfo(error,this);
    });
}

public registerWithEmailAndPassword(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
    });
}



}
