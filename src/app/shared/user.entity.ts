import { UserInfo } from 'firebase/app';


export class User implements UserInfo {
    name:string;
    displayName: string;
    public email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
    public password:string;

    public constructor(){
        this.email ="";
    }

    
}