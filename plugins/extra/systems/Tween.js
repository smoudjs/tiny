Tiny.TweenManager.prototype.removeByObject = function (obj) {
    var tweens = this.group._tweens;
    var tweenIds = Object.keys(tweens);

    for (var i = 0; i < tweenIds.length; i++) {
        var tween = tweens[tweenIds[i]];

        if (tween._object === obj) this.remove(tween);
    }
};
