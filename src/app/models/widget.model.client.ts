export class Widget {
  _id: string;
  widgetType: string;
  pageId: string;
  size: number;
  text: string;
  url: string;
  width: string;

  constructor(_id, type, pageId, size = 1, text = 'text', width = '100%', url = 'url') {
    this._id = _id;
    this.widgetType = type;
    this.pageId = pageId;
    this.size = size;
    this.url = url;
    this.width = width;
  }
}
