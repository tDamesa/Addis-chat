import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagesService } from '../services/message.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../message';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messagesService: MessagesService,
    private authService: AuthService
  ) {}
  messages: Message[];
  text: string;
  ngOnInit() {
    const subscription = this.messagesService
      .getMessages(this.data.selectedUser.email)
      .subscribe(messages => {
        subscription.unsubscribe();
        this.messages = messages.sort(
          (a, b) => <any>new Date(a.date) - <any>new Date(b.date)
        );
      });

    this.authService.socket.on('message', message => {
      if (this.data.selectedUser.email === message.sender) {
        this.messages.push(message);
      }
    });
  }
  isCurrentUser(message: Message) {
    return message.sender === this.authService.getEmail() || !message.sender;
  }
  send() {
    if (this.text) {
      const message = {
        receiver: this.data.selectedUser.email,
        message: this.text
      };
      const subscription = this.messagesService
        .addMessage({
          receiver: this.data.selectedUser.email,
          message: this.text
        })
        .subscribe(resMessage => {
          subscription.unsubscribe();
          this.text = null;
          this.messages.push(message);
        });
    }
  }
}
