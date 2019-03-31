import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('form') signupForm: NgForm;
  newUsername: String;
  newPassword: String;
  regVerifiedPassword: String;
  user: User = {_id: '', username: '', password: '', firstName: '', lastName: '', email: '', phone: ''};
  userErrorMsg: String;
  userErrorFlag: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userErrorFlag = false;
    this.userErrorMsg = 'The username already exists! Please use a different name.';
  }

  register() {
    this.user.username = this.newUsername;
    this.user.password = this.newPassword;
    this.userService.findUserByUsername(this.newUsername).subscribe(
      (user: User) => {
        if (typeof user._id !== 'undefined') {
          this.userErrorFlag = true;
        } else {
          return this.userService.createUser(this.user).subscribe(
            (loginUser: User) => {
              this.router.navigate(['/user', loginUser._id]);
            }
          );
        }
      });
  }

  onCancel() {
    this.signupForm.reset();
  }
}
