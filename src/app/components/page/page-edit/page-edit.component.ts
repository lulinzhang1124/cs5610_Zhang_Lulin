import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {Page} from '../../../models/page.model.client';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: Page;
  userId: string;
  websiteId: string;

  constructor(private  pageService: PageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.user = this.userService.findUserById(params['uid']);
      // this.website = this.websiteService.findWebsiteById(params['wid']);
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.page = this.pageService.findPageById(params['pid']);
      console.log('page-edit: page id = ' + this.page._id + ', user_id = '
        + this.userId + ', website id = ' + this.websiteId);
    });
  }
  updatePage(page: Page) {
    this.pageService.updatePage(this.page._id, page);
    console.log(this.page);
    this.router.navigate((['/user', this.userId, 'website', this.websiteId, 'page']));
  }
  deletePage() {
    console.log(this.page);
    this.pageService.deletePage(this.page._id);
    this.router.navigate((['/user', this.userId, 'website', this.websiteId, 'page']));
  }

}
