var path, len;

class KeyframesAnim extends Tiny.Anim {
    constructor(parent, options) {
        super(parent, options);

        this.setFrames(options.data);

        if (!options.duration) this.duration = this._duration;
    }

    setFrames(frames) {
        var parent = this.parent;

        this.setPose();

        var skeleton = parent.anim.data;
        parent.anim.pose = parent.anim.pose || {};
        var pose = parent.anim.pose;

        if (!skeleton || !frames) return;

        var values = frames.values;
        var times = frames.times;

        var lastTime = times[times.length - 1];

        if (!lastTime) return;

        this._duration = lastTime * 1000;

        if (parent.anim.cache[this.key]) {
            this.frames = parent.anim.cache[this.key];
            this.valid = true;
            return;
        }

        this.frames = [];

        var prevs = {};

        for (var index = 0; index < times.length; index++) {
            var time = times[index];
            var _values = values[index];
            var trigger = time / lastTime;

            var paths = [];

            var prevDelta;

            if (index === 0) {
                prevDelta = trigger;
            } else {
                prevDelta = trigger - this.frames[index - 1].trigger;
            }

            this.frames.push({
                trigger: trigger,
                paths: paths,
                prevDelta: prevDelta
            });

            if (!_values || _values.length === 0) continue;

            for (let v = 0; v < _values.length; v++) {
                var params = _values[v];
                var name = params.name;

                var obj = parent;
                var key, prev;
                if (name) obj = skeleton[name];
                else name = '__default__';

                if (!obj) continue;

                for (var prop in params) {
                    if (prop == 'name') continue;

                    if (typeof params[prop] == 'object') {
                        for (var p in params[prop]) {
                            prev = prevs[name + prop + p];
                            if (prev == null) {
                                key = name + '.' + prop;
                                pose[key] = pose[key] || {};
                                prev = pose[key][p];
                                if (prev == null) {
                                    prev = obj[prop][p];
                                    pose[key][p] = prev;
                                }
                            }
                            paths.push({ obj: obj[prop], name: p, val: params[prop][p], prev: prev });
                            prevs[name + prop + p] = params[prop][p];
                        }
                    } else {
                        prev = prevs[name + prop];
                        if (prev == null) {
                            key = name + '.' + prop;
                            prev = pose[key];
                            if (prev == null) {
                                prev = obj[prop];
                                pose[key] = prev;
                            }
                        }
                        paths.push({ obj: obj, name: prop, val: params[prop], prev: prev });
                        prevs[name + prop] = params[prop];
                    }
                }
            }
        }

        if (Object.keys(prevs).length === 0) return;

        // for (var index = 0; index < this.frames.length; index++) {
        //     var frame = this.frames[index];
        //     var trigger = frame.trigger;

        //     var prevDelta = 1;

        //     if (index === 0) {
        //         prevDelta = trigger;
        //     } else {
        //         prevDelta = trigger - this.frames[index - 1].trigger;
        //     }

        //     frame.prevDelta = prevDelta;
        // }

        // console.log(this.frames);
        // console.log(pose);

        this.lastIndex = this._reverse ? this.frames.length - 1 : 0;

        this.valid = true;

        parent.anim.cache[this.key] = this.frames;
    }

    setPose(pose) {
        var parent = this.parent;

        if (pose) parent.anim.pose = pose;
        pose = parent.anim.pose;
        var skeleton = parent.anim.data;

        for (var key in pose) {
            var splited = key.split('.');
            var obj = skeleton[splited[0]];
            if (!obj) obj = parent;
            var prop = splited[1];

            if (typeof pose[key] == 'object') {
                for (var p in pose[key]) {
                    obj[prop][p] = pose[key][p];
                }
            } else {
                obj[prop] = pose[key];
            }
        }
    }

    _setValue(frame, progress) {
        len = frame.paths.length;

        if (len == 0) return;

        while (len--) {
            path = frame.paths[len];
            path.obj[path.name] = path.prev + (path.val - path.prev) * progress;
        }
    }

    setValue(progress) {
        var index = 0;
        var frame = this.frames[index];

        // console.log(progress);
        while (frame.trigger < progress) {
            frame = this.frames[++index];
        }

        if (index != this.lastIndex) {
            this.lastIndex = index;
            if (this._reverse) this._setValue(this.frames[this.lastIndex], 0);
            else this._setValue(this.frames[this.lastIndex], 1);
        }

        this._setValue(frame, 1 - (frame.trigger - progress) / frame.prevDelta);
    }
}

Tiny.Anim.keyframes = KeyframesAnim;
