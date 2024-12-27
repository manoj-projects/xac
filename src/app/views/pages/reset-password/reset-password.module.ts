import {ResetPasswordComponent} from './reset-password.component';
import { NgModule } from '@angular/core';
import { UserSessionService } from '../../../services/usersession.service';
import { CardModule } from 'primeng/card';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {PasswordModule} from 'primeng/password';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

const routes: Routes = [
    {
      path: '',
      component: ResetPasswordComponent
    }
  ]
  
@NgModule({
    imports: [
        CommonModule,
        CardModule,
        PasswordModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MessagesModule,
        MessageModule
    ],
    exports: [],
    declarations: [
        ResetPasswordComponent,
    ],
    providers: [UserSessionService, ResetPasswordService],
})
export class ResetPasswordModule { }
