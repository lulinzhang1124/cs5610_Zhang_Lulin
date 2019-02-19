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
  @ViewChild('f') ResigterForm: NgForm;
  user: User = new User(undefined, undefined, undefined);
  v_password: string;
  errorFlag: boolean;
  errorMsg = 'Password mis-matching!';

  constructor(private userService: UserService, private router: Router) { }

  register( v_password: String ) {
    if (v_password === this.user.password) {
      this.errorFlag = false;
      this.userService.createUser(this.user);
      this.router.navigate((['/user/', this.user._id]));
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }

}
