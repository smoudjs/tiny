Tiny.Device = function ()
{
    this.deviceReadyAt = 0;
    this.initialized = false;
    this.desktop = false;
    this.iOS = false;
    this.iOSVersion = 0;
    this.cocoonJS = false;
    this.cocoonJSApp = false;
    this.cordova = false;
    this.node = false;
    this.nodeWebkit = false;
    this.electron = false;
    this.ejecta = false;
    this.crosswalk = false;
    this.android = false;
    this.chromeOS = false;
    this.linux = false;
    this.macOS = false;
    this.windows = false;
    this.windowsPhone = false;
    this.canvas = false;
    this.canvasBitBltShift = null;
    this.canHandleAlpha = false;
    this.canUseMultiply = false;
    this.webGL = false;
    this.file = false;
    this.fileSystem = false;
    this.localStorage = false;
    this.worker = false;
    this.css3D = false;
    this.pointerLock = false;
    this.typedArray = false;
    this.vibration = false;
    this.getUserMedia = true;
    this.quirksMode = false;
    this.touch = false;
    this.mspointer = false;
    this.wheelEvent = null;
    this.arora = false;
    this.chrome = false;
    this.chromeVersion = 0;
    this.epiphany = false;
    this.firefox = false;
    this.firefoxVersion = 0;
    this.ie = false;
    this.ieVersion = 0;
    this.trident = false;
    this.tridentVersion = 0;
    this.edge = false;
    this.mobileSafari = false;
    this.midori = false;
    this.opera = false;
    this.safari = false;
    this.safariVersion = 0;
    this.webApp = false;
    this.silk = false;
    this.audioData = false;
    this.webAudio = false;
    this.ogg = false;
    this.opus = false;
    this.mp3 = false;
    this.wav = false;
    this.m4a = false;
    this.webm = false;
    this.dolby = false;
    this.oggVideo = false;
    this.h264Video = false;
    this.mp4Video = false;
    this.webmVideo = false;
    this.vp9Video = false;
    this.hlsVideo = false;
    this.iPhone = false;
    this.iPhone4 = false;
    this.iPad = false;
    this.pixelRatio = 0;
    this.littleEndian = false;
    this.LITTLE_ENDIAN = false;
    this.support32bit = false;
    this.fullscreen = false;
    this.requestFullscreen = '';
    this.cancelFullscreen = '';
    this.fullscreenKeyboard = false;

};

Tiny.Device = new Tiny.Device();

Tiny.Device.whenReady = function (callback, context, nonPrimer)
{

    var readyCheck = this._readyCheck;

    if (this.deviceReadyAt || !readyCheck)
    {
        callback.call(context, this);
    }
    else if (readyCheck._monitor || nonPrimer)
    {
        readyCheck._queue = readyCheck._queue || [];
        readyCheck._queue.push([ callback, context ]);
    }
    else
    {
        readyCheck._monitor = readyCheck.bind(this);
        readyCheck._queue = readyCheck._queue || [];
        readyCheck._queue.push([ callback, context ]);

        var cordova = typeof window.cordova !== 'undefined';
        var cocoonJS = navigator.isCocoonJS;

        if (document.readyState === 'complete' || document.readyState === 'interactive')
        {
            // Why is there an additional timeout here?
            window.setTimeout(readyCheck._monitor, 0);
        }
        else if (cordova && !cocoonJS)
        {
            // Ref. http://docs.phonegap.com/en/3.5.0/cordova_events_events.md.html#deviceready
            //  Cordova, but NOT Cocoon?
            document.addEventListener('deviceready', readyCheck._monitor, false);
        }
        else
        {
            document.addEventListener('DOMContentLoaded', readyCheck._monitor, false);
            window.addEventListener('load', readyCheck._monitor, false);
        }
    }

};

/**
* Internal method used for checking when the device is ready.
* This function is removed from Tiny.Device when the device becomes ready.
*
* @method
* @private
*/
Tiny.Device._readyCheck = function ()
{

    var readyCheck = this._readyCheck;

    if (!document.body)
    {
        window.setTimeout(readyCheck._monitor, 20);
    }
    else if (!this.deviceReadyAt)
    {
        this.deviceReadyAt = Date.now();

        document.removeEventListener('deviceready', readyCheck._monitor);
        document.removeEventListener('DOMContentLoaded', readyCheck._monitor);
        window.removeEventListener('load', readyCheck._monitor);

        this._initialize();
        this.initialized = true;

        var item;
        while ((item = readyCheck._queue.shift()))
        {
            var callback = item[0];
            var context = item[1];
            callback.call(context, this);
        }

        // Remove no longer useful methods and properties.
        this._readyCheck = null;
        this._initialize = null;
    }

};

