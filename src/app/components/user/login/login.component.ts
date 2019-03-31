import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
    // this.username = 'hello world!';
  }

  ngOnInit() {
    console.log('Login page!' + this.username);
  }
  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.findUserByCredentials(this.username, this.password).subscribe(
      (user: User) => {
        console.log(user);
        if (user) {
          console.log('get user success! ' + user._id);
          this.router.navigate(['/user', user._id]);
        } else {
          this.errorFlag = true;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


}
