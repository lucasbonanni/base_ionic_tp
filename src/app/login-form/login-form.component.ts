import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user.entity';

@Component({
    selector: 'login-form',
    template: `
    <form [formGroup]="login" (ngSubmit)="submit()" #loginForm="ngForm">
        <ion-item>
            <ion-label floating>Correo</ion-label>
            <ion-input type="email" formControlName="email" [(ngModel)]="user.email"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label floating>Contraseña</ion-label>
            <ion-input type="password" formControlName="password" [(ngModel)]="user.password"></ion-input>
        </ion-item>
        <!--span>{{login.status}} - {{login.controls['email'].valid}}</span-->
        <button ion-button block medium type="submit" [disabled]="!loginForm.form.valid">Inciar sesion</button>
    </form>`
})

export class LoginFormComponent{
    
    private login : FormGroup;

    @Input() user : User;

    @Output() onSubmit: EventEmitter<User>;

    public constructor(private formBuilder: FormBuilder) {
        this.login = this.formBuilder.group({
            email: ['', Validators.email],
            password: ['',Validators.required],
          });
        this.onSubmit = new EventEmitter<User>();
     }

    public submit(){
         this.onSubmit.emit(this.user);
    }
}