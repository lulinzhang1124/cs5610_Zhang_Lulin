import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget, WidgetImage} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  @ViewChild('f') imageForm: NgForm;
  wgid: string;
  pageId: string;
  websiteId: string;
  userId: string;
  widget: WidgetImage;
  errorFlag: Boolean;
  errorMsg: string;
  baseUrl = environment.baseUrl;

  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) {
    this.widget = new WidgetImage( '',  '',  '', '', '', '');
  }

  updateWidget() {
    if (this.widget.url === undefined) {
      this.errorFlag = true;
      return;
    }
    if (this.wgid === undefined) {
      // this.widget.type = 'IMAGE';
      this.widget.pageId = this.pageId;
      this.widgetService.createWidget(this.pageId, this.widget).subscribe(
        (widget: Widget) => {
          console.log('create widget image !');
          },
        (error: any) => console.log(error)
      );
    } else {
      this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
        (widget: Widget) => {
          console.log('update widget image !');
          },
        (error: any) => console.log(error)
      );
    }
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.wgid).subscribe(
      () => this.router.navigate(['../'], {relativeTo: this.activatedRoute})
    );
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Please enter valid URL!';
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.wgid = params['wgid'];
        if (this.wgid === undefined) {
          this.widget = new WidgetImage('', 'IMAGE', '', this.pageId, '100%', '');
        } else {
          this.widgetService.findWidgetById(this.wgid).subscribe(
            (widget: WidgetImage) => {
              this.widget = widget;
              console.log(this.widget);
            });
        }
      });
  }

}
