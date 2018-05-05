import { Component, OnInit, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
    selector: 'login-register-tabs',
    template: `<ul class="nav nav-tabs">
    <li class="nav-item">
        <a class="nav-link" [ngClass]="{active:isLoginActive}" (click)="selectTab()" href="#">Loguearse</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" [ngClass]="{active:!isLoginActive}" (click)="selectTab()" href="#">Registrarse</a>
    </li>
    </ul>`,
    styleUrls: ["/login-register-tabs.scss"]
})

export class LoginRegisterTabsComponent implements OnInit {

    public isLoginActive: boolean;

    @Output("onTabChange") change: EventEmitter<boolean>;

    constructor() {
        this.change = new EventEmitter<boolean>();
    }

    ngOnInit() {
        this.isLoginActive = true;
    }

    private selectTab() {
        this.isLoginActive = !this.isLoginActive;
        this.change.emit(this.isLoginActive);
    }
}