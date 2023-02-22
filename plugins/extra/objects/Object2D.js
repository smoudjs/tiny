Tiny.Object2D.prototype.removeChildren = function (beginIndex, endIndex) {
    var begin = beginIndex || 0;
    var end = typeof endIndex === "number" ? endIndex : this.children.length;
    var range = end - begin;

    if (range > 0 && range <= end) {
        var removed = this.children.splice(begin, range);
        for (var i = 0; i < removed.length; i++) {
            var child = removed[i];
            child.parent = undefined;
        }
        return removed;
    } else if (range === 0 && this.children.length === 0) {
        return [];
    } else {
        throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range");
    }
};