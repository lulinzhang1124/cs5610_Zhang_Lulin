import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetHeaderComponent} from './widget-header/widget-header.component';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})

export class WidgetEditComponent implements OnInit {
  widget: Widget;
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widgetChosen: string;
  constructor(private  widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      console.log('widget-edit, user_id = ' + this.userId
        + ', website id = ' + this.websiteId + ', page id = ' + this.pageId + '.widget id = ' + this.widgetId);
    });
    this.widgetService.currentWidgetType
      .subscribe(
        (widgetChosen: string) => {
          this.widgetChosen = widgetChosen;
        }
      );
    console.log(this.widgetId);
    if (this.widgetId !== 'undefined') {
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    }
  }

}
