import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiRoutingModule } from './api-routing.module';
import { ApiViewComponent } from './api-view/api-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiHandlerService } from './apiservice/apihandler.service';
import { ApiFiltersDirective } from './api-filters//api-filters.component';
import { FormsModule } from '@angular/forms';
import { ChatViewComponent } from '../chat/chat-view/chat-view.component';
import { SignalrService } from '../chat/signalr.service';


@NgModule({
  declarations: [ApiViewComponent, ApiFiltersDirective, ChatViewComponent],
  providers: [ApiHandlerService, SignalrService],
  imports: [
    CommonModule,
    ApiRoutingModule,
    SharedModule,
    FormsModule,
  ],
})

export class ApiModule { }
