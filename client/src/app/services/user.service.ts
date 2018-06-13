// author Tigist Damesa ....05/02/2018

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(email) {
    return this.http.get<User>(`${environment.apiRootUrl}/api/users/${email}`);
  }
  createUser(user) {
    return this.http.post(`${environment.apiRootUrl}/api/users`, user);
  }
  updateUser(email, user) {
    return this.http.put(`${environment.apiRootUrl}/api/users/${email}`, user);
  }
  getUsers(term) {
    return this.http.get<User[]>(`${environment.apiRootUrl}/api/users/search/${term || ''}`);
  }
}
