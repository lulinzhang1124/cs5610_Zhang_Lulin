import {Injectable} from '@angular/core';
import {Widget, WidgetHeading, WidgetHtml, WidgetImage, WidgetYoutube} from '../models/widget.model.client';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export  class WidgetService {
  private widgetChosen = new BehaviorSubject('DEFAULT');
  currentWidgetType = this.widgetChosen.asObservable();
  widgets: Widget[] = [
    new WidgetHeading('123', 'HEADING', '321', 2, 'GIZMODO'),
    new WidgetHeading('234', 'HEADING', '321', 4, 'Lorem ipsum'),
    new WidgetImage('345', 'IMAGE', '321', '100%', 'http://lorempixel.com/400/200'),
    new WidgetHtml('456', 'HTML', '321', '<p>Lorem ipsum</p>'),
    new WidgetHeading('567', 'HEADING', '321', 4, 'Lorem ipsum'),
    new WidgetYoutube('678', 'YOUTUBE', '321', '100%', 'https://www.youtube.com//embed/eSLe4HuKuK0'),
    new WidgetHtml('789', 'HTML', '321', '<p>Lorem ipsum</p>')
    ];

  createWidget(pageId, widget) {
    widget._id = String(Math.floor(Math.random() * 1000) + 1);
    widget.pageId = pageId;
    this.widgets.push(widget);
  }

  findWidgetsByPageId(pageId) {
    return this.widgets.filter((widget) => {
      return widget.pageId === pageId;
    });
  }

  findWidgetById(widgetId) {
    return this.widgets.find((widget) => {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId, widget: any) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType) {
          case 'HEADING':
            // @ts-ignore
            this.widgets[i].text = widget.text;
            // @ts-ignore
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            // @ts-ignore
            this.widgets[i].text = widget.text;
            // @ts-ignore
            this.widgets[i].url = widget.url;
            // @ts-ignore
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            // @ts-ignore
            this.widgets[i].text = widget.text;
            // @ts-ignore
            this.widgets[i].url = widget.url;
            // @ts-ignore
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }

  deleteWidget(widgetId) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
        break;
      }
    }
  }

  chooseNewType(widgetType: string) {
    this.widgetChosen.next(widgetType);
  }
}
