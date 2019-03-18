export class Website {
  _id: string;
  name: string;
  developerId: string;
  description: string;

  constructor(_id: string, name: string, developerId: string, description: string) {
    this._id = _id;
    this.name = name;
    this.developerId = developerId;
    this.description = description;
  }

}
