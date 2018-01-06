import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/user.entity';

@Component({
    selector: 'register-form',
    template: `
    <form  [formGroup]="register" (ngSubmit)="submit()" #registerForm="ngForm">
        <ion-item>
            <ion-label floating>Nombre</ion-label>
            <ion-input type="text" [(ngModel)]="user.name" formControlName="name" autocomplete="on"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label floating>email</ion-label>
            <ion-input type="email" [(ngModel)]="user.email" formControlName="email" autocomplete="on"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label floating>Password</ion-label>
            <ion-input type="password" [(ngModel)]="user.password" formControlName="password"></ion-input>
        </ion-item>
        <button ion-button block medium type="submit" [disabled]="!registerForm.form.valid">register</button>
    </form>`
})

export class RegisterFormComponent implements OnInit {

    private register: FormGroup;

    @Input() user : User;

    @Output() onSubmit: EventEmitter<User>;

    constructor(private formBuilder: FormBuilder) {
        this.register = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.email],
            password: ['', Validators.required],
            
        });
        this.onSubmit = new EventEmitter<User>();
        if(!this.user){
            this.user = new User();
        }
    }

    ngOnInit() {


    }

    public submit() {
        this.onSubmit.emit(this.user);
    }
}