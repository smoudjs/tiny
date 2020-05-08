require('../src/utils/polyfill.js');

window.Tiny = require('../src/Tiny.js');

require('../src/TinyCommon.js');

require('../src/global.js');
require('../src/math/Math.js'); // 1 Kb
require('../src/math/Point.js');      //
require('../src/math/Matrix.js');     //
require('../src/math/Rectangle.js');  //  8 Kb

require('../src/display/DisplayObject.js');             //
require('../src/display/DisplayObjectContainer.js');    //
require('../src/display/Stage.js');                     // 10 Kb

require('../src/renderer/CanvasRenderer.js'); // 3 Kb