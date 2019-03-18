import {Component, OnInit} from '@angular/core';
import {Widget, WidgetHeading} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  widget = new WidgetHeading('', '', '', '', null, '');
  userId: string;
  pageId: string;
  widgetId: string;
  newWidget: Widget;
  // name: string;

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
      this.widget = this.widgetService.findWidgetById(this.widgetId).subscribe(
        (widget: WidgetHeading) => {
          this.widget = widget;
          console.log('loading widget-heading success!');
        }
      );
    }
  }

  updateWidget() {
    if (this.widgetId === 'undefined') {
      this.newWidget = new WidgetHeading('', 'HEADING', this.widget.name, this.pageId, this.widget.size, this.widget.text);
      this.widgetService.createWidget(this.pageId, this.newWidget).subscribe(
        (new_wgt: WidgetHeading) => {
          this.widget = new_wgt;
          console.log('create widget-heading success!');
        }
      );
    } else {
      this.newWidget = new WidgetHeading(this.widgetId, 'HEADING', this.widget.name, this.pageId, this.widget.size, this.widget.text);
      this.widgetService.updateWidget(this.widget._id, this.newWidget).subscribe(
        (new_wgt: WidgetHeading) => {
          console.log('update widget-heading success!');
        }
      );
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widget._id).subscribe(
      (d_widget: any) => {
        console.log('delete widget-heading success!');
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

}
