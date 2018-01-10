import { Injectable,isDevMode } from '@angular/core';

/*
  Generated class for the ConsoleMenssagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConsoleMessagesProvider {

  private mode:boolean;

  constructor() {
    this.mode = isDevMode();
    this.debbugInfo('Hello ConsoleMenssagesProvider Provider');
  }


  /**
   * Method to print messages in dev mode
   * message : just print messages in dev mode
   * optionalParams : optional parameters
   */
  public debbugInfo(message?: any, ...optionalParams: any[]): void {
    if(this.mode){
      console.info(message,optionalParams);
    }
  }

  /**
   * The true console to show a message in prod and dev mode
   */
  public consoleInfo(message?: any, ...optionalParams: any[]): void {
    console.info(message,optionalParams);
  }

}
