!function(i){var n={};function s(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=i,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,i){i(1),window.Tiny={},i(2),i(3),i(4),i(5),i(6),i(7),i(8),i(9),i(10),i(11)},function(t,e){Date.now||(Date.now=function(){return(new Date).getTime()}),"undefined"==typeof Float32Array&&(window.Float32Array=Array)},function(t,e){function i(){}Tiny.App=function(t){(this.callbackContext=this).state=0,this.timeScale=1,this.width=0,this.height=0,this.systems=[],this.updatable=[],this.paused=!1,this.pauseDuration=0,this.inputView=document.body,this.boot=(t=t||{}).boot||this.boot||i,this.preload=t.preload||this.preload||i,this.create=t.create||this.create||i,this.update=t.update||this.update||i,this.render=t.render||this.render||i,this._resize_cb=t.resize||i,this._destroy_cb=t.destroy||i;var e=this;setTimeout(function(){e._boot()},0)},Tiny.App.prototype._boot=function(){for(var t=0;t<Tiny.systems.length;t++){var e=Tiny.systems[t],i=new e._class_(this);this.systems.push(i),i.update&&this.updatable.push(i),e.name&&(this[e.name]=i)}Tiny.RAF&&(this.raf=new Tiny.RAF(this)),this.boot.call(this.callbackContext);var n=this;setTimeout(function(){n.load?n._preload():n._create()},0)},Tiny.App.prototype._preload=function(){this.preload.call(this.callbackContext),this.state=1,this.load.start(this._create)},Tiny.App.prototype._create=function(){this.create.call(this.callbackContext),this.raf&&this.raf.start(),this.state=2},Tiny.App.prototype.pause=function(){if(this.raf&&this.raf.reset(),!this.paused){for(var t=0;t<this.systems.length;t++)this.systems[t].pause&&this.systems[t].pause();this.paused=!0}},Tiny.App.prototype.resume=function(){if(this.raf&&this.raf.reset(),this.paused){for(var t=0;t<this.systems.length;t++)this.systems[t].resume&&this.systems[t].resume();this.paused=!1}},Tiny.App.prototype._update=function(t,e){if(this.paused)this.pauseDuration+=e;else{this.update.call(this.callbackContext,t,e);for(var i=0;i<this.updatable.length;i++)this.updatable[i].update(e)}this.render()},Tiny.App.prototype.resize=function(t,e){this.width=t||this.width,this.height=e||this.height,0<this.state&&this._resize_cb.call(this.callbackContext,this.width,this.height);var i=this;setTimeout(function(){i.input&&i.input.updateBounds()},0)},Tiny.App.prototype.destroy=function(t){for(var e=0;e<this.systems.length;e++)this.systems[e].destroy&&this.systems[e].destroy(t);this.paused=!0,t&&this.load.clearCache(),this.raf&&this.raf.stop(),this._destroy_cb.call(this.callbackContext)}},function(t,e){Tiny.VERSION="1.4.9",Tiny.systems=[],Tiny.registerSystem=function(t,e){Tiny.systems.push({name:t,_class_:e})},Tiny.Primitives={POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4,RREC_LJOIN:5},Tiny.rnd=function(t,e){return t+Math.floor(Math.random()*(e-t+1))},Tiny.color2rgb=function(t){return Tiny.hex2rgb(Tiny.style2hex(t))},Tiny.color2style=function(t){return t},Tiny.style2hex=function(t){return+t.replace("#","0x")},Tiny.hex2style=function(t){return"#"+("00000"+(0|t).toString(16)).substr(-6)},Tiny.hex2rgb=function(t){return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]},Tiny.rgb2hex=function(t){return(255*t[0]<<16)+(255*t[1]<<8)+255*t[2]}},function(t,e){Tiny.Math={distance:function(t,e,i,n){t-=i,i=e-n;return Math.sqrt(t*t+i*i)}};var i=Math.PI/180,n=180/Math.PI;Tiny.Math.degToRad=function(t){return t*i},Tiny.Math.radToDeg=function(t){return t*n}},function(t,e){Tiny.Point=function(t,e){this.x=t||0,this.y=e||0},Tiny.Point.prototype={set:function(t,e){return this.x=t||0,this.y=e||(0!==e?this.x:0),this}}},function(t,e){Tiny.Matrix=function(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this.type=Tiny.MATRIX},Tiny.Matrix.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},Tiny.Matrix.prototype.toArray=function(t){this.array||(this.array=new Float32Array(9));var e=this.array;return t?(e[0]=this.a,e[1]=this.b,e[2]=0,e[3]=this.c,e[4]=this.d,e[5]=0,e[6]=this.tx,e[7]=this.ty):(e[0]=this.a,e[1]=this.c,e[2]=this.tx,e[3]=this.b,e[4]=this.d,e[5]=this.ty,e[6]=0,e[7]=0),e[8]=1,e},Tiny.Matrix.prototype.apply=function(t,e){e=e||new Tiny.Point;var i=t.x,t=t.y;return e.x=this.a*i+this.c*t+this.tx,e.y=this.b*i+this.d*t+this.ty,e},Tiny.Matrix.prototype.applyInverse=function(t,e){e=e||new Tiny.Point;var i=1/(this.a*this.d+this.c*-this.b),n=t.x,t=t.y;return e.x=this.d*i*n+-this.c*i*t+(this.ty*this.c-this.tx*this.d)*i,e.y=this.a*i*t+-this.b*i*n+(-this.ty*this.a+this.tx*this.b)*i,e},Tiny.Matrix.prototype.translate=function(t,e){return this.tx+=t,this.ty+=e,this},Tiny.Matrix.prototype.scale=function(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this},Tiny.Matrix.prototype.rotate=function(t){var e=Math.cos(t),t=Math.sin(t),i=this.a,n=this.c,s=this.tx;return this.a=i*e-this.b*t,this.b=i*t+this.b*e,this.c=n*e-this.d*t,this.d=n*t+this.d*e,this.tx=s*e-this.ty*t,this.ty=s*t+this.ty*e,this},Tiny.Matrix.prototype.append=function(t){var e=this.a,i=this.b,n=this.c,s=this.d;return this.a=t.a*e+t.b*n,this.b=t.a*i+t.b*s,this.c=t.c*e+t.d*n,this.d=t.c*i+t.d*s,this.tx=t.tx*e+t.ty*n+this.tx,this.ty=t.tx*i+t.ty*s+this.ty,this},Tiny.Matrix.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},Tiny.identityMatrix=new Tiny.Matrix},function(t,e){Tiny.Rectangle=function(t,e,i,n){e=e||0,i=i||0,n=n||0,this.x=t=t||0,this.y=e,this.width=i,this.height=n,this.type=Tiny.Primitives.RECT},Tiny.Rectangle.prototype={setTo:function(t,e,i,n){return this.x=t,this.y=e,this.width=i,this.height=n,this},contains:function(t,e){return Tiny.Rectangle.contains(this,t,e)},intersects:function(t){return Tiny.Rectangle.intersects(this,t)}},Object.defineProperty(Tiny.Rectangle.prototype,"bottom",{get:function(){return this.y+this.height},set:function(t){t<=this.y?this.height=0:this.height=t-this.y}}),Object.defineProperty(Tiny.Rectangle.prototype,"right",{get:function(){return this.x+this.width},set:function(t){t<=this.x?this.width=0:this.width=t-this.x}}),Object.defineProperty(Tiny.Rectangle.prototype,"volume",{get:function(){return this.width*this.height}}),Tiny.Rectangle.prototype.constructor=Tiny.Rectangle,Tiny.Rectangle.contains=function(t,e,i){return!(t.width<=0||t.height<=0)&&(e>=t.x&&e<t.right&&i>=t.y&&i<t.bottom)},Tiny.Rectangle.containsPoint=function(t,e){return Tiny.Rectangle.contains(t,e.x,e.y)},Tiny.Rectangle.containsRect=function(t,e){return!(t.volume>e.volume)&&(t.x>=e.x&&t.y>=e.y&&t.right<e.right&&t.bottom<e.bottom)},Tiny.Rectangle.intersects=function(t,e){return!(t.width<=0||t.height<=0||e.width<=0||e.height<=0)&&!(t.right<e.x||t.bottom<e.y||t.x>e.right||t.y>e.bottom)},Tiny.EmptyRectangle=new Tiny.Rectangle(0,0,0,0)},function(t,e){var a=2*Math.PI;Tiny.BaseObject2D=function(){this.position=new Tiny.Point(0,0),this.scale=new Tiny.Point(1,1),this.pivot=new Tiny.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.renderable=!1,this.parent=null,this.worldAlpha=1,this.worldTransform=new Tiny.Matrix,this._sr=0,this._cr=1,this._cacheAsBitmap=!1},Tiny.BaseObject2D.prototype.constructor=Tiny.BaseObject2D,Tiny.BaseObject2D.prototype.destroy=function(){this.parent&&this.parent.remove(this),this.parent=null,this.worldTransform=null,this.visible=!1,this.renderable=!1,this._destroyCachedSprite()},Object.defineProperty(Tiny.BaseObject2D.prototype,"worldVisible",{get:function(){var t=this;do{if(!t.visible)return!1}while(t=t.parent);return!0}}),Object.defineProperty(Tiny.BaseObject2D.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(t){this._cacheAsBitmap!==t&&(t?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=t)}}),Tiny.BaseObject2D.prototype.updateTransform=function(){var t,e,i,n,s,r,o,h;this.parent&&(t=this.parent.worldTransform,e=this.worldTransform,this.rotation%a?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),i=this._cr*this.scale.x,n=this._sr*this.scale.x,s=-this._sr*this.scale.y,r=this._cr*this.scale.y,o=this.position.x,h=this.position.y,(this.pivot.x||this.pivot.y)&&(o-=this.pivot.x*i+this.pivot.y*s,h-=this.pivot.x*n+this.pivot.y*r),e.a=i*t.a+n*t.c,e.b=i*t.b+n*t.d,e.c=s*t.a+r*t.c,e.d=s*t.b+r*t.d):(i=this.scale.x,r=this.scale.y,o=this.position.x-this.pivot.x*i,h=this.position.y-this.pivot.y*r,e.a=i*t.a,e.b=i*t.b,e.c=r*t.c,e.d=r*t.d),e.tx=o*t.a+h*t.c+t.tx,e.ty=o*t.b+h*t.d+t.ty,this.worldAlpha=this.alpha*this.parent.worldAlpha)},Tiny.BaseObject2D.prototype.displayObjectUpdateTransform=Tiny.BaseObject2D.prototype.updateTransform,Tiny.BaseObject2D.prototype.getBounds=function(t){return Tiny.EmptyRectangle},Tiny.BaseObject2D.prototype.getLocalBounds=function(){return this.getBounds(Tiny.identityMatrix)},Tiny.BaseObject2D.prototype.generateTexture=function(t,e){var i=this.getLocalBounds(),e=new Tiny.RenderTexture(0|i.width,0|i.height,e,t);return Tiny.BaseObject2D._tempMatrix.tx=-i.x,Tiny.BaseObject2D._tempMatrix.ty=-i.y,e.render(this,Tiny.BaseObject2D._tempMatrix),e},Tiny.BaseObject2D.prototype.updateCache=function(){this._generateCachedSprite()},Tiny.BaseObject2D.prototype.toGlobal=function(t){return this.displayObjectUpdateTransform(),this.worldTransform.apply(t)},Tiny.BaseObject2D.prototype.toLocal=function(t,e){return e&&(t=e.toGlobal(t)),this.displayObjectUpdateTransform(),this.worldTransform.applyInverse(t)},Tiny.BaseObject2D.prototype._renderCachedSprite=function(t){this._cachedSprite.worldAlpha=this.worldAlpha,Tiny.Sprite.prototype.render.call(this._cachedSprite,t)},Tiny.BaseObject2D.prototype._generateCachedSprite=function(){this._cachedSprite=null,this._cacheAsBitmap=!1;var t,e=this.getLocalBounds();this._cachedSprite?this._cachedSprite.texture.resize(0|e.width,0|e.height):(t=new Tiny.RenderTexture(0|e.width,0|e.height),this._cachedSprite=new Tiny.Sprite(t),this._cachedSprite.worldTransform=this.worldTransform),Tiny.BaseObject2D._tempMatrix.tx=-e.x,Tiny.BaseObject2D._tempMatrix.ty=-e.y,this._cachedSprite.texture.render(this,Tiny.BaseObject2D._tempMatrix,!0),this._cachedSprite.anchor.x=-(e.x/e.width),this._cachedSprite.anchor.y=-(e.y/e.height),this._cacheAsBitmap=!0},Tiny.BaseObject2D.prototype._destroyCachedSprite=function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)},Tiny.BaseObject2D.prototype.render=function(t){},Object.defineProperty(Tiny.BaseObject2D.prototype,"x",{get:function(){return this.position.x},set:function(t){this.position.x=t}}),Object.defineProperty(Tiny.BaseObject2D.prototype,"y",{get:function(){return this.position.y},set:function(t){this.position.y=t}}),Tiny.BaseObject2D._tempMatrix=new Tiny.Matrix},function(t,e){Tiny.Object2D=function(){Tiny.BaseObject2D.call(this),this.children=[],this._bounds=new Tiny.Rectangle(0,0,1,1),this._currentBounds=null,this._mask=null},Tiny.Object2D.prototype=Object.create(Tiny.BaseObject2D.prototype),Tiny.Object2D.prototype.constructor=Tiny.Object2D,Object.defineProperty(Tiny.Object2D.prototype,"width",{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(t){var e=this.getLocalBounds().width;this.scale.x=0!==e?t/e:1,this._width=t}}),Object.defineProperty(Tiny.Object2D.prototype,"height",{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(t){var e=this.getLocalBounds().height;this.scale.y=0!==e?t/e:1,this._height=t}}),Object.defineProperty(Tiny.Object2D.prototype,"mask",{get:function(){return this._mask},set:function(t){this._mask&&(this._mask.isMask=!1),this._mask=t,this._mask&&(this._mask.isMask=!0)}}),Tiny.Object2D.prototype.destroy=function(){for(var t=this.children.length;t--;)this.children[t].destroy();this.children=[],Tiny.BaseObject2D.prototype.destroy.call(this),this._bounds=null,this._currentBounds=null,this._mask=null,this.input&&this.input.system.remove(this)},Tiny.Object2D.prototype.add=function(t){return this.addChildAt(t,this.children.length)},Tiny.Object2D.prototype.addChildAt=function(t,e){if(0<=e&&e<=this.children.length)return t.parent&&t.parent.remove(t),t.parent=this,t.game=this.game,this.children.splice(e,0,t),t;throw new Error(t+"addChildAt: The index "+e+" supplied is out of bounds "+this.children.length)},Tiny.Object2D.prototype.swapChildren=function(t,e){if(t!==e){var i=this.getChildIndex(t),n=this.getChildIndex(e);if(i<0||n<0)throw new Error("swapChildren: Both the supplied Objects must be a child of the caller.");this.children[i]=e,this.children[n]=t}},Tiny.Object2D.prototype.getChildIndex=function(t){t=this.children.indexOf(t);if(-1===t)throw new Error("The supplied Object must be a child of the caller");return t},Tiny.Object2D.prototype.setChildIndex=function(t,e){if(e<0||e>=this.children.length)throw new Error("The supplied index is out of bounds");var i=this.getChildIndex(t);this.children.splice(i,1),this.children.splice(e,0,t)},Tiny.Object2D.prototype.getChildAt=function(t){if(t<0||t>=this.children.length)throw new Error("getChildAt: Supplied index "+t+" does not exist in the child list, or the supplied Object must be a child of the caller");return this.children[t]},Tiny.Object2D.prototype.remove=function(t){t=this.children.indexOf(t);if(-1!==t)return this.removeChildAt(t)},Tiny.Object2D.prototype.removeChildAt=function(t){var e=this.getChildAt(t);return e.parent=void 0,this.children.splice(t,1),e},Tiny.Object2D.prototype.removeChildren=function(t,e){var t=t||0,e="number"==typeof e?e:this.children.length,i=e-t;if(0<i&&i<=e){for(var n=this.children.splice(t,i),s=0;s<n.length;s++)n[s].parent=void 0;return n}if(0==i&&0===this.children.length)return[];throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range")},Tiny.Object2D.prototype.updateTransform=function(){if(this.visible&&(this.displayObjectUpdateTransform(),!this._cacheAsBitmap))for(var t=0,e=this.children.length;t<e;t++)this.children[t].updateTransform()},Tiny.Object2D.prototype.displayObjectContainerUpdateTransform=Tiny.Object2D.prototype.updateTransform,Tiny.Object2D.prototype.getBounds=function(){if(0===this.children.length)return Tiny.EmptyRectangle;if(this._cachedSprite)return this._cachedSprite.getBounds();for(var t,e,i=1/0,n=1/0,s=-1/0,r=-1/0,o=!1,h=0,a=this.children.length;h<a;h++)this.children[h].visible&&(o=!0,i=i<(t=this.children[h].getBounds()).x?i:t.x,n=n<t.y?n:t.y,s=(e=t.width+t.x)<s?s:e,r=(e=t.height+t.y)<r?r:e);if(!o)return Tiny.EmptyRectangle;var c=this._bounds;return c.x=i,c.y=n,c.width=s-i,c.height=r-n,c},Tiny.Object2D.prototype.getLocalBounds=function(){var t=this.worldTransform;this.worldTransform=Tiny.identityMatrix;for(var e=0,i=this.children.length;e<i;e++)this.children[e].updateTransform();var n=this.getBounds();return this.worldTransform=t,n},Tiny.Object2D.prototype.render=function(t){if(!1!==this.visible&&0!==this.alpha)if(this._cacheAsBitmap)this._renderCachedSprite(t);else{this._mask&&t.maskManager.pushMask(this._mask,t);for(var e=0;e<this.children.length;e++)this.children[e].render(t);this._mask&&t.maskManager.popMask(t)}}},function(t,e){Tiny.Scene=function(t){Tiny.Object2D.call(this),this.worldTransform=new Tiny.Matrix,this.game=t},Tiny.Scene.prototype=Object.create(Tiny.Object2D.prototype),Tiny.Scene.prototype.constructor=Tiny.Scene,Tiny.Scene.prototype.updateTransform=function(){this.worldAlpha=1;for(var t=0;t<this.children.length;t++)this.children[t].updateTransform()}},function(t,e){Tiny.CanvasRenderer=function(t,e,i){this.resolution=null!=(i=i||{}).resolution?i.resolution:1,this.clearBeforeRender=null==i.clearBeforeRender||i.clearBeforeRender,this.transparent=null!=i.transparent&&i.transparent,this.autoResize=i.autoResize||!1,Tiny.defaultRenderer||(Tiny.defaultRenderer=this);i=this.domElement=i.domElement||document.createElement("canvas");this.context=i.getContext("2d",{alpha:this.transparent}),this.setSize(t||800,e||600),this.setClearColor("#ffffff"),Tiny.CanvasMaskManager&&(this.maskManager=new Tiny.CanvasMaskManager),this.renderSession={context:this.context,maskManager:this.maskManager,smoothProperty:null,roundPixels:!1},"imageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="imageSmoothingEnabled":"webkitImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="webkitImageSmoothingEnabled":"mozImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="mozImageSmoothingEnabled":"oImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="oImageSmoothingEnabled":"msImageSmoothingEnabled"in this.context&&(this.renderSession.smoothProperty="msImageSmoothingEnabled")},Tiny.CanvasRenderer.prototype.constructor=Tiny.CanvasRenderer,Tiny.CanvasRenderer.prototype.setClearColor=function(t){this.clearColor=t},Tiny.CanvasRenderer.prototype.render=function(t){this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.renderSession.currentBlendMode="source-over",this.context.globalCompositeOperation="source-over",navigator.isCocoonJS&&this.domElement.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width*this.resolution,this.height*this.resolution):(this.context.fillStyle=this.clearColor,this.context.fillRect(0,0,this.width*this.resolution,this.height*this.resolution))),this.renderObject(t)},Tiny.CanvasRenderer.prototype.destroy=function(t){(t=void 0===t?!0:t)&&this.domElement.parentNode&&this.domElement.parentNode.removeChild(this.domElement),this.domElement=null,this.context=null,this.maskManager=null,this.renderSession=null,Tiny.defaultRenderer===this&&(Tiny.defaultRenderer=null)},Tiny.CanvasRenderer.prototype.setSize=function(t,e){this.width=t,this.height=e;var i=this.domElement;i.width=Math.floor(this.width*this.resolution),i.height=Math.floor(this.height*this.resolution),this.autoResize&&(i.style.width=t+"px",i.style.height=e+"px")},Tiny.CanvasRenderer.prototype.setPixelRatio=function(t){this.resolution=t;t=this.domElement;t.width=Math.floor(this.width*this.resolution),t.height=Math.floor(this.height*this.resolution)},Tiny.CanvasRenderer.prototype.renderObject=function(t,e){t.updateTransform(),this.renderSession.context=e||this.context,this.renderSession.resolution=this.resolution,t.render(this.renderSession)}}]);