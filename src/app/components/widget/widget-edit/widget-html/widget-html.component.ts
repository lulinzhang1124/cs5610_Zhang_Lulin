import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {
    widget: any = {};
    userId: String;
    websiteId: String;
    pageId: String;
    widgetId: String;

    constructor(
        private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: any) => {
                this.widgetId = params['wgid'];
                this.pageId = params['pid'];
                this.userId = params['uid'];
                this.websiteId = params['wid'];
            }
        );

        // this.widget = this.widgetService.findWidgetById(this.widgetId);
        this.widgetService.findWidgetById(this.widgetId).subscribe(
            (widget: any) => {
                this.widget = widget;
            }
        );
    }

    updateWidget(updatedwidget: Widget) {
        // this.widgetService.updateWidget(widget._id, widget);
        // this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
        this.widgetService.updateWidget(this.widgetId, updatedwidget).subscribe(
            (widget: any) => {
                const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
                this.router.navigate([url]);
            }
        );
    }

    deleteWidget() {
        // this.widgetService.deleteWidget(this.widgetId);
        // this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
        this.widgetService.deleteWidget(this.widgetId).subscribe(
            (widget: any) => {
                const url: any = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
                this.router.navigate([url]);
            }
        );
    }
}
