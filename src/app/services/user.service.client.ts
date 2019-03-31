import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import {User} from '../models/user.model.client';
import {environment} from '../../environments/environment';


// injecting service into module

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) {}
   baseUrl = environment.baseUrl;

  // users: User[] = [
  //   {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
  //   {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
  //   {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia'},
  //   {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi'}
  // ];

  createUser(user: User) {
    return this._http.post(this.baseUrl + '/api/user', user);
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId);
  }

  findUserByUsername(username: String) {
    return this._http.get(this.baseUrl + '/api/user?username=' + username);
  }

  findUserByCredentials(username: String, password: String) {
    return this._http.get<User>(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
  }

  updateUser(userId: String, user: User) {
    return this._http.put(this.baseUrl + '/api/user/' + userId, user);
  }

  deleteUser(userId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId);
  }
}

