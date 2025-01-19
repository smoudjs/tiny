import { App } from './app/App.js';
import { RAF } from './app/RAF.js';
import { LoadingSystem } from './loaders/LoadingSystem.js';
import './loaders/ImageLoader.js';
import './loaders/AtlasLoader.js';
import './loaders/SpritesheetLoader.js';
import { Cache } from './loaders/Cache.js';
import { InputSystem } from './app/Input.js';
import { Timer, TimerSystem } from './app/Timer.js';
import { TweenSystem, Easing, Interpolation } from './app/Tween.js';

Tiny.App = App;
Tiny.RAF = RAF;
Tiny.Cache = Cache;
Tiny.Easing = Easing;
Tiny.Interpolation = Interpolation;
Tiny.Timer = Timer;

Tiny.Loader = LoadingSystem;
Tiny.TweenSystem = TweenSystem;
Tiny.InputSystem = InputSystem;
Tiny.TimerSystem = TimerSystem;
