import { App } from './app/App.js';
import { RAF } from './app/RAF.js';
import { registerSystem, systems } from './app/registrar.js';
import { LoadingManager } from './loaders/LoadingManager.js';
import './loaders/ImageLoader.js';
import './loaders/AtlasLoader.js';
import './loaders/SpritesheetLoader.js';
import { Cache } from './loaders/Cache.js';
import { Input } from './app/Input.js';
import { Timer } from './app/Timer.js';
import { TweenManager, Easing, Interpolation } from './app/Tween.js';


Tiny.App = App;
Tiny.RAF = RAF;
Tiny.registerSystem = registerSystem;
Tiny.systems = systems;
Tiny.TweenManager = TweenManager;
Tiny.Cache = Cache;
Tiny.Loader = LoadingManager;
Tiny.Easing = Easing;
Tiny.Interpolation = Interpolation;
Tiny.Input = Input;
Tiny.Timer = Timer;
