import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//variable to know if running on development mode
//import { isDevMode } from '@angular/core';
//import * as firebase from 'firebase/app';
import { AuthService } from '../../app/auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from '../../app/shared/user.entity';


@Component({
    selector: 'login-register',
    templateUrl: 'login-register.html'
})
export class LoginRegister implements OnInit {
    items: Observable<any[]>;
    itemsRef: AngularFireList<any>;
    public user : User;

    public isLoginActive:boolean;

    ngOnInit(): void {
        // this.user.email = "";
        // this.user.password = "";
        this.isLoginActive = true;
        this.user.email = "test@test.com";
        this.user.password = "123456";
    }

    constructor(public navCtrl: NavController, public db: AngularFireDatabase, public authService: AuthService) {
        this.itemsRef = db.list('List');
        // If we navigated to this page, we will have an item available as a nav param
        this.items = this.itemsRef.valueChanges();
        this.user = new User();

    }

    public tabChange($event){
        // console.log("tabchange",$event);
        this.isLoginActive = $event;
    }

    public googleLogin() {
        this.authService.googleLogin();
    }

    public submitForm($user){
        // console.log("sumit from login register",$user);
    }

    public login() {
        // console.log("login",this.user);
        // this.authService.withEmailAndPasswordLogin(this.user.email, this.user.password);
    }




}