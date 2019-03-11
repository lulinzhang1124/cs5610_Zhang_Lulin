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
  username: string;
  updateFlag: boolean;
  updateMsg: string;
  userErrorFlag: boolean;
  userErrorMsg: string;

  updateUser(user: User) {
    this.updateFlag = false;
    this.userErrorFlag = false;
    if (this.username !== this.user.username) {
      this.userService.findUserByUsername(this.username).subscribe(
        (user: User) => {
          if (typeof user._id !== 'undefined') {
            this.userErrorFlag = true;
          } else {
            this.user.username = this.username;
            this.updateProfile();
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      this.updateProfile();
    }
  }
  updateProfile() {
    this.userService.updateUser(this.user._id, this.user).subscribe(
      (user: User) => {
        this.user = user;
        this.updateFlag = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.updateFlag = false;
      this.userErrorFlag = false;
      this.updateMsg = 'Profile updated!';
      this.userErrorMsg = 'The username already exists! Please use a different name.';

      this.userId = params['uid'];
      this.userService.findUserById(params['uid']).subscribe(
        (user: User) => {
          this.user = user;
          this.username = this.user.username;
        },
        (error: any) => console.log(error)
      );
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user._id).subscribe(
      (user: User) => {
        console.log('delete user: ' + this.user._id);
        this.router.navigate(['/login']);
      },
      (error: any) => console.log(error)
    );
  }
}
