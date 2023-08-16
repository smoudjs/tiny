import { CanvasRenderer } from './CanvasRenderer';
import { CanvasTinter } from './CanvasTinter';
import { autoDetectRenderer } from './Detector';
import './extends';

Tiny.CanvasRenderer = CanvasRenderer;
Tiny.CanvasTinter = CanvasTinter;
Tiny.autoDetectRenderer = autoDetectRenderer;

// Tiny.autoDetectRenderer = function (width, height, options) {
//     if (Tiny.Renderer && core.utils.isWebGLSupported()) {
//         return new Tiny.Renderer(width, height, options);
//     }

//     return new CanvasRenderer(width, height, options);
// };
