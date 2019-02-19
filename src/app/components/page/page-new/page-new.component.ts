import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
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
      console.log('page-new, user_id = ' + this.userId + ', website id = ' + this.websiteId);
    });
  }
  createPage(newpage: Page) {
    // newpage._id = '1111';
    // this.page._id = '1111';
    this.pageService.createPage(this.websiteId, newpage);
    this.router.navigate((['user', this.userId, 'website', this.websiteId, 'page']));
  }

}
