import './utils/polyfills.js';
import { CanvasBuffer } from './utils/CanvasBuffer.js';
import { EventTarget } from './utils/EventTarget.js';
import { SystemTarget } from './utils/SystemTarget.js';
import { _Math } from './math/Math.js';
import { Color } from './math/Color.js';
import { Mat3 } from './math/Mat3.js';
import { Vec2 } from './math/Vec2.js';
import { SHAPES, VERSION } from './constants.js';
import {
    PCFShadowMap,
    PCFSoftShadowMap,
    VSMShadowMap,
    FrontSide,
    BackSide,
    DoubleSide,
    FlatShading,
    SmoothShading,
    NoBlending,
    NormalBlending,
    AdditiveBlending,
    SubtractiveBlending,
    MultiplyBlending,
    ScreenBlending,
    CustomBlending,
    AddEquation,
    SubtractEquation,
    ReverseSubtractEquation,
    MinEquation,
    MaxEquation,
    ZeroFactor,
    OneFactor,
    SrcColorFactor
} from './constants.js';

var Tiny = {
    VERSION: VERSION,
    CanvasBuffer: CanvasBuffer,
    EventTarget: EventTarget,
    SystemTarget: SystemTarget,
    Math: _Math,
    Mat3: Mat3,
    Vec2: Vec2,
    Color: Color,

    PCFShadowMap: PCFShadowMap,
    PCFSoftShadowMap: PCFSoftShadowMap,
    VSMShadowMap: VSMShadowMap,
    FrontSide: FrontSide,
    BackSide: BackSide,
    DoubleSide: DoubleSide,
    FlatShading: FlatShading,
    SmoothShading: SmoothShading,
    NoBlending: NoBlending,
    NormalBlending: NormalBlending,
    AdditiveBlending: AdditiveBlending,
    SubtractiveBlending: SubtractiveBlending,
    MultiplyBlending: MultiplyBlending,
    ScreenBlending: ScreenBlending,
    CustomBlending: CustomBlending,
    AddEquation: AddEquation,
    SubtractEquation: SubtractEquation,
    ReverseSubtractEquation: ReverseSubtractEquation,
    MinEquation: MinEquation,
    MaxEquation: MaxEquation,
    ZeroFactor: ZeroFactor,
    OneFactor: OneFactor,
    SrcColorFactor: SrcColorFactor
};

Object.assign(Tiny, SHAPES);

window.Tiny = Tiny;
