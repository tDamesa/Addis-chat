import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  users;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const term = params.get('term');
      this.users = this.userService.getUsers(term);
    });
  }

  openMessage(selectedUser): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { selectedUser: selectedUser },
      width: '400px'
    });
  }
}
