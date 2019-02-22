import {Injectable} from '@angular/core';
// import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs';
import {User} from '../models/user.model.client';

// injecting service into module

@Injectable()
export class UserService {

  constructor() {
  }

  users: User[] = [
    {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
    {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
    {_id: '345', username: 'charly', password: 'charly', firstName: 'Charly', lastName: 'Garcia'},
    {_id: '456', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose', lastName: 'Annunzi'}
  ];

  // api = {
  //   'createUser'   : this.createUser,
  //   'findUserById' : this.findUserById,
  //   'findUserByUsername': this.findUserByUsername,
  //   'updateUser': this.updateUser,
  //   'deleteUser': this.deleteUser,
  //   'findUserByCredentials': this.findUserByCredentials,
  // };

  createUser(user: User) {
    user._id = Math.random().toString();
    this.users.push(user);
    return user;
  }

  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }

  findUserByUsername(username: string) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        return this.users[i];
      }
    }
  }

  findUserByCredentials(username: string, password: string) {
    return this.users.find(function (user) {
      return user.username === username && user.password === password;
    });
  }

  updateUser(userId: string, user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
        this.users[i].username = user.username;
        return this.users[i];
      }
    }
  }

  deleteUser(userId: string) {
    for (const i in this.users) {
      if (this.users[i]._id === userId) {
        const j = +i;
        this.users.splice(j, 1);
      }
    }
  }
}

