export class User {
  _id: string;
  username: string;
  password: string;

  firstName: string;
  lastName: string;

  constructor(_id, username, password) {
    this._id = _id;
    this.username = username;
    this.password = password;
  }

}
