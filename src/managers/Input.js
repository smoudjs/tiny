var lastMove, _active_objects, listeningToTouchEvents, _last_bounds;
var game, currentEmiter;

function windowToUISpace(x, y, history)
{
    var bounds = ((history && _last_bounds) ? _last_bounds : (_last_bounds = game.inputView.getBoundingClientRect(), _last_bounds));

    return {
        x: (x - bounds.left),
        y: (y - bounds.top),
    };
}

function _getCoords(event, history)
{
    var coords = null;

    if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
    {
        listeningToTouchEvents = true;

        if (event.touches.length > 0)
        {
            coords = {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            };
        }
        else if (event.pageX && event.pageY)
        {
            coords = {
                x: event.pageX,
                y: event.pageY
            };
        }
        else
        {
            // listeningToTouchEvents = false;
        }
    }
    else
    {
        // Mouse event
        coords = {
            x: event.pageX,
            y: event.pageY
        };
    }

    if (listeningToTouchEvents && event instanceof MouseEvent || coords === null) return null;

    coords = windowToUISpace(coords.x, coords.y, history);

    return coords;
}

function _checkOnActiveObjects(obj, x, y)
{
    if (obj.inputEnabled && obj.worldVisible)
    {
        if (obj.getBounds().contains(x, y)) 
        {
            _active_objects.push(obj);
        }
    }

    if (obj.children && obj.children.length > 0)
    {
        for (var t = 0; t < obj.children.length; t++) 
        {
            _checkOnActiveObjects(obj.children[t], x, y);
        }
    }
}

function inputHandler(name, event, history)
{
    // console.log(name)
    var coords = _getCoords(event, history);

    if (coords !== null)
    {
        if (name != "move")
        {
            _active_objects.length = 0;

            _checkOnActiveObjects(game.stage, coords.x, coords.y)

            //var i = _active_objects.length

            for (var i = _active_objects.length - 1; i >= 0; i--)
            {
                var obj = _active_objects[i]
                obj.input["last_" + name] = {
                    x: coords.x,
                    y: coords.y
                }

                obj.input.emit(name,
                {
                    x: coords.x,
                    y: coords.y
                })

                if (name == "up")
                {
                    var point = obj.input["last_down"]
                    if (point && Tiny.Math.distance(point.x, point.y, coords.x, coords.y) < 30)
                        obj.input.emit("click",
                        {
                            x: coords.x,
                            y: coords.y
                        })
                }

                if (!obj.input.transparent) 
                {
                    break
                }
            }

            // if (i > 0) {
            //     var obj = _active_objects[i - 1]
            //     obj.input["last_" + name] = {x: coords.x, y: coords.y}

            //     obj.input.emit(name, {x: coords.x, y: coords.y})

            //     if (name == "up") {
            //         var point = obj.input["last_down"]
            //         if (point && Tiny.Math.distance(point.x, point.y, coords.x, coords.y) < 30)
            //             obj.input.emit("click", {x: coords.x, y: coords.y})
            //     }
            // }
        }

        currentEmiter.emit(name,
        {
            x: coords.x,
            y: coords.y
        });
    }
}

function moveHandler(event)
{
    lastMove = event;
    inputHandler("move", event, true);
}

function upHandler(event)
{
    currentEmiter.isDown = false;
    inputHandler("up", lastMove, true);
}

function downHandler(event)
{
    currentEmiter.isDown = true;
    lastMove = event;
    inputHandler("down", event, false);
}

function clickHandler(event)
{
    inputHandler("click", event, false);
}

Tiny.Input = function(parent)
{
    game = game = parent;
    _active_objects = [];
    currentEmiter = this;

    lastMove = null;
    this.isDown = false;

    var t = game.inputView.addEventListener;
    t('touchstart', downHandler);
    t('touchmove', moveHandler);
    t('touchend', upHandler);
    t('touchcancel', upHandler);

    // t('click', clickHandler);

    t('mousedown', downHandler);
    t('mousemove', moveHandler);
    t('mouseup', upHandler);

    Tiny.EventTarget.mixin(this)
};

Tiny.Input.prototype = {
    destroy: function()
    {
        var t = game.inputView.removeEventListener;
        t('touchstart', downHandler);
        t('touchmove', moveHandler);
        t('touchend', upHandler);
        t('touchcancel', upHandler);

        // t('click', clickHandler);

        t('mousedown', downHandler);
        t('mousemove', moveHandler);
        t('mouseup', upHandler);
    }
};