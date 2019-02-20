import { Component, OnInit } from '@angular/core';
import {Widget, WidgetHeading} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  widget = new WidgetHeading('', '', '', null, '');
  userId: string;
  pageId: string;
  widgetId: string;
  newWidget: Widget;
  name: string;

  constructor(private  widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
    if (this.widgetId !== 'undefined') {
      // @ts-ignore
      this.widget = this.widgetService.findWidgetById(this.widgetId);
    }
  }
  updateWidget() {
    if (this.widgetId === 'undefined') {
      this.newWidget = new WidgetHeading('', 'HEADING', this.pageId, this.widget.size, this.widget.text);
      this.widgetService.createWidget(this.pageId, this.newWidget);
    } else {
      this.newWidget = new WidgetHeading(this.widgetId, 'HEADING', this.pageId, this.widget.size, this.widget.text);
      this.widgetService.updateWidget(this.widget._id, this.newWidget);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
