import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  user: User;
  websites: Website[];
  newWeb: Website;
  newWebsiteName: string;
  newWebsiteDescription: string;
  errorFlag: boolean;
  errorMsg = 'Cannot create website !';

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.userService.findUserById(params['uid']);
      this.websites = this.websiteService.findWebsitesByUser(params['uid']);
      console.log('website-new, user_id =' + this.user._id);
    });
  }

  newWebsite() {
    this.newWeb = {_id: '', name: this.newWebsiteName, developerId: this.user._id, description: this.newWebsiteDescription};
    this.websiteService.createWebsite(this.user._id, this.newWeb);
    this.router.navigate((['/user', this.user._id, 'website']));
  }

}
