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
  newUsername: string;
  newPassword: string;
  regVerifiedPassword: string;
  user: User = {_id: '', username: '', password: '', firstName: '', lastName: ''};

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.user.username = this.newUsername;
    this.user.password = this.newPassword;
    this.userService.createUser(this.user);
    const loginUser = this.userService.findUserByCredentials(this.newUsername, this.newPassword);
    this.router.navigate(['/user', loginUser._id]);
  }

  onCancel() {
    this.signupForm.reset();
  }
}
