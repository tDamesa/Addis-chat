import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './routing.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { CallbackComponent } from './callback.component';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { AuthInterceptor } from './auth.interceptor';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MessagesService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ProfileComponent,
    UsersComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    MessagesService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [MessageDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
