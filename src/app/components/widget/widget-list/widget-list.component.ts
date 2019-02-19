import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  widgets: Widget[];
  userId: string;
  websiteId: string;
  pageId: string;

  constructor(private  widgetService: WidgetService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
      console.log('widget-list, user_id = ' + this.userId + ', website id = ' + this.websiteId
      + ', page id = ' + this.pageId);
    });
  }
  getSantizeUrl(url: string) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
