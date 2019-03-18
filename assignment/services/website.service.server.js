module.exports = function(app){
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    {'_id': '123', 'name': 'Facebook', developerId: '456', 'description': 'Lorem'},
    {'_id': '235', 'name': 'Tweeter', developerId: '456', 'description': 'Lorem'},
    {'_id': '456', 'name': 'Gizmodo', developerId: '456', 'description': 'Lorem'},
    {'_id': '890', 'name': 'Go', developerId: '123', 'description': 'Lorem'},
    {'_id': '567', 'name': 'Tic Tac Toe', developerId: '123', 'description': 'Lorem'},
    {'_id': '678', 'name': 'Checkers', developerId: '123', 'description': 'Lorem'},
    {'_id': '789', 'name': 'Chess', developerId: '234', 'description': 'Lorem'}

];

  function createWebsite(req, res) {
    const new_website = {
      _id: (new Date()).getTime().toString(),
      name: req.body.name,
      developerId: req.params['userId'],
      description: req.body.description
    };
    console.log('create website: ' + new_website._id + " " + new_website.name);
    websites.push(new_website);
    res.json(new_website);
  }

  function findAllWebsitesForUser(req, res) {
    const userId = req.params['userId'];
    const resultSet = websites.filter(function (website) {
      return website.developerId === userId;
    });
    if (resultSet) {
      console.log("find websites for user: success");
      res.json(resultSet);
    } else {
      console.log("find websites for user: not found");
      res.json({});
    }
  }

  function findWebsiteById(req, res) {
    const websiteId = req.params['websiteId'];
    const website = websites.find(function (website) {
      return website._id === websiteId;
    });
    if (website) {
      console.log("find website by id: " + website._id + " " + website.name);
      res.json(website);
    } else {
      console.log("find website by id: not found");
      res.json({});
    }
  }

  function updateWebsite(req, res) {
    const websiteId = req.params['websiteId'];
    const website = req.body;

    for (const i in websites) {
      if (websites[i]._id === websiteId) {
        console.log(req.body);
        console.log("update website: " + websiteId + " " + website.name);

        websites[i].name = website.name;
        websites[i].description = website.description;
        res.status(200).send(website);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteWebsite(req, res) {
    const websiteId = req.params['websiteId'];
    for (const i in websites) {
      if (websites[i]._id === websiteId) {
        const j = +i;
        res.json(websites[i]);
        console.log('delete website: ' + websiteId);
        websites.splice(j, 1);
        return;
      }
    }
  }
};
