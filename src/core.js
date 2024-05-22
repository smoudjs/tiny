import './utils/polyfills.js';
import { CanvasBuffer } from './utils/CanvasBuffer.js';
import { EventTarget } from './utils/EventTarget.js';
import { SystemTarget } from './utils/SystemTarget.js';
import { _Math } from './math/Math.js';
import { Color } from './math/Color.js';
import { Mat3 } from './math/Mat3.js';
import { Vec2 } from './math/Vec2.js';
import { SHAPES, VERSION } from './constants.js';

var Tiny = {
    VERSION: VERSION,
    CanvasBuffer: CanvasBuffer,
    EventTarget: EventTarget,
    SystemTarget: SystemTarget,
    Math: _Math,
    Mat3: Mat3,
    Vec2: Vec2,
    Color: Color
};

Object.assign(Tiny, SHAPES);

window.Tiny = Tiny;
