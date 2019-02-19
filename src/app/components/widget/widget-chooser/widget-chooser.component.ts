import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  widgets: Widget[];
  userId: string;
  websiteId: string;
  pageId: string;

  constructor(private  widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
      console.log('widget-chooser, user_id = ' + this.userId + ', website id = ' + this.websiteId
        + ', page id = ' + this.pageId);
    });
  }

}
