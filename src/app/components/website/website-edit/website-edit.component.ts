import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  user: User;
  websites: Website[];
  web: Website;
  errorFlag: boolean;
  errorMsg = 'Cannot create website !';

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.userService.findUserById(params['uid']);
      this.websites = this.websiteService.findWebsitesByUser(params['uid']);
      this.web = this.websiteService.findWebsiteById(params['wid'])
      console.log('website-edit, user_id =' + this.user._id, ', webstie id =', + this.web._id);
    });
  }
  updateWeb(website: Website) {
    console.log(this.web);
    this.websiteService.updateWebsite(this.web._id, website);
    this.router.navigate((['/user', this.user._id, 'website']));
  }
  deleteWeb() {
    console.log(this.web);
    this.websiteService.deleteWebsite(this.web._id);
    this.router.navigate((['/user', this.user._id, 'website']));
  }

}