/**
* Internal method to initialize the capability checks.
* This function is removed from Tiny.Device once the device is initialized.
*
* @method
* @private
*/
Tiny.Device._initialize = function ()
{

    var device = this;

    /**
    * Check which OS is game running on.
    */
    function _checkOS ()
    {

        var ua = navigator.userAgent;

        if ((/Playstation Vita/).test(ua))
        {
            device.vita = true;
        }
        else if ((/Kindle/).test(ua) || (/\bKF[A-Z][A-Z]+/).test(ua) || (/Silk.*Mobile Safari/).test(ua))
        {
            device.kindle = true;

            // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
            // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
        }
        else if ((/Android/).test(ua))
        {
            device.android = true;
        }
        else if ((/CrOS/).test(ua))
        {
            device.chromeOS = true;
        }
        else if ((/iP[ao]d|iPhone/i).test(ua))
        {
            device.iOS = true;
            (navigator.appVersion).match(/OS (\d+)/);
            device.iOSVersion = parseInt(RegExp.$1, 10);
        }
        else if ((/Linux/).test(ua))
        {
            device.linux = true;
        }
        else if ((/Mac OS/).test(ua))
        {
            device.macOS = true;
        }
        else if ((/Windows/).test(ua))
        {
            device.windows = true;
        }

        if ((/Windows Phone/i).test(ua) || (/IEMobile/i).test(ua))
        {
            device.android = false;
            device.iOS = false;
            device.macOS = false;
            device.windows = true;
            device.windowsPhone = true;
        }

        var silk = (/Silk/).test(ua); // detected in browsers

        if (device.windows || device.macOS || (device.linux && !silk) || device.chromeOS)
        {
            device.desktop = true;
        }

        //  Windows Phone / Table reset
        if (device.windowsPhone || (((/Windows NT/i).test(ua)) && ((/Touch/i).test(ua))))
        {
            device.desktop = false;
        }

    }

    /**
    * Checks if the browser correctly supports putImageData alpha channels.
    * If the browser isn't capable of handling tinting with alpha, `Device.canHandleAlpha` will be false.
    * Also checks whether the Canvas BlendModes are supported by the current browser for drawImage.
    */
    function _checkCanvasFeatures ()
    {

        var canvas = Tiny.CanvasPool.create(this, 6, 1);
        var context = canvas.getContext('2d');

        context.fillStyle = 'rgba(10, 20, 30, 0.5)';

        //  Draw a single pixel
        context.fillRect(0, 0, 1, 1);

        //  Get the color values
        var s1 = context.getImageData(0, 0, 1, 1);

        if (s1)
        {
            //  Plot them to x2
            context.putImageData(s1, 1, 0);

            //  Get those values
            var s2 = context.getImageData(1, 0, 1, 1);

            //  Compare and set
            device.canHandleAlpha = (
                s2.data[0] === s1.data[0] &&
                s2.data[1] === s1.data[1] &&
                s2.data[2] === s1.data[2] &&
                s2.data[3] === s1.data[3]
            );
        }

        //  Checks whether the Canvas BlendModes are supported by the current browser for drawImage.
        context.globalCompositeOperation = 'multiply';
        device.canUseMultiply = (context.globalCompositeOperation === 'multiply');

        Tiny.CanvasPool.removeByCanvas(canvas);

        Tiny.CanvasTinter.tintMethod = (device.canUseMultiply) ? Tiny.CanvasTinter.tintWithMultiply : Tiny.CanvasTinter.tintWithPerPixel;

    }

    /**
    * Check HTML5 features of the host environment.
    */
    function _checkFeatures ()
    {

        device.canvas = !!window.CanvasRenderingContext2D || device.cocoonJS;

        try
        {
            device.localStorage = !!localStorage.getItem;
        }
        catch (error)
        {
            device.localStorage = false;
        }

        device.file = !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;
        device.fileSystem = !!window.requestFileSystem;

        device.webGL = !!window.WebGLRenderingContext;

        device.worker = !!window.Worker;

        device.pointerLockElement = (('pointerLockElement' in document) && 'pointerLockElement') ||
            (('mozPointerLockElement' in document) && 'mozPointerLockElement') ||
            (('webkitPointerLockElement' in document) && 'webkitPointerLockElement');

        device.pointerlockchange = (('onpointerlockchange' in document) && 'pointerlockchange') ||
            (('onmozpointerlockchange' in document) && 'mozpointerlockchange') ||
            (('onwebkitpointerlockchange' in document) && 'webkitpointerlockchange');

        device.pointerlockerror = (('onpointerlockerror' in document) && 'pointerlockerror') ||
            (('onmozpointerlockerror' in document) && 'mozpointerlockerror') ||
            (('onwebkitpointerlockerror' in document) && 'webkitpointerlockerror');

        device.pointerLock = !!device.pointerLockElement;

        device.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        device.getUserMedia = device.getUserMedia && !!navigator.getUserMedia && !!window.URL;

        // Older versions of firefox (< 21) apparently claim support but user media does not actually work
        if (device.firefox && device.firefoxVersion < 21)
        {
            device.getUserMedia = false;
        }

        // TODO: replace canvasBitBltShift detection with actual feature check

        // Excludes iOS versions as they generally wrap UIWebView (eg. Safari WebKit) and it
        // is safer to not try and use the fast copy-over method.
        if (!device.iOS && (device.ie || device.firefox || device.chrome))
        {
            device.canvasBitBltShift = true;
        }

        // Known not to work
        if (device.safari || device.mobileSafari)
        {
            device.canvasBitBltShift = false;
        }

    }

    /**
    * Checks/configures various input.
    */
    function _checkInput ()
    {

        if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1))
        {
            device.touch = true;
        }

        if (window.PointerEvent || window.MSPointerEvent || window.navigator.msPointerEnabled || window.navigator.pointerEnabled)
        {
            device.mspointer = true;
        }

        if (!device.cocoonJS)
        {
            // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
            if ('onwheel' in window || (device.ie && 'WheelEvent' in window))
            {
                // DOM3 Wheel Event: FF 17+, IE 9+, Chrome 31+, Safari 7+
                device.wheelEvent = 'wheel';
            }
            else if ('onmousewheel' in window)
            {
                // Non-FF legacy: IE 6-9, Chrome 1-31, Safari 5-7.
                device.wheelEvent = 'mousewheel';
            }
            else if (device.firefox && 'MouseScrollEvent' in window)
            {
                // FF prior to 17. This should probably be scrubbed.
                device.wheelEvent = 'DOMMouseScroll';
            }
        }

    }

    /**
    * Checks for support of the Full Screen API.
    */
    function _checkFullScreenSupport ()
    {

        var fs = [
            'requestFullscreen',
            'requestFullScreen',
            'webkitRequestFullscreen',
            'webkitRequestFullScreen',
            'msRequestFullscreen',
            'msRequestFullScreen',
            'mozRequestFullScreen',
            'mozRequestFullscreen'
        ];

        var element = document.createElement('div');

        for (var i = 0; i < fs.length; i++)
        {
            if (element[fs[i]])
            {
                device.fullscreen = true;
                device.requestFullscreen = fs[i];
                break;
            }
        }

        var cfs = [
            'cancelFullScreen',
            'exitFullscreen',
            'webkitCancelFullScreen',
            'webkitExitFullscreen',
            'msCancelFullScreen',
            'msExitFullscreen',
            'mozCancelFullScreen',
            'mozExitFullscreen'
        ];

        if (device.fullscreen)
        {
            for (var i = 0; i < cfs.length; i++)
            {
                if (document[cfs[i]])
                {
                    device.cancelFullscreen = cfs[i];
                    break;
                }
            }
        }

        //  Keyboard Input?
        if (window.Element && Element.ALLOW_KEYBOARD_INPUT)
        {
            device.fullscreenKeyboard = true;
        }

    }

    /**
    * Check what browser is game running in.
    */
    function _checkBrowser ()
    {

        var ua = navigator.userAgent;

        if ((/Arora/).test(ua))
        {
            device.arora = true;
        }
        else if ((/Edge\/\d+/).test(ua))
        {
            device.edge = true;
        }
        else if ((/Chrome\/(\d+)/).test(ua) && !device.windowsPhone)
        {
            device.chrome = true;
            device.chromeVersion = parseInt(RegExp.$1, 10);
        }
        else if ((/Epiphany/).test(ua))
        {
            device.epiphany = true;
        }
        else if ((/Firefox\D+(\d+)/).test(ua))
        {
            device.firefox = true;
            device.firefoxVersion = parseInt(RegExp.$1, 10);
        }
        else if ((/AppleWebKit/).test(ua) && device.iOS)
        {
            device.mobileSafari = true;
        }
        else if ((/MSIE (\d+\.\d+);/).test(ua))
        {
            device.ie = true;
            device.ieVersion = parseInt(RegExp.$1, 10);
        }
        else if ((/Midori/).test(ua))
        {
            device.midori = true;
        }
        else if ((/Opera/).test(ua))
        {
            device.opera = true;
        }
        else if ((/Safari\/(\d+)/).test(ua) && !device.windowsPhone)
        {
            device.safari = true;

            if ((/Version\/(\d+)\./).test(ua))
            {
                device.safariVersion = parseInt(RegExp.$1, 10);
            }
        }
        else if ((/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/).test(ua))
        {
            device.ie = true;
            device.trident = true;
            device.tridentVersion = parseInt(RegExp.$1, 10);
            device.ieVersion = parseInt(RegExp.$3, 10);
        }

        //  Silk gets its own if clause because its ua also contains 'Safari'
        if ((/Silk/).test(ua))
        {
            device.silk = true;
        }

        //  WebApp mode in iOS
        if (navigator.standalone)
        {
            device.webApp = true;
        }

        if (typeof window.cordova !== 'undefined')
        {
            device.cordova = true;
        }

        if (typeof process !== 'undefined' && typeof require !== 'undefined')
        {
            device.node = true;
        }

        if (device.node && typeof process.versions === 'object')
        {
            device.nodeWebkit = !!process.versions['node-webkit'];

            device.electron = !!process.versions.electron;
        }

        if (navigator.isCocoonJS)
        {
            device.cocoonJS = true;
        }

        if (device.cocoonJS)
        {
            try
            {
                device.cocoonJSApp = (typeof CocoonJS !== 'undefined');
            }
            catch(error)
            {
                device.cocoonJSApp = false;
            }
        }

        if (typeof window.ejecta !== 'undefined')
        {
            device.ejecta = true;
        }

        if ((/Crosswalk/).test(ua))
        {
            device.crosswalk = true;
        }

    }

    /**
    * Check video support.
    */
    function _checkVideo ()
    {

        var videoElement = document.createElement('video');

        try
        {
            if (videoElement.canPlayType)
            {
                if (videoElement.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ''))
                {
                    device.oggVideo = true;
                }

                if (videoElement.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ''))
                {
                    // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                    device.h264Video = true;
                    device.mp4Video = true;
                }

                if (videoElement.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ''))
                {
                    device.webmVideo = true;
                }

                if (videoElement.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ''))
                {
                    device.vp9Video = true;
                }

                if (videoElement.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ''))
                {
                    device.hlsVideo = true;
                }
            }
        }
        catch (e) {} // eslint-disable-line no-empty
    }

    /**
    * Check audio support.
    */
    function _checkAudio ()
    {

        device.audioData = !!(window.Audio);
        device.webAudio = !!(window.AudioContext || window.webkitAudioContext);
        var audioElement = document.createElement('audio');

        try
        {
            if (audioElement.canPlayType)
            {
                if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
                {
                    device.ogg = true;
                }

                if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, ''))
                {
                    device.opus = true;
                }

                if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, ''))
                {
                    device.mp3 = true;
                }

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
                {
                    device.wav = true;
                }

                if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, ''))
                {
                    device.m4a = true;
                }

                if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''))
                {
                    device.webm = true;
                }

                if (audioElement.canPlayType('audio/mp4;codecs="ec-3"') !== '')
                {
                    if (device.edge)
                    {
                        device.dolby = true;
                    }
                    else if (device.safari && device.safariVersion >= 9)
                    {
                        if ((/Mac OS X (\d+)_(\d+)/).test(navigator.userAgent))
                        {
                            var major = parseInt(RegExp.$1, 10);
                            var minor = parseInt(RegExp.$2, 10);

                            if ((major === 10 && minor >= 11) || major > 10)
                            {
                                device.dolby = true;
                            }
                        }
                    }
                }
            }
        }
        catch (e)
        {} // eslint-disable-line no-empty

    }

    function _checkIsLittleEndian ()
    {

        var a = new ArrayBuffer(4);
        var b = new Uint8Array(a);
        var c = new Uint32Array(a);

        b[0] = 0xa1;
        b[1] = 0xb2;
        b[2] = 0xc3;
        b[3] = 0xd4;

        if (c[0] === 0xd4c3b2a1)
        {
            return true;
        }

        if (c[0] === 0xa1b2c3d4)
        {
            return false;
        }
        else
        {
            //  Could not determine endianness
            return null;
        }

    }

    /**
    * Test to see if ImageData uses CanvasPixelArray or Uint8ClampedArray.
    *
    * @author Matt DesLauriers (@mattdesl)
    */
    function _checkIsUint8ClampedImageData ()
    {

        if (Uint8ClampedArray === undefined)
        {
            return false;
        }

        var elem = Tiny.CanvasPool.create(this, 1, 1);
        var ctx = elem.getContext('2d');

        if (!ctx)
        {
            return false;
        }

        var image = ctx.createImageData(1, 1);

        Tiny.CanvasPool.remove(this);

        return image.data instanceof Uint8ClampedArray;

    }

    /**
    * Check PixelRatio, iOS device, Vibration API, ArrayBuffers and endianess.
    */
    function _checkDevice ()
    {

        device.pixelRatio = window.devicePixelRatio || 1;
        device.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        device.iPhone4 = (device.pixelRatio === 2 && device.iPhone);
        device.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;

        if (typeof Int8Array !== 'undefined')
        {
            device.typedArray = true;
        }
        else
        {
            device.typedArray = false;
        }

        if (typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint32Array !== 'undefined')
        {
            device.littleEndian = _checkIsLittleEndian();
            device.LITTLE_ENDIAN = device.littleEndian;
        }

        device.support32bit = (typeof ArrayBuffer !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int32Array !== 'undefined' && device.littleEndian !== null && _checkIsUint8ClampedImageData());

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate)
        {
            device.vibration = true;
        }

    }

    /**
    * Check whether the host environment support 3D CSS.
    */
    function _checkCSS3D ()
    {

        var el = document.createElement('p');
        var has3d;
        var transforms = {
            webkitTransform: '-webkit-transform',
            OTransform: '-o-transform',
            msTransform: '-ms-transform',
            MozTransform: '-moz-transform',
            transform: 'transform'
        };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms)
        {
            if (el.style[t] !== undefined)
            {
                el.style[t] = 'translate3d(1px,1px,1px)';
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);
        device.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== 'none');

    }

    _checkOS();
    _checkBrowser();
    _checkAudio();
    _checkVideo();
    _checkCSS3D();
    _checkDevice();
    _checkFeatures();
    _checkCanvasFeatures();
    _checkFullScreenSupport();
    _checkInput();

};

