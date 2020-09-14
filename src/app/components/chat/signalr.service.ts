import { Injectable, Injector } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { MessageDto } from 'src/app/shared/models/message';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public data: any;
  readonly POST_URL = 'http://localhost:6001/chat/send';
  private hubConnection: signalR.HubConnection;


  private receivedMessageObject: MessageDto;
  private sharedObj = new Subject<MessageDto>();

  constructor(private injector: Injector) {
    this.hubConnection.keepAliveIntervalInMilliseconds = 300000;
    this.hubConnection.serverTimeoutInMilliseconds = 150000;
    this.hubConnection.onclose(async () => {
      await this.startConnection();
    });
    this.hubConnection.on('ReceiveOne', (user, message) => { this.mapReceivedMessage(user, message); });
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:6001/chat')
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection established'))
      .catch(err => console.log('Error while connecting: ' + err));
  }

  mapReceivedMessage(user: any, message: any): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.messageText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public broadcastMessage(token: any, msgDto: any): void {
    const http = this.injector.get(HttpClient);
    const httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json',
        Authorization: token,
        AccessControlAllowOrigin: '*'
      })
    };

    http.post(this.POST_URL, msgDto, httpOptions)
      .subscribe(data => console.log(data));
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
}
