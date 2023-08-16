import './utils/polyfills';
import { CanvasBuffer } from './utils/CanvasBuffer';
import { EventEmitter } from './utils/EventEmitter';
import { _Math } from './math/Math';
import { Color } from './math/Color';
import { Mat3 } from './math/Mat3';
import { Vec2 } from './math/Vec2';
import { BLEND_MODES, SCALE_MODES, SHAPES, VERSION } from './constants';

var Tiny = {
    VERSION: VERSION,
    CanvasBuffer: CanvasBuffer,
    EventEmitter: EventEmitter,
    Math: _Math,
    Mat3: Mat3,
    Vec2: Vec2,
    Color: Color
};

Object.assign(Tiny, BLEND_MODES, SCALE_MODES, SHAPES);

window.Tiny = Tiny;
