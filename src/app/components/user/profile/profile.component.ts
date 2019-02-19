import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMsg = 'Invalid email address !';

  constructor(private userService: UserService, private router: ActivatedRoute) { }
  user: User;
  // firstName: string;
  // lastName: string;

  updateUser(user: User) {
    console.log(this.user);
    this.userService.updateUser(this.user._id, user);
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.user = this.userService.findUserById(params['uid']);
      // this.user._id = params['_id'];
      console.log('user_id =' + this.user._id);
    });
  }

  buttonClicked(event: any) {
    console.log(event); // your custom code on button click
  }

  // clickCancel() {
  //   this.router.navigate((['/login']));
  // }

}
