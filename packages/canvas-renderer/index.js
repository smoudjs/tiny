import { CanvasRenderer } from './CanvasRenderer.js';
import { CanvasTinter } from './CanvasTinter.js';
import { autoDetectRenderer } from './Detector.js';
import './extends.js';

Tiny.CanvasRenderer = CanvasRenderer;
Tiny.CanvasTinter = CanvasTinter;
Tiny.autoDetectRenderer = autoDetectRenderer;

// Tiny.autoDetectRenderer = function (width, height, options) {
//     if (Tiny.Renderer && core.utils.isWebGLSupported()) {
//         return new Tiny.Renderer(width, height, options);
//     }

//     return new CanvasRenderer(width, height, options);
// };
