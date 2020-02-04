require('../src/tiny/utils/polyfill.js');

window.Tiny = require('../src/tiny/ThreeUI.js');

require('../src/tiny/TinyCommon.js');

require('../src/tiny/global.js');
require('../src/tiny/math/Math.js'); // 1 Kb
require('../src/tiny/math/Point.js');      //
require('../src/tiny/math/Matrix.js');     //
require('../src/tiny/math/Rectangle.js');  //  8 Kb

require('../src/tiny/display/DisplayObject.js');             //
require('../src/tiny/display/DisplayObjectContainer.js');    //
require('../src/tiny/display/Stage.js');                     // 10 Kb

require('../src/tiny/CanvasRenderer.js'); // 3 Kb