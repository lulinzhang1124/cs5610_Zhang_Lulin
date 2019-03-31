import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})

// export class WidgetImageComponent implements OnInit {
//   @ViewChild('f') imageForm: NgForm;
//   wgid: string;
//   pageId: string;
//   websiteId: string;
//   userId: string;
//   widget: WidgetImage;
//   errorFlag: Boolean;
//   errorMsg: string;
//   baseUrl = environment.baseUrl;
//
//   constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) {
//     this.widget = new WidgetImage( '',  '',  '', '', '', '');
//   }
//
//   updateWidget() {
//     if (this.widget.url === undefined) {
//       this.errorFlag = true;
//       return;
//     }
//     if (this.wgid === undefined) {
//       // this.widget.type = 'IMAGE';
//       this.widget.pageId = this.pageId;
//       this.widgetService.createWidget(this.pageId, this.widget).subscribe(
//         (widget: Widget) => {
//           console.log('create widget image !');
//           },
//         (error: any) => console.log(error)
//       );
//     } else {
//       this.widgetService.updateWidget(this.widget._id, this.widget).subscribe(
//         (widget: Widget) => {
//           console.log('update widget image !');
//           },
//         (error: any) => console.log(error)
//       );
//     }
//     this.router.navigate(['../'], {relativeTo: this.activatedRoute});
//   }
//
//   deleteWidget() {
//     this.widgetService.deleteWidget(this.wgid).subscribe(
//       () => this.router.navigate(['../'], {relativeTo: this.activatedRoute})
//     );
//   }
//
//   ngOnInit() {
//     this.errorFlag = false;
//     this.errorMsg = 'Please enter valid URL!';
//     this.activatedRoute.params.subscribe(
//       (params: any) => {
//         this.userId = params['uid'];
//         this.websiteId = params['wid'];
//         this.pageId = params['pid'];
//         this.wgid = params['wgid'];
//         if (this.wgid === undefined) {
//           this.widget = new WidgetImage('', 'IMAGE', '', this.pageId, '100%', '');
//         } else {
//           this.widgetService.findWidgetById(this.wgid).subscribe(
//             (widget: WidgetImage) => {
//               this.widget = widget;
//               console.log(this.widget);
//             });
//         }
//       });
//   }
//
// }
export class WidgetImageComponent implements OnInit {
  @ViewChild('f') imageForm: NgForm;
  pageID: String;
  wgid: String;
  websiteId: String;
  userId: String;
  type: String;
  width: String;
  name: String;
  text: String;
  url: String;
  widget: any = {};
  baseUrl: String = environment.baseUrl;

  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private route: Router) {}

  upload() {
    // this.name = this.imageForm.value.headerName;
    this.text = this.imageForm.value.text;
    this.url = this.imageForm.value.url;
    this.width = this.imageForm.value.width;
    this.type = 'IMAGE';

    // const new_widget = new Widget(undefined, 'IMAGE', this.pageID,
    //     '1', this.text.toString(), this.width.toString(), this.url.toString());
    const new_widget = {
      _id: '', widgetType: this.type, name: '', pageId: this.pageID, size: '1', text: this.text.toString(),
      url: this.url.toString(), width: this.width.toString(),
      height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
    };
    if (new_widget.widgetType === undefined) {
      new_widget.widgetType = 'IMAGE';
    }
    this.widgetService.createWidget(this.pageID, new_widget).subscribe(
      (widget: any) => {
        this.widget = widget;
        console.log(this.widget);
      });
  }

  delete() {
    this.widgetService.deleteWidget(this.wgid).subscribe(
      () => this.route.navigate(['../'], {relativeTo: this.activatedRoute})
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageID = params['pid'];
        this.wgid = params['wgid'];
        if (this.wgid === undefined) {
          this.widget = {
            _id: '', widgetType: 'IMAGE', name: '', pageId: this.pageID, size: '1', text: '', url: '', width: '100%',
            height: 100, rows: 0, class: '', icon: '', deletable: false, formatted: false, placeholder: ''
          };
        } else {
          this.widgetService.findWidgetById(this.wgid).subscribe(
            (widget: any) => {
              this.widget = widget;
              console.log(this.widget);
            });
        }
      });
  }

}
