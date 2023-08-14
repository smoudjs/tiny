import './utils/polyfills';
import { CanvasBuffer } from './utils/CanvasBuffer';
import { EventEmitter } from './utils/EventEmitter';
import { _Math } from './math/Math';
import { Color } from './math/Color';
import { Mat3 } from './math/Mat3';
import { Vec2 } from './math/Vec2';
import { BLEND_MODES, SCALE_MODES, SHAPES, VERSION } from './constants';

var Tiny = {};

Tiny.VERSION = VERSION;

Tiny.CanvasBuffer = CanvasBuffer;
Tiny.EventEmitter = EventEmitter;
Tiny.Math = _Math;
Tiny.Mat3 = Mat3;
Tiny.Vec2 = Vec2;
Tiny.Color = Color;
Object.assign(Tiny, BLEND_MODES);
Object.assign(Tiny, SCALE_MODES);
Object.assign(Tiny, SHAPES);

window.Tiny = Tiny;
