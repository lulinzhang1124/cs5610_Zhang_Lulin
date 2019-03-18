
module.exports = function (app) {
  var path = require('path');
  const multer = require('multer'); // npm install multer --save
  //const upload = multer({destination: __dirname + '/../../src/assets/uploads'});
  const baseUrl = 'https://luckyhusky.herokuapp.com';
  //'https://luckyhusky.herokuapp.com'
  //"http://localhost:3200"

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  app.put("/api/page/:pageId/widget?", reorderWidgets);

  var storage = multer.diskStorage({
    destination: __dirname + '/../../dist/web5610/assets/uploads/',
    filename: function (req, file, cb) {
      cb(null,  file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage
  }).single("myFile");
  //UPLOAD
  app.post ("/api/upload", upload, uploadImage);
  app.get("/api/image/:imageName", findImage);

  var widgets = [
    {_id: '123', widgetType: 'HEADING', pageId: '321', size: '2', text: 'GIZMODO'},
    {_id: '234', widgetType: 'HEADING', pageId: '321', size: '4', text: 'Lorem ipsum'},
    {_id: '345', widgetType: 'IMAGE', pageId: '321', size: '2', text: 'text', width: '100%',
      url: 'http://lorempixel.com/400/200/'},
    {_id: '456', widgetType: 'HTML', pageId: '321', size: '2', text: '<p>Lorem ipsum</p>'},
    {_id: '678', widgetType: 'YOUTUBE', pageId: '321', size: '2', text: 'text', width: '100%',
      url: 'https://www.youtube.com//embed/eSLe4HuKuK0'}
  ];

  function findImage(req, res) {
    var imageName = req.params.imageName;
    res.sendFile(path.resolve("/../../src/assets/uploads/" + imageName));
  }

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    var name = req.body.name;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    // condition when myFile is null
    const callbackUrl = baseUrl + '/user/' + userId + "/website/" + websiteId
      + "/page/" + pageId + "/widget";
    if (myFile == null) {
      res.redirect(callbackUrl + '/' + widgetId);
      return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    //var filepath = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    if (widgetId === '') {
      var widget = {_id: '', widgetType: 'IMAGE', pageId: pageId, size: '', text: '', width: '', url: '', name: ''};
      widget._id = (new Date()).getTime().toString();
      widget.url = baseUrl + '/assets/uploads/' + filename;

      console.log('create widget image: ' + widget._id);
      widgets.push(widget);
      res.redirect(callbackUrl + '/' + widget._id);
      return;
    }

    // find widget by id
    var widget;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        widget = widgets[i];
        break;
      }
    }

    widget.url = baseUrl+ '/uploads/' + filename;
    res.redirect(callbackUrl+ '/' + widgetId);
  }

  function createWidget(req, res) {
    const widget = req.body;
    widget._id = (new Date()).getTime().toString();
    console.log(req.body);
    console.log('create new widget: ' + widget._id);
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params['pageId'];
    const resultSet = widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
    if (resultSet) {
      console.log("find widgets for page: success");
      res.json(resultSet);
    } else {
      console.log("find widgets for page: not found");
      res.json({});
    }
  }

  function findWidgetById(req, res) {
    const widgetId = req.params['widgetId'];
    const widget = widgets.find(function (widget) {
      return widget._id === widgetId;
    });
    if (widget) {
      console.log("find widget by id: " + widget._id);
      res.json(widget);
    } else {
      console.log("find widget by id: not found");
      res.json({});
    }
  }

  function updateWidget(req, res) {
    const widgetId = req.params['widgetId'];
    const widget = req.body;
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        console.log(req.body);
        console.log("update widget: " + widgetId);
        switch (widgets[i].widgetType) {
          case 'HEADING':
            widgets[i].name = widget.name;
            widgets[i].text = widget.text;
            widgets[i].size = widget.size;
            widgets[i].url = "";
            widgets[i].width = "";
            widgets[i].rows = "";
            widgets[i].placeholder = "";
            widgets[i].formatted = "";
            res.status(200).send(widgets[i]);
            return;
          case 'IMAGE':
            widgets[i].name = widget.name;
            widgets[i].text = widget.text;
            widgets[i].size = "";
            widgets[i].url = widget.url;
            widgets[i].width = widget.width;
            widgets[i].rows = "";
            widgets[i].placeholder = "";
            widgets[i].formatted = "";
            res.status(200).send(widgets[i]);
            return;
          case 'YOUTUBE':
            widgets[i].name = widget.name;
            widgets[i].text = widget.text;
            widgets[i].size = "";
            widgets[i].url = widget.url;
            widgets[i].width = widget.width;
            widgets[i].rows = "";
            widgets[i].placeholder = "";
            widgets[i].formatted = "";
            res.status(200).send(widgets[i]);
            return;
          case 'HTML':
            widgets[i].name = widget.name;
            widgets[i].text = widget.text;
            widgets[i].size = "";
            widgets[i].url = "";
            widgets[i].width = "";
            widgets[i].rows = "";
            widgets[i].placeholder = "";
            widgets[i].formatted = "";
            res.status(200).send(widgets[i]);
            return;
          default:
            res.status(404).send("widget type hasn't supported yet");
        }
      }
    }
    res.status(404).send("not found!");  }

  function deleteWidget(req, res) {
    const widgetId = req.params['widgetId'];
    for (const i in widgets) {
      if (widgets[i]._id === widgetId) {
        const j = +i;
        res.json(widgets[i]);
        console.log('delete widget: ' + widgetId);
        widgets.splice(j, 1);
        return;
      }
    }
  }

  function reorderWidgets(req, res) {
    console.log(req.query);
    // var pageId = req.params.pageId;
    var startIndex = parseInt(req.query["initial"]);
    var endIndex = parseInt(req.query["final"]);

    array_move(widgets, startIndex, endIndex);

    res.send({});
  }

  function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };


};
