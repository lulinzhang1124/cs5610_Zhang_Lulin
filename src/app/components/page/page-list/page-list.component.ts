import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  user: User;
  website: Website;
  pages: Page[];

  constructor(private userService: UserService,
              private websiteService: WebsiteService,
              private  pageService: PageService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.user = this.userService.findUserById(params['uid']);
      this.website = this.websiteService.findWebsiteById(params['wid']);
      this.pages = this.pageService.findPageByWebsiteId(params['wid']);
      console.log('page-list-length:' + this.pages.length + ', user_id = '
        + this.user._id + ', website id = ' + this.website._id);
    });
  }

}
