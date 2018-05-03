import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


/*
  Generated class for the DataFireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFireProvider {

  constructor(public db: AngularFireDatabase) {
  }

  public getItems(entityName:string) {
    return this.db.list(entityName).valueChanges();
  }

  public addItem(entityName:string, object:any){
    return this.db.database.ref(entityName).set(object);
  }

  public pushItem(entityName:string,object:any){
    return this.db.database.ref(entityName).push(object);
  }

  public deleteItem(path:string){
    return this.db.database.ref(path).remove();
  }

  public updateItem(path:string,item:any){
    return this.db.database.ref(path).update(item);
  }

}
