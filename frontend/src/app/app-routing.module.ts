import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import {MessagesComponent } from './components/messages/messages.component';
import {AddContactComponent } from './components/add-contact/add-contact.component';
import {SendMessageComponent } from './components/send-message/send-message.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {ResetComponent} from './components/reset-password/reset-password.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'contacts' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'send-message', component: SendMessageComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
