import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';


@Injectable()
export class PageService {

  pages: Page[] = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];

  api = {};

  createPage(websiteId: string, page: Page) {
    // page._id = '1111';
    // page.websiteId = websiteId;
    this.pages.push(new Page('1111', page.name, websiteId, page.description));
    // this.pages.push(page);
  }

  findPageByWebsiteId(websiteId) {
    return this.pages.filter((page) => {
      return page.websiteId === websiteId;
    });
  }

  findPageById(pageId) {
    return this.pages.find((page) => {
      return page._id === pageId;
    });
  }

  updatePage(pageId, page) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        this.pages[i].name = page.name;
        this.pages[i].description = page.description;
      }
    }
  }

  deletePage(pageId) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        const j = +i;
        this.pages.splice(j, 1);
        break;
      }
    }
  }
}
