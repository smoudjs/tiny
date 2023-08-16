import { App } from './app/App';
import { RAF } from './app/RAF';
import { registerSystem, systems } from './app/registrar';
import { Loader } from './app/Loader';
import { Cache } from './app/Cache';
import { Input } from './app/Input';
import { Timer } from './app/Timer';
import { TweenManager, Easing, Interpolation } from './app/Tween';


Tiny.App = App;
Tiny.RAF = RAF;
Tiny.registerSystem = registerSystem;
Tiny.systems = systems;
Tiny.TweenManager = TweenManager;
Tiny.Cache = Cache;
Tiny.Loader = Loader;
Tiny.Easing = Easing;
Tiny.Interpolation = Interpolation;
Tiny.Input = Input;
Tiny.Timer = Timer;
