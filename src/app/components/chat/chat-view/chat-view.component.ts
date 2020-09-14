import { Component, OnInit, Injector } from '@angular/core';
import { SignalrService } from 'src/app/components/chat/signalr.service';
import { MessageDto } from 'src/app/shared/models/message';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  msgInboxArray: MessageDto[] = [];
  message: MessageDto;
  constructor(private chatService: SignalrService, private injector: Injector) { }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObject: MessageDto) => { this.msgInboxArray.push(receivedObject); });
  }

  send(): void {
    if (this.message) {
      if (this.message.user.length === 0 || this.message.messageText.length === 0) {
        return;
      }
    }
    else {
      const authService = this.injector.get(AuthService);
      this.chatService.broadcastMessage(authService.AuthorizationHeaderValue, this.message);
    }
  }

  addToInbox(obj: MessageDto): void {
    const newObj: MessageDto = {};
    newObj.user = obj.user;
    newObj.messageText = obj.messageText;
    this.msgInboxArray.push(newObj);
  }



}

