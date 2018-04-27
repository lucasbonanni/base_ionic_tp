import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginRegister } from './login-register';

@NgModule({
  declarations: [
    LoginRegister,
  ],
  imports: [
    IonicPageModule.forChild(LoginRegister),
  ],
})
export class LoginRegisterModule {}
