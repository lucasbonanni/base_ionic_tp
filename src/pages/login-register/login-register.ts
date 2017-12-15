import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//variable to know if running on development mode
//import { isDevMode } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
    selector: 'login-register',
    templateUrl: 'login-register.html'
})
export class LoginRegister {

    items: Observable<any[]>;
    itemsRef: AngularFireList<any>;

    constructor(public navCtrl: NavController, public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
        this.itemsRef = db.list('List');
        // If we navigated to this page, we will have an item available as a nav param
        this.items = this.itemsRef.valueChanges();
    }

    public googleLogin() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(result => console.log(result));
    }

}