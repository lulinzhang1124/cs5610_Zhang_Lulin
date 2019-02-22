import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  errorMsg = 'Invalid email address !';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  userId: string;
  user: User;

  updateUser(user: User) {
    // console.log(this.userId);
    // if (this.newusername === '') {
    //   this.newusername = this.user.username;
    // }
    // if (this.newfirstName === '') {
    //   this.newfirstName = this.user.firstName;
    // }
    // if (this.newlastName === '') {
    //   this.newlastName = this.user.lastName;
    // }
    // this.newUser = new User(this.userId, this.newusername, this.user.password);
    // this.newUser.firstName = this.newfirstName;
    // this.newUser.lastName  = this.newlastName;
    this.userService.updateUser(this.userId, this.user);
    this.router.navigate((['/user', this.userId]));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.user = this.userService.findUserById(params['uid']);
      console.log('user_id =' + this.userId);
    });
  }
}
