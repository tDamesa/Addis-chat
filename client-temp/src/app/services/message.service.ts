import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from '../message';

@Injectable()
export class MessagesService {
  constructor(private http: HttpClient) {}
  getMessages(email) {
    return this.http.get<Message[]>(
      `${environment.apiRootUrl}/api/messages/${email}`
    );
  }
  addMessage(message: Message) {
    return this.http.post<Message>(`${environment.apiRootUrl}/api/messages`, message);
  }
}
