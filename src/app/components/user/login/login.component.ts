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
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
    this.username = 'hello world!';
  }

  ngOnInit() {
    console.log('Login page!' + this.username);
  }
  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.findUserByCredentials(this.username, this.password).subscribe(
      (user: User) => {
        if (typeof user._id !== 'undefined') {
          console.log(user);
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
