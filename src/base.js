require('./tiny/utils/polyfill.js');

window.Tiny = require('./tiny/Tiny.js');

require('./tiny/TinyCommon.js');

require('./tiny/global.js');
require('./tiny/math/Math.js'); // 1 Kb
require('./tiny/math/Point.js');      //
require('./tiny/math/Matrix.js');     //
require('./tiny/math/Rectangle.js');  //  8 Kb

require('./tiny/display/DisplayObject.js');             //
require('./tiny/display/DisplayObjectContainer.js');    //
require('./tiny/display/Stage.js');                     // 10 Kb

require('./tiny/CanvasRenderer.js'); // 3 Kb