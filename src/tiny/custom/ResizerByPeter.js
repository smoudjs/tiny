// *
// * @author       Peter Hutsul <peter@greenpandagames.com>
// * @copyright    none

// *
// * This resize manager is for Tiny HTML5 canvas framework.
// * It is written special for http://playable.mangoo-games.com/.
// * Support Mraid dimension, and Banner plugin. Has auto resize function.
// * Scale on full screen by default.
// * 
// * @class ResizeManager
// * @constructor


var ResizeManager = function (game)
{
    this.game = game;
    ResizeManager.currentGame = this.game
    this.game.isLandscape = false
    this.onResizeHandler = this.onResize.bind(this)

    if (typeof mraid !== 'undefined' || window.mraid) {
        mraid.addEventListener("sizeChange", this.onResizeHandler)
    } else if (typeof dapi !== 'undefined' || window.dapi) {
        dapi.addEventListener("adResized", this.onResizeHandler);
    } else 
        window.addEventListener("resize", this.onResizeHandler);

    window.addEventListener("scroll", function() {
        document.activeElement === document.body && 0 < window.scrollY && (document.body.scrollTop = 0)
    }, true)

    this.forceResize()
};

ResizeManager.currentGame = null

ResizeManager.prototype = {
    forceResize: function() {
        this.onResize()
    },

    onResize: function() {
        Banner.resize()
        var _width = window.innerWidth;
        var _height = window.innerHeight;

        if (GPP_NETWORK == 'ironsource') {
            var sizeFromLib = {width: _width, height: _height}
            if (typeof mraid !== 'undefined' || window.mraid) {
                sizeFromLib = mraid.getMaxSize()
            } else if (typeof dapi !== 'undefined' || window.dapi) {
                sizeFromLib = dapi.getScreenSize()
            }

            _width = Math.floor(sizeFromLib.width),
            _height = Math.floor(sizeFromLib.height);
            window.innerWidth = sizeFromLib.width;
            window.innerHeight = sizeFromLib.height;
        }
        var w = _width - Banner.width
        var h = _height - Banner.height
        this.updateOrientation(w, h)
        this.game.setSize(w, h)
        setTimeout(function() {
            window.scrollTo(0, 1)
        }, 100), window.scrollTo(0, 1)
    },
    updateOrientation: function(e, t) {
        this.game.isLandscape = (e > t)
    },
    destroy: function() {
        window.removeEventListener('resize', this.onResizeHandler);
        window.removeEventListener('sizeChange', this.onResizeHandler);
        window.removeEventListener('adResized', this.onResizeHandler);
    }

};

window.PL = function(e, t) {
    return ResizeManager.currentGame.isLandscape ? t : e
}

window.ResizeManager = ResizeManager