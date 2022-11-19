require('./utils/polyfill.js');

window.Tiny = {};

require('./App.js');
require('./global.js');
require('./math/Math.js'); // 1 Kb
require('./math/Point.js');      //
require('./math/Matrix.js');     //
require('./math/Rectangle.js');  //  8 Kb

require('./objects/BaseObject2D.js');             //
require('./objects/Object2D.js');    //
require('./objects/Scene.js');                     // 10 Kb

require('./renderers/CanvasRenderer.js'); // 3 Kb