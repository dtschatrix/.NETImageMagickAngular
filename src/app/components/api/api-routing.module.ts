import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiViewComponent } from './api-view/api-view.component';
import { AuthGuard } from '../../core/authentication/auth.guard';
import { Shell } from '../../shell/shell.service';
import { ChatViewComponent } from '../chat/chat-view/chat-view.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'api', component: ApiViewComponent },
    { path: 'chat', component: ChatViewComponent},
  ])
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [AuthGuard]
})
export class ApiRoutingModule { }
