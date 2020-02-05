
Tiny.Polygon = function () {
    this.area = 0;
    this._points = [];

    if (arguments.length > 0)
    {
        this.setTo.apply(this, arguments);
    }
    this.closed = true;
    this.type = Tiny.Primitives.POLY;

};

Tiny.Polygon.prototype = {

    toNumberArray: function (output) {

        if (typeof output === 'undefined') { output = []; }

        for (var i = 0; i < this._points.length; i++)
        {
            if (typeof this._points[i] === 'number')
            {
                output.push(this._points[i]);
                output.push(this._points[i + 1]);
                i++;
            }
            else
            {
                output.push(this._points[i].x);
                output.push(this._points[i].y);
            }
        }

        return output;

    },

    flatten: function () {

        this._points = this.toNumberArray();

        return this;

    },

    clone: function (output) {

        var points = this._points.slice();

        if (typeof output === "undefined" || output === null)
        {
            output = new Tiny.Polygon(points);
        }
        else
        {
            output.setTo(points);
        }

        return output;

    },

    contains: function (x, y) {

        var length = this._points.length;
        var inside = false;

        for (var i = -1, j = length - 1; ++i < length; j = i)
        {
            var ix = this._points[i].x;
            var iy = this._points[i].y;

            var jx = this._points[j].x;
            var jy = this._points[j].y;

            if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
            {
                inside = !inside;
            }
        }

        return inside;

    },

    setTo: function (points) {

        this.area = 0;
        this._points = [];

        if (arguments.length > 0)
        {
            //  If points isn't an array, use arguments as the array
            if (!Array.isArray(points))
            {
                points = Array.prototype.slice.call(arguments);
            }

            var y0 = Number.MAX_VALUE;

            //  Allows for mixed-type arguments
            for (var i = 0, len = points.length; i < len; i++)
            {
                if (typeof points[i] === 'number')
                {
                    var p = new Tiny.Point(points[i], points[i + 1]);
                    i++;
                }
                else
                {
                    var p = new Tiny.Point(points[i].x, points[i].y);
                }

                this._points.push(p);

                //  Lowest boundary
                if (p.y < y0)
                {
                    y0 = p.y;
                }
            }

            this.calculateArea(y0);
        }

        return this;

    },

    calculateArea: function (y0) {

        var p1;
        var p2;
        var avgHeight;
        var width;

        for (var i = 0, len = this._points.length; i < len; i++)
        {
            p1 = this._points[i];

            if (i === len - 1)
            {
                p2 = this._points[0];
            }
            else
            {
                p2 = this._points[i + 1];
            }

            avgHeight = ((p1.y - y0) + (p2.y - y0)) / 2;
            width = p1.x - p2.x;
            this.area += avgHeight * width;
        }

        return this.area;

    }

};

Tiny.Polygon.prototype.constructor = Tiny.Polygon;

Object.defineProperty(Tiny.Polygon.prototype, 'points', {

    get: function() {
        return this._points;
    },

    set: function(points) {

        if (points != null)
        {
            this.setTo(points);
        }
        else
        {
            //  Clear the points
            this.setTo();
        }

    }

});
