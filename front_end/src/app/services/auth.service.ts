import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedUser: User= {
    email: '',
    password: '',
    image:''
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post("http://localhost:3000/api/register", user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post('http://localhost:3000/api//authenticate', authCredentials, this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserProfile() {
    return this.http.get('http://localhost:3000/api/userProfile');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  updateUser(user: User, _id: String) {
    return this.http.put('http://localhost:3000/api/update/' + _id, user);
  }


}
