// import {
//  EventDispatcher,
//  MOUSE,
//  Quat,
//  Spherical,
//  TOUCH,
//  Vec2,
//  Vec3
// } from '../../../build/three.module.js';

var Quat = Tiny.Quat;
var Vec2 = Tiny.Vec2;
var Vec3 = Tiny.Vec3;
var MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 };
var TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 };
var MathUtils = Tiny.Math;

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

function setFromCartesianCoords( sph, x, y, z ) {

    sph.radius = Math.sqrt( x * x + y * y + z * z );

    if ( sph.radius === 0 ) {

        sph.theta = 0;
        sph.phi = 0;

    } else {

        sph.theta = Math.atan2( x, z );
        sph.phi = Math.acos( MathUtils.clamp( y / sph.radius, - 1, 1 ) );

    }

}

var EPS = 0.000001;

var OrbitControls = function ( object, input ) {

    var scope = this;

    this.object = object;
    this.domElement = input;

    // Set to false to disable this control
    this.enabled = true;

    // "target" sets the location of focus, where the object orbits around
    this.target = new Vec3();

    // How far you can dolly in and out ( PerspectiveCamera only )
    this.minDistance = 0;
    this.maxDistance = Infinity;

    // How far you can zoom in and out ( OrthographicCamera only )
    this.minZoom = 0;
    this.maxZoom = Infinity;

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
    this.minAzimuthAngle = - Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    this.enableDamping = false;
    this.dampingFactor = 0.05;

    // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming
    this.enableZoom = true;
    this.zoomSpeed = 1.0;

    // Set to false to disable rotating
    this.enableRotate = true;
    this.rotateSpeed = 1.0;

    // Set to false to disable panning
    this.enablePan = true;
    this.panSpeed = 1.0;
    this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
    this.keyPanSpeed = 7.0; // pixels moved per arrow key push

    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop
    this.autoRotate = false;
    this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

    // Mouse buttons
    this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

    // Touch fingers
    this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

    // for reset
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;


    // this.saveState = function () {

    //  scope.target0.copy( scope.target );
    //  scope.position0.copy( scope.object.position );
    //  scope.zoom0 = scope.object.zoom;

    // };

    this.reset = function () {

        scope.target.copy( scope.target0 );
        scope.object.position.copy( scope.position0 );
        scope.object.zoom = scope.zoom0;

        scope.object.updateProjectionMatrix();
        scope.emit( 'change' );

        scope.update();

        state = STATE.NONE;

    };

    // this method is exposed, but perhaps it would be better if we can make it private...
    this.update = function () {

        var offset = new Vec3();

        // so camera.up is the orbit axis
        var quat = new Quat().setFromUnitVectors( object.up, new Vec3( 0, 1, 0 ) );
        var quatInverse = quat.clone().invert();

        var lastPosition = new Vec3();
        var lastQuat = new Quat();

        var twoPI = 2 * Math.PI;

        return function update() {

            var position = scope.object.position;

            offset.copy( position ).sub( scope.target );

            // rotate offset to "y-axis-is-up" space
            offset.applyQuat( quat );

            // angle from z-axis around y-axis
            setFromCartesianCoords(spherical, offset.x, offset.y, offset.z)
            // spherical.setFromVec3( offset );

            if ( scope.autoRotate && state === STATE.NONE ) {

                rotateLeft( getAutoRotationAngle() );

            }

            if ( scope.enableDamping ) {

                spherical.theta += sphericalDelta.theta * scope.dampingFactor;
                spherical.phi += sphericalDelta.phi * scope.dampingFactor;

            } else {

                spherical.theta += sphericalDelta.theta;
                spherical.phi += sphericalDelta.phi;

            }

            // restrict theta to be between desired limits

            var min = scope.minAzimuthAngle;
            var max = scope.maxAzimuthAngle;

            if ( isFinite( min ) && isFinite( max ) ) {

                if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

                if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

                if ( min <= max ) {

                    spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

                } else {

                    spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
                        Math.max( min, spherical.theta ) :
                        Math.min( max, spherical.theta );

                }

            }

            // restrict phi to be between desired limits
            spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

            spherical.phi = Math.max( EPS, Math.min( Math.PI - EPS, spherical.phi ) );
            // spherical.makeSafe();


            spherical.radius *= scale;

            // restrict radius to be between desired limits
            spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

            // move target to panned location

            if ( scope.enableDamping === true ) {

                scope.target.addScaledVector( panOffset, scope.dampingFactor );

            } else {

                scope.target.add( panOffset );

            }

            offset.setFromSpherical( spherical );

            // rotate offset back to "camera-up-vector-is-up" space
            offset.applyQuat( quatInverse );

            position.copy( scope.target ).add( offset );

            scope.object.lookAt( scope.target );

            if ( scope.enableDamping === true ) {

                sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                sphericalDelta.phi *= ( 1 - scope.dampingFactor );

                panOffset.mulScalar( 1 - scope.dampingFactor );

            } else {

                sphericalDelta.radius = sphericalDelta.phi = sphericalDelta.theta = 0;
                // sphericalDelta..set( 0, 0, 0 );

                panOffset.set( 0, 0, 0 );

            }

            scale = 1;

            // update condition is:
            // min(camera displacement, camera rotation in radians)^2 > EPS
            // using small-angle approximation cos(x/2) = 1 - x^2 / 8

            if ( zoomChanged ||
                lastPosition.distanceToSquared( scope.object.position ) > EPS ||
                8 * ( 1 - lastQuat.dot( scope.object.quaternion ) ) > EPS ) {

                scope.emit( 'change' );

                lastPosition.copy( scope.object.position );
                lastQuat.copy( scope.object.quaternion );
                zoomChanged = false;

                return true;

            }

            return false;

        };

    }();

    this.dispose = function () {

        scope.domElement.removeEventListener( 'contextmenu', onContextMenu );

        scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
        scope.domElement.removeEventListener( 'wheel', onMouseWheel );

        scope.domElement.removeEventListener( 'touchstart', onTouchStart );
        scope.domElement.removeEventListener( 'touchend', onTouchEnd );
        scope.domElement.removeEventListener( 'touchmove', onTouchMove );

        scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
        scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

        //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

    };

    //
    // internals
    //

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    var STATE = {
        NONE: - 1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6
    };

    var state = STATE.NONE;

    // current position in spherical coordinates
    var spherical = { radius: 1, phi: 0, theta: 0 }; //new Spherical();
    var sphericalDelta = { radius: 1, phi: 0, theta: 0 }; //new Spherical();

    var scale = 1;
    var panOffset = new Vec3();
    var zoomChanged = false;

    var rotateStart = new Vec2();
    var rotateEnd = new Vec2();
    var rotateDelta = new Vec2();

    var panStart = new Vec2();
    var panEnd = new Vec2();
    var panDelta = new Vec2();

    var dollyStart = new Vec2();
    var dollyEnd = new Vec2();
    var dollyDelta = new Vec2();

    function getAutoRotationAngle() {

        return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

    }

    function getZoomScale() {

        return Math.pow( 0.95, scope.zoomSpeed );

    }

    function rotateLeft( angle ) {

        sphericalDelta.theta -= angle;

    }

    function rotateUp( angle ) {

        sphericalDelta.phi -= angle;

    }

    var panLeft = function () {

        var v = new Vec3();

        return function panLeft( distance, objectMatrix ) {

            v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
            v.mulScalar( - distance );

            panOffset.add( v );

        };

    }();

    var panUp = function () {

        var v = new Vec3();

        return function panUp( distance, objectMatrix ) {

            if ( scope.screenSpacePanning === true ) {

                v.setFromMatrixColumn( objectMatrix, 1 );

            } else {

                v.setFromMatrixColumn( objectMatrix, 0 );
                v.crossVectors( scope.object.up, v );

            }

            v.mulScalar( distance );

            panOffset.add( v );

        };

    }();

    // deltaX and deltaY are in pixels; right and down are positive
    var pan = function () {

        var offset = new Vec3();

        return function pan( deltaX, deltaY ) {

            var element = scope.domElement;

            if ( scope.object.isPerspectiveCamera ) {

                // perspective
                var position = scope.object.position;
                offset.copy( position ).sub( scope.target );
                var targetDistance = offset.length();

                // half of the fov is center to top of screen
                targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

                // we use only clientHeight here so aspect ratio does not distort speed
                panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
                panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

            } else if ( scope.object.isOrthographicCamera ) {

                // orthographic
                panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
                panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

            }

        };

    }();

    function dollyOut( dollyScale ) {

        if ( scope.object.isPerspectiveCamera ) {

            scale /= dollyScale;

        } else if ( scope.object.isOrthographicCamera ) {

            scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
            scope.object.updateProjectionMatrix();
            zoomChanged = true;

        }

    }

    function dollyIn( dollyScale ) {

        if ( scope.object.isPerspectiveCamera ) {

            scale *= dollyScale;

        } else if ( scope.object.isOrthographicCamera ) {

            scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
            scope.object.updateProjectionMatrix();
            zoomChanged = true;

        }

    }

    //
    // event callbacks - update the object state
    //

    function handleMouseDownRotate( event ) {

        rotateStart.set( event.clientX, event.clientY );

    }

    function handleMouseDownDolly( event ) {

        dollyStart.set( event.clientX, event.clientY );

    }

    function handleMouseDownPan( event ) {

        panStart.set( event.clientX, event.clientY );

    }

    function handleMouseMoveRotate( event ) {

        rotateEnd.set( event.clientX, event.clientY );

        rotateDelta.sub2( rotateEnd, rotateStart ).mulScalar( scope.rotateSpeed );

        var element = scope.domElement;

        rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

        rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

        rotateStart.copy( rotateEnd );

        scope.update();

    }

    function handleMouseMoveDolly( event ) {

        dollyEnd.set( event.clientX, event.clientY );

        dollyDelta.sub2( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {

            dollyOut( getZoomScale() );

        } else if ( dollyDelta.y < 0 ) {

            dollyIn( getZoomScale() );

        }

        dollyStart.copy( dollyEnd );

        scope.update();

    }

    function handleMouseMovePan( event ) {

        panEnd.set( event.clientX, event.clientY );

        panDelta.sub2( panEnd, panStart ).mulScalar( scope.panSpeed );

        pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

        scope.update();

    }

    // function handleMouseUp( /*event*/ ) {

    //  // no-op

    // }

    function handleMouseWheel( event ) {

        if ( event.deltaY < 0 ) {

            dollyIn( getZoomScale() );

        } else if ( event.deltaY > 0 ) {

            dollyOut( getZoomScale() );

        }

        scope.update();

    }

    function handleTouchStartRotate( event ) {

        if ( event.touches.length == 1 ) {

            rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

        } else {

            var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
            var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

            rotateStart.set( x, y );

        }

    }

    function handleTouchStartPan( event ) {

        if ( event.touches.length == 1 ) {

            panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

        } else {

            var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
            var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

            panStart.set( x, y );

        }

    }

    function handleTouchStartDolly( event ) {

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyStart.set( 0, distance );

    }

    function handleTouchStartDollyPan( event ) {

        if ( scope.enableZoom ) handleTouchStartDolly( event );

        if ( scope.enablePan ) handleTouchStartPan( event );

    }

    function handleTouchStartDollyRotate( event ) {

        if ( scope.enableZoom ) handleTouchStartDolly( event );

        if ( scope.enableRotate ) handleTouchStartRotate( event );

    }

    function handleTouchMoveRotate( event ) {

        if ( event.touches.length == 1 ) {

            rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

        } else {

            var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
            var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

            rotateEnd.set( x, y );

        }

        rotateDelta.sub2( rotateEnd, rotateStart ).mulScalar( scope.rotateSpeed );

        var element = scope.domElement;

        rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

        rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

        rotateStart.copy( rotateEnd );

    }

    function handleTouchMovePan( event ) {

        if ( event.touches.length == 1 ) {

            panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

        } else {

            var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
            var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

            panEnd.set( x, y );

        }

        panDelta.sub2( panEnd, panStart ).mulScalar( scope.panSpeed );

        pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

    }

    function handleTouchMoveDolly( event ) {

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyEnd.set( 0, distance );

        dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

        dollyOut( dollyDelta.y );

        dollyStart.copy( dollyEnd );

    }

    function handleTouchMoveDollyPan( event ) {

        if ( scope.enableZoom ) handleTouchMoveDolly( event );

        if ( scope.enablePan ) handleTouchMovePan( event );

    }

    function handleTouchMoveDollyRotate( event ) {

        if ( scope.enableZoom ) handleTouchMoveDolly( event );

        if ( scope.enableRotate ) handleTouchMoveRotate( event );

    }

    // function handleTouchEnd( /*event*/ ) {

    //  // no-op

    // }

    //
    // event handlers - FSM: listen for events and reset state
    //

    function onPointerDown( event ) {

        if ( scope.enabled === false ) return;

        switch ( event.pointerType ) {

            case 'mouse':
            case 'pen':
                onMouseDown( event );
                break;

            // TODO touch

        }

    }

    function onPointerMove( event ) {

        if ( scope.enabled === false ) return;

        switch ( event.pointerType ) {

            case 'mouse':
            case 'pen':
                onMouseMove( event );
                break;

            // TODO touch

        }

    }

    function onPointerUp( event ) {

        switch ( event.pointerType ) {

            case 'mouse':
            case 'pen':
                onMouseUp( event );
                break;

            // TODO touch

        }

    }

    function onMouseDown( event ) {

        // Prevent the browser from scrolling.
        event.preventDefault();

        // Manually set the focus since calling preventDefault above
        // prevents the browser from setting it automatically.

        scope.domElement.focus ? scope.domElement.focus() : window.focus();

        var mouseAction;

        switch ( event.button ) {

            case 0:

                mouseAction = scope.mouseButtons.LEFT;
                break;

            case 1:

                mouseAction = scope.mouseButtons.MIDDLE;
                break;

            case 2:

                mouseAction = scope.mouseButtons.RIGHT;
                break;

            default:

                mouseAction = - 1;

        }

        switch ( mouseAction ) {

            case MOUSE.DOLLY:

                if ( scope.enableZoom === false ) return;

                handleMouseDownDolly( event );

                state = STATE.DOLLY;

                break;

            case MOUSE.ROTATE:

                if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

                    if ( scope.enablePan === false ) return;

                    handleMouseDownPan( event );

                    state = STATE.PAN;

                } else {

                    if ( scope.enableRotate === false ) return;

                    handleMouseDownRotate( event );

                    state = STATE.ROTATE;

                }

                break;

            case MOUSE.PAN:

                if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

                    if ( scope.enableRotate === false ) return;

                    handleMouseDownRotate( event );

                    state = STATE.ROTATE;

                } else {

                    if ( scope.enablePan === false ) return;

                    handleMouseDownPan( event );

                    state = STATE.PAN;

                }

                break;

            default:

                state = STATE.NONE;

        }

        if ( state !== STATE.NONE ) {

            scope.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove );
            scope.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp );

            scope.emit( 'start' );

        }

    }

    function onMouseMove( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

        switch ( state ) {

            case STATE.ROTATE:

                if ( scope.enableRotate === false ) return;

                handleMouseMoveRotate( event );

                break;

            case STATE.DOLLY:

                if ( scope.enableZoom === false ) return;

                handleMouseMoveDolly( event );

                break;

            case STATE.PAN:

                if ( scope.enablePan === false ) return;

                handleMouseMovePan( event );

                break;

        }

    }

    function onMouseUp( event ) {

        scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
        scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

        if ( scope.enabled === false ) return;

        // handleMouseUp( event );

        scope.emit( 'end' );

        state = STATE.NONE;

    }

    function onMouseWheel( event ) {

        if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

        event.preventDefault();

        scope.emit( 'start' );

        handleMouseWheel( event );

        scope.emit( 'end' );

    }

    function onTouchStart( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault(); // prevent scrolling

        switch ( event.touches.length ) {

            case 1:

                switch ( scope.touches.ONE ) {

                    case TOUCH.ROTATE:

                        if ( scope.enableRotate === false ) return;

                        handleTouchStartRotate( event );

                        state = STATE.TOUCH_ROTATE;

                        break;

                    case TOUCH.PAN:

                        if ( scope.enablePan === false ) return;

                        handleTouchStartPan( event );

                        state = STATE.TOUCH_PAN;

                        break;

                    default:

                        state = STATE.NONE;

                }

                break;

            case 2:

                switch ( scope.touches.TWO ) {

                    case TOUCH.DOLLY_PAN:

                        if ( scope.enableZoom === false && scope.enablePan === false ) return;

                        handleTouchStartDollyPan( event );

                        state = STATE.TOUCH_DOLLY_PAN;

                        break;

                    case TOUCH.DOLLY_ROTATE:

                        if ( scope.enableZoom === false && scope.enableRotate === false ) return;

                        handleTouchStartDollyRotate( event );

                        state = STATE.TOUCH_DOLLY_ROTATE;

                        break;

                    default:

                        state = STATE.NONE;

                }

                break;

            default:

                state = STATE.NONE;

        }

        if ( state !== STATE.NONE ) {

            scope.emit( 'start' );

        }

    }

    function onTouchMove( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault(); // prevent scrolling

        switch ( state ) {

            case STATE.TOUCH_ROTATE:

                if ( scope.enableRotate === false ) return;

                handleTouchMoveRotate( event );

                scope.update();

                break;

            case STATE.TOUCH_PAN:

                if ( scope.enablePan === false ) return;

                handleTouchMovePan( event );

                scope.update();

                break;

            case STATE.TOUCH_DOLLY_PAN:

                if ( scope.enableZoom === false && scope.enablePan === false ) return;

                handleTouchMoveDollyPan( event );

                scope.update();

                break;

            case STATE.TOUCH_DOLLY_ROTATE:

                if ( scope.enableZoom === false && scope.enableRotate === false ) return;

                handleTouchMoveDollyRotate( event );

                scope.update();

                break;

            default:

                state = STATE.NONE;

        }

    }

    function onTouchEnd( event ) {

        if ( scope.enabled === false ) return;

        // handleTouchEnd( event );

        scope.emit( 'end' );

        state = STATE.NONE;

    }

    function onContextMenu( event ) {

        if ( scope.enabled === false ) return;

        event.preventDefault();

    }

    //

    scope.domElement.addEventListener( 'contextmenu', onContextMenu );

    scope.domElement.addEventListener( 'pointerdown', onPointerDown );
    scope.domElement.addEventListener( 'wheel', onMouseWheel );

    scope.domElement.addEventListener( 'touchstart', onTouchStart );
    scope.domElement.addEventListener( 'touchend', onTouchEnd );
    scope.domElement.addEventListener( 'touchmove', onTouchMove );

    // force an update at start

    this.update();

};

Tiny.EventTarget.mixin(OrbitControls);

// OrbitControls.prototype = Object.create( EventDispatcher.prototype );
OrbitControls.prototype.constructor = OrbitControls;


// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
// This is very similar to OrbitControls, another set of touch behavior
//
//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - left mouse, or arrow keys / touch: one-finger move

var MapControls = function ( object, domElement ) {

    OrbitControls.call( this, object, domElement );

    this.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up

    this.mouseButtons.LEFT = MOUSE.PAN;
    this.mouseButtons.RIGHT = MOUSE.ROTATE;

    this.touches.ONE = TOUCH.PAN;
    this.touches.TWO = TOUCH.DOLLY_ROTATE;

};

Tiny.EventTarget.mixin(MapControls);

MapControls.prototype.constructor = MapControls;

Tiny.OrbitControls = OrbitControls;
Tiny.MapControls = MapControls;