import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../../../../services/flickr.service.client';
import { WidgetService } from '../../../../../services/widget.service.client';
import { ActivatedRoute, Router } from '@angular/router';

import { PageService } from '../../../../../services/page.service.client';
import { WebsiteService } from '../../../../../services/website.service.client';
import { UserService } from '../../../../../services/user.service.client';
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  websiteId: string;
  pageId: string;
  userId: string;
  widgetId: string;
  photos: any[] = [{photo: ''}];
  error: string;
  searchText: String = '';
  widget: any;

  constructor(
    private flickrService: FlickrService,
    private widgetService: WidgetService,
    private pageService: PageService,
    private websiteService: WebsiteService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
        console.log('wgid ' + this.widgetId);
        if (this.widgetId === 'image') {
          this.widget = new Widget(undefined, 'IMAGE', '', this.pageId);
        } else {
          this.widgetService.findWidgetById(this.widgetId).subscribe(
            (widget: any) => {
              this.widget = widget;
            });
        }
      });
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    this.widget.url = url;

    this.widgetService
      .updateWidget(this.widgetId, this.widget)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId +
            '/widget/' + this.widgetId]);
          } else {
            this.error = 'failed!';
          }
        }
      );
  }
}
