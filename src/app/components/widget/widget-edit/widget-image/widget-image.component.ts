import {Component, OnInit} from '@angular/core';
import {Widget, WidgetImage} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  widget = new WidgetImage('', '', '', '', '');
  userId: string;
  pageId: string;
  widgetId: string;
  newWidget: Widget;
  name: string;
  newWidgetText: string;

  constructor(private  widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) {
  }

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
      this.newWidget = new WidgetImage('', 'IMAGE', this.pageId, this.widget.width, this.widget.url);
      this.widgetService.createWidget(this.pageId, this.newWidget);
    } else {
      this.newWidget = new WidgetImage(this.widget._id, 'IMAGE', this.pageId, this.widget.width, this.widget.url);
      this.widgetService.updateWidget(this.widget._id, this.newWidget);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
