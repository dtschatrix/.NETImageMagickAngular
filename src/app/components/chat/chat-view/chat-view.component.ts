import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { SignalrService } from 'src/app/components/chat/signalr.service';
import { MessageDto } from 'src/app/shared/models/message';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit, OnDestroy {
  data: Map<string, string> = new Map<string, string>();
  loggName: string;
  recevierName: string;
  msgInboxArray: MessageDto[] = [];
  msg: MessageDto = {};
  constructor(private chatService: SignalrService, private injector: Injector) { }

  ngOnInit(): void {
    this.loggName = this.getAuthName();
    this.chatService.retrieveMappedObject().subscribe((receivedObject: MessageDto) => { this.addToInbox(receivedObject); });
    this.chatService.retriveList().subscribe((receivedObject: any) => { this.data = receivedObject; });
  }
  ngOnDestroy(): void {
    this.chatService.ngOnDestroy();
  }

  getAuthName(): string {
    const auth = this.injector.get(AuthService);
    return auth.name;
  }

  sendMessage(): void {
    if (this.msg) {
      if (this.msg.messageText.length === 0) {
        return;
      }
      else {
        this.msg.date = Date.now();
        this.msg.senderId = Number(this.data.get(this.msg.username));
        this.msg.recevierId = this.getRecevierId(this.recevierName);
        this.msg.username = this.loggName;
        this.chatService.sendMessage(this.msg);
      }
    }
  }

  addToInbox(obj: MessageDto): void {
    const newObj: MessageDto = {};
    newObj.username = obj.username;
    newObj.messageText = obj.messageText;
    this.msgInboxArray.push(newObj);
  }

  getRecevierId(name: string): number {
    return Number(this.data.get(name));
  }
}

