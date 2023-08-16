import { App } from './app/App';
import { RAF } from './app/RAF';
import { registerSystem, systems } from './app/registrar';
import { LoadingManager } from './loaders/LoadingManager';
import './loaders/ImageLoader';
import './loaders/AtlasLoader';
import './loaders/SpritesheetLoader';
import { Cache } from './loaders/Cache';
import { Input } from './app/Input';
import { Timer } from './app/Timer';
import { TweenManager, Easing, Interpolation } from './app/Tween';


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
