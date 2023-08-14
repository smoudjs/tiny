import { WebGLRenderer } from './renderers/webgl/WebGLRenderer';
import { WebGLGraphics } from './renderers/webgl/utils/WebGLGraphics';
import { SpriteBatch } from './renderers/webgl/utils/SpriteBatch';

Tiny.SpriteBatch = SpriteBatch;
Tiny.WebGLGraphics = WebGLGraphics;
Tiny.Renderer = WebGLRenderer;
