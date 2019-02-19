import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  widget: Widget;
  userId: string;
  websiteId: string;
  pageId: string;

  constructor(private  widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widget = this.widgetService.findWidgetById(params['wgid']);
      console.log('widget-header, user_id = ' + this.userId + ', website id = ' + this.websiteId
        + ', page id = ' + this.pageId + '.widget id = ' + this.widget._id);
    });
  }
  createWidget(wig: Widget) {
    this.widgetService.createWidget(this.pageId, wig);
    this.router.navigate((['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']));
  }
  updateWidget(wig: Widget) {
    this.widgetService.updateWidget(this.widget._id, wig);
    this.router.navigate((['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']));
  }
  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id);
    this.router.navigate((['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]));
  }

}
