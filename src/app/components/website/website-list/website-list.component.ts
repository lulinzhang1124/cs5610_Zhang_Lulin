import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {Page} from '../../../models/page.model.client';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  user: User;
  websites: Website[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.user = this.userService.findUserById(params['uid']);
      this.websites = this.websiteService.findWebsitesByUser(params['uid']);
      console.log('website-list-length:' + this.websites.length + ', user_id =' + this.user._id);
    });
  }

}
