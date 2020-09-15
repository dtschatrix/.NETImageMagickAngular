import { Injectable, Injector, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { MessageDto } from 'src/app/shared/models/message';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService implements OnDestroy {
  readonly POST_URL = 'http://localhost:6001/api/chat/send';
  private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:6001/chatsocket', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets, // TODO: add Authorization token because of .netIdentity.context.user = null

    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  private receivedMessageObject: MessageDto = {};
  private sharedObj = new Subject<MessageDto>();
  private receivedListObject: any = {};
  private listObj = new Subject<any>();

  constructor(private injector: Injector) {
    this.hubConnection.on('GetConnectionIdsList', (listIds) => this.mapReceivedIds(listIds));
    this.hubConnection.on('BroadcastMessage', (user) => { this.mapReceivedMessage(user.username, user.messageText); });
    this.start().then(() => console.log('Connection established'));
  }
  mapReceivedIds(listIds: any): void {
    this.receivedListObject = listIds;
    this.listObj.next(this.receivedListObject);
  }
  ngOnDestroy(): void {
    this.hubConnection.stop();
  }

  public async start(): Promise<void> {
    try {
      await this.hubConnection.start();
      console.log('started signalr');
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 30000);
    }
  }

  mapReceivedMessage(user: any, message: any): void {
    this.receivedMessageObject.username = user;
    this.receivedMessageObject.messageText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public broadcastMessage(token: any, msgDto: MessageDto): void {
    const http = this.injector.get(HttpClient);

    const httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json',
        Authorization: token,
      })
    };

    http.post(this.POST_URL, msgDto, httpOptions)
      .subscribe(data => console.log(data));
  }

  getToken(): string {
    const auth = this.injector.get(AuthService);
    return auth.AuthorizationHeaderValue;
  }

  public sendMessage(message): void {
    this.hubConnection.invoke('SendMessage', message);
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
  public retriveList(): Observable<any> {
    return this.listObj.asObservable();
  }
}
