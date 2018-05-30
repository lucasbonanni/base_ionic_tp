import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginRegister } from '../login-register/login-register';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';


export class Message {
  messageText: string;
  profilePhoto: any;
  date: string;
  sender: string;
}

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit {
  public messages :Observable<Message[]>;
  public messagesRef : AngularFireList<Message>;
  public newMessage: Message;
  user: User;
  displayName: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthServiceProvider,
    private db: AngularFireDatabase) {
    this.newMessage = new Message();
  }
  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
    this.displayName = this.user.displayName;
    this.messagesRef = this.db.list<Message>('List/4a');
    this.messages = this.messagesRef.valueChanges();
    console.log(this.messagesRef);
  }
  ionViewDidLoad() {
  }

  public logout() {
    this.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginRegister)
    });
  }

  
  public pushMessage(){
    if(this.newMessage.messageText != ''){
      const date = new Date();
      this.newMessage.date = date.toString();
      this.newMessage.sender = this.displayName;
      this.messagesRef.push(this.newMessage);
    }
    this.newMessage.messageText = '';
  }


  public chageToClass4b(){
    this.messagesRef = this.db.list<Message>('List/4b');
    this.messages = this.messagesRef.valueChanges();
  }

  public chageToClass4a(){
    this.messagesRef = this.db.list<Message>('List/4a');
    this.messages = this.messagesRef.valueChanges();
  }

}
