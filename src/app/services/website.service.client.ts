import {Injectable} from '@angular/core';
import {Website} from '../models/website.model.client';


@Injectable()
export class WebsiteService {

  websites: Website[] = [
    {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '234', 'name': 'Tweeter', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'Lorem'}

  ];


  // api = {
  //   createWebsite: this.createWebsite,
  //   findWebsiteByUser: this.findWebsitesByUser,
  //   findWebsiteById: this.findWebsiteById,
  //   updateWebsite: this.updateWebsite,
  //   deleteWebsite: this.deleteWebsite
  // };

  createWebsite(userId, website: Website) {
    website._id = (new Date()).getTime() + '';
    website.developerId = userId;
    this.websites.push(new Website(website._id, website.name, userId, website.description));
    return website;
  }

  findWebsitesByUser(userId: string) {
    return this.websites.filter((website) => {
      return website.developerId === userId;
    });
  }

  findWebsiteById(websiteId) {
    return this.websites.find((website) => {
      return website._id === websiteId;
    });
  }

  updateWebsite(websiteId, website) {
    for (let i = 0; i < this.websites.length; i++) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i].name = website.name;
        this.websites[i].description = website.description;
        return this.websites[i];
      }
    }
  }

  deleteWebsite(websiteId) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        const j = +i;
        this.websites.splice(j, 1);
        break;
      }
    }
  }
}