Tiny.Device.canPlayAudio = function (type)
{

    if (type === 'mp3' && this.mp3)
    {
        return true;
    }
    else if (type === 'ogg' && (this.ogg || this.opus))
    {
        return true;
    }
    else if (type === 'm4a' && this.m4a)
    {
        return true;
    }
    else if (type === 'opus' && this.opus)
    {
        return true;
    }
    else if (type === 'wav' && this.wav)
    {
        return true;
    }
    else if (type === 'webm' && this.webm)
    {
        return true;
    }
    else if (type === 'mp4' && this.dolby)
    {
        return true;
    }

    return false;

};

Tiny.Device.canPlayVideo = function (type)
{

    if (type === 'webm' && (this.webmVideo || this.vp9Video))
    {
        return true;
    }
    else if (type === 'mp4' && (this.mp4Video || this.h264Video))
    {
        return true;
    }
    else if ((type === 'ogg' || type === 'ogv') && this.oggVideo)
    {
        return true;
    }
    else if (type === 'mpeg' && this.hlsVideo)
    {
        return true;
    }

    return false;

};

Tiny.Device.needsTouchUnlock = function ()
{
    return !!(!this.cocoonJS && (this.iOS || this.android));
};

Tiny.Device.isAndroidStockBrowser = function ()
{

    var matches = window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);
    return matches && matches[1] < 537;

};