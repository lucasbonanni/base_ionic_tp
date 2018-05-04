import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginRegister } from '../login-register/login-register';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthServiceProvider,
    private db: AngularFireDatabase) {
    this.newMessage = new Message();
  }
  ngOnInit(): void {
    this.messagesRef = this.db.list<Message>('List');
    this.messages = this.messagesRef.valueChanges();
    console.log(this.messagesRef);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
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
      this.newMessage.sender = 'Lucas';
      this.messagesRef.push(this.newMessage);
    }
    this.newMessage.messageText = '';
  }
}
