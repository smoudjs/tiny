import { EventTarget } from '../utils/EventTarget.js';
import { _Math } from '../math/Math.js';
import { App } from './App.js';

var listeningToTouchEvents;

var InputSystem = function (app) {
  this.app = app;
  this.domElement = app.inputView;

  this.bounds = { x: 0, y: 0, width: app.width, height: app.height };
  this.candidates = [];
  this.list = [];

  this.lastMove = null;
  this.isDown = false;

  this.downHandler = this.downHandler.bind(this);
  this.moveHandler = this.moveHandler.bind(this);
  this.upHandler = this.upHandler.bind(this);

  this.updateBounds = this.updateBounds.bind(this);

  app.on('resize', this.resize, this);
  // this.clickHandler.bind(this);

  // for (var i = 0; i < InputSystem.systems.length; i++) {
  //     InputSystem.systems[i].init.call(this);
  // }

  this.setDOMElement(app.inputView);
};

InputSystem.prototype = {
  setDOMElement: function (view) {
    this.removeEvents();
    this.domElement = view || this.domElement;
    this.addEvents(view);
  },

  addEvents: function (view) {
    var view = this.domElement;

    view.addEventListener('touchstart', this.downHandler);
    view.addEventListener('touchmove', this.moveHandler);
    view.addEventListener('touchend', this.upHandler);
    view.addEventListener('touchcancel', this.upHandler);

    // view.addEventListener('click', this.clickHandler);

    view.addEventListener('mousedown', this.downHandler);
    view.addEventListener('mousemove', this.moveHandler);
    globalThis.addEventListener('mouseup', this.upHandler);

    this.resize();
  },

  removeEvents() {
    var view = this.domElement;

    view.removeEventListener('touchstart', this.downHandler);
    view.removeEventListener('touchmove', this.moveHandler);
    view.removeEventListener('touchend', this.upHandler);
    view.removeEventListener('touchcancel', this.upHandler);

    // view.removeEventListener('click', this.clickHandler);

    view.removeEventListener('mousedown', this.downHandler);
    view.removeEventListener('mousemove', this.moveHandler);
    globalThis.removeEventListener('mouseup', this.upHandler);
  },

  add: function (object, options) {
    options = options || {};
    options.system = this;
    options.enabled = true;
    object.input = options;

    this.list.push(object);
  },

  remove: function (object) {
    var index = this.list.indexOf(object);

    if (index > -1) {
      var removed = this.list[index];
      removed.input = null;

      this.list.splice(index, 1);

      return removed;
    }
  },

  inputHandler: function (name, event) {
    // console.log(name)
    var coords = this.getCoords(event);

    if (coords !== null) {
      if (name != 'move') {
        this.candidates.length = 0;

        // for (var i = 0; i < InputSystem.systems.length; i++) {
        //     InputSystem.systems[i].preHandle.call(this, coords.x, coords.y);
        // }

        var isGood, obj;

        for (var t = 0; t < this.list.length; t++) {
          obj = this.list[t];

          if (!(obj.input && obj.input.enabled && obj.parent)) continue;

          if (obj.input.checkBounds) isGood = obj.input.checkBounds.call(this, obj, coords.x, coords.y);
          else isGood = InputSystem.checkBounds.call(this, obj, coords.x, coords.y);

          if (isGood) this.candidates.push(obj);
        }

        //var i = this.candidates.length

        for (var i = this.candidates.length - 1; i >= 0; i--) {
          obj = this.candidates[i];
          obj.input['last_' + name] = {
            x: coords.x,
            y: coords.y
          };

          obj.emit(name, {
            x: coords.x,
            y: coords.y
          });

          if (name == 'up') {
            var point = obj.input['last_down'];
            if (point && _Math.distance(point.x, point.y, coords.x, coords.y) < 30) {
              obj.emit('click', {
                x: coords.x,
                y: coords.y
              });
            }
          }

          if (!obj.input.transparent) {
            break;
          }
        }

        // if (i > 0) {
        //     var obj = this.candidates[i - 1]
        //     obj.input["last_" + name] = {x: coords.x, y: coords.y}

        //     obj.input.emit(name, {x: coords.x, y: coords.y})

        //     if (name == "up") {
        //         var point = obj.input["last_down"]
        //         if (point && _Math.distance(point.x, point.y, coords.x, coords.y) < 30)
        //             obj.input.emit("click", {x: coords.x, y: coords.y})
        //     }
        // }
      }

      this.emit(name, {
        x: coords.x,
        y: coords.y
      });
    }
  },

  moveHandler: function (event) {
    this.lastMove = event;
    this.inputHandler('move', event);
  },

  upHandler: function (event) {
    this.isDown = false;
    this.inputHandler('up', this.lastMove);
  },

  downHandler: function (event) {
    this.isDown = true;
    this.lastMove = event;
    this.updateBounds();
    this.inputHandler('down', event);
  },

  clickHandler: function (event) {
    this.inputHandler('click', event);
  },

  getCoords: function (event) {
    var coords = null;

    if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
      listeningToTouchEvents = true;

      if (event.touches.length > 0) {
        coords = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      } else if (event.clientX && event.clientY) {
        coords = {
          x: event.clientX,
          y: event.clientY
        };
      } else {
        // listeningToTouchEvents = false;
      }
    } else {
      // Mouse event
      coords = {
        x: event.clientX,
        y: event.clientY
      };
    }

    if ((listeningToTouchEvents && event instanceof MouseEvent) || coords === null) return null;

    const resolutionMultiplier = 1.0 / this.app.resolution;
    let widthMultiplier = 1;
    let heightMultiplier = 1;
    if (this.domElement.width) widthMultiplier = (this.domElement.width / this.bounds.width) * resolutionMultiplier;
    if (this.domElement.height) heightMultiplier = (this.domElement.height / this.bounds.height) * resolutionMultiplier;

    coords = {
      x: (coords.x - this.bounds.x) * widthMultiplier,
      y: (coords.y - this.bounds.y) * heightMultiplier
    };

    return coords;
  },

  resize: function () {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(this.updateBounds, 0);
  },

  updateBounds: function () {
    var bounds = this.bounds;

    //  this.domElement.isConnected - check if this.domElement is in the DOM
    var clientRect = this.domElement.getBoundingClientRect();

    bounds.x = clientRect.left;
    bounds.y = clientRect.top;
    bounds.width = clientRect.width;
    bounds.height = clientRect.height;
  },

  dispose: function () {
    this.removeEvents();
    this.app.off('resize', this.resize, this);
  }
};

InputSystem.checkBounds = function (obj, x, y) {
  if (obj.worldVisible) {
    if (obj.getBounds().contains(x, y)) {
      return true;
    }
  }

  // if (obj.children && obj.children.length > 0)
  // {
  //     for (var t = 0; t < obj.children.length; t++)
  //     {
  //         _checkOnActiveObjects(obj.children[t], x, y);
  //     }
  // }
};

EventTarget.mixin(InputSystem);

// InputSystem.systems = [];

InputSystem.system = {
  name: 'input',
  rooted: true
};

App.registerSystem(InputSystem);

export { InputSystem };
