var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server.js');
var Widget = mongoose.model('Widget', WidgetSchema);

Widget.createWidget = createWidget;
Widget.findAllWidgetsForPage = findAllWidgetsForPage;
Widget.findWidgetById = findWidgetById;
Widget.updateWidget = updateWidget;
Widget.deleteWidget = deleteWidget;
Widget.reorderWidgets = reorderWidgets;
Widget.resetWidgets = resetWidgets;

module.exports = Widget;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return Widget.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return Widget.find({ _page: pageId });
}

function findWidgetById(widgetId) {
  return Widget.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  return Widget.findByIdAndUpdate(widgetId, widget);
}

function deleteWidget(widgetId) {
  Widget.findById(widgetId, function (err, foundWidget) {
    var index = foundWidget.position;
    resetWidgets(index, foundWidget._page);
  });
  return Widget.findByIdAndRemove(widgetId);
}

function resetWidgets(index, pageId) {
  Widget.find({ _page: pageId }, function (err, widgets) {
    widgets.forEach(function (widget) {
      if (widget.position > index) {
        widget.position--;
        widget.save();
      }
    })
  })
}

function reorderWidgets(pageId, start, end) {
  return Widget.find({ _page: pageId }, function (err, widgets) {
    widgets.forEach(function (widget) {
      if (start < end) {
        if (widget.position === start) {
          widget.position = end;
          widget.save();
        } else if (widget.position > start
          && widget.position <= end) {
          widget.position--;
          widget.save();
        } else {
          if (widget.position === start) {
            widget.position = end;
            widget.save();
          } else if (widget.position < start
            && widget.position >= end) {
            widget.position++;
            widget.save();
          }
        }
      }

      if (start > end) {
        if (widget.position === start) {
          widget.position = end;
          widget.save();
        } else if (widget.position < start
          && widget.position >= end) {
          widget.position++;
          widget.save();
        } else {
          if (widget.position === start) {
            widget.position = end;
            widget.save();
          } else if (widget.position > start
            && widget.position <= end) {
            widget.position--;
            widget.save();
          }
        }
      }
    })
  })
}
