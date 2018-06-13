// author Tigist Damesa ....05/02/2018

import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  NgControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileform: FormGroup;
  pattern = '^(([0-9]{3}) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.email =
      this.route.snapshot.paramMap.get('email') ||
      localStorage.getItem('email');
    this.isRegistered = this.route.snapshot.paramMap.get('name') === null;
    if (this.route.snapshot.paramMap.get('email')) {
      this.isCurrentUser = false;
    }
    this.profileform = formBuilder.group({
      name: [route.snapshot.paramMap.get('name'), Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(this.pattern)],
      username: [route.snapshot.paramMap.get('email')]
    });
  }
  email;
  isRegistered = false;
  isCurrentUser = true;

  // update existing user profile
  ngOnInit() {
    if (this.isRegistered) {
      this.userService.getUser(this.email).subscribe(user => {
        this.profileform.controls.email.setValue(user.email);
        this.profileform.controls.name.setValue(user.name);
        this.profileform.controls.phone.setValue(user.phone);
      });
    }
  }

  // checks if user exists or new and create or updates profile
  onSubmit() {
    const profile = this.profileform.value;
    profile.group = [];
    if (!this.isRegistered) {
      this.userService.createUser(profile).subscribe(result => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.updateUser(this.email, profile).subscribe(result => {
        this.router.navigate(['/users']);
      });
    }
  }
  setDefault() {}
}
