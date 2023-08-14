!function(){"use strict";var t=function(t,i){this.x=t||0,this.y=i||0};t.prototype={set:function(t,i){return this.x=t||0,this.y=i||(0!==i?this.x:0),this}};const i=t;var s=function(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this.type=Tiny.MATRIX};s.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},s.prototype.toArray=function(t){this.array||(this.array=new Float32Array(9));var i=this.array;return t?(i[0]=this.a,i[1]=this.b,i[2]=0,i[3]=this.c,i[4]=this.d,i[5]=0,i[6]=this.tx,i[7]=this.ty,i[8]=1):(i[0]=this.a,i[1]=this.c,i[2]=this.tx,i[3]=this.b,i[4]=this.d,i[5]=this.ty,i[6]=0,i[7]=0,i[8]=1),i},s.prototype.apply=function(t,s){s=s||new i;var e=t.x,r=t.y;return s.x=this.a*e+this.c*r+this.tx,s.y=this.b*e+this.d*r+this.ty,s},s.prototype.applyInverse=function(t,s){s=s||new i;var e=1/(this.a*this.d+this.c*-this.b),r=t.x,h=t.y;return s.x=this.d*e*r+-this.c*e*h+(this.ty*this.c-this.tx*this.d)*e,s.y=this.a*e*h+-this.b*e*r+(-this.ty*this.a+this.tx*this.b)*e,s},s.prototype.translate=function(t,i){return this.tx+=t,this.ty+=i,this},s.prototype.scale=function(t,i){return this.a*=t,this.d*=i,this.c*=t,this.b*=i,this.tx*=t,this.ty*=i,this},s.prototype.rotate=function(t){var i=Math.cos(t),s=Math.sin(t),e=this.a,r=this.c,h=this.tx;return this.a=e*i-this.b*s,this.b=e*s+this.b*i,this.c=r*i-this.d*s,this.d=r*s+this.d*i,this.tx=h*i-this.ty*s,this.ty=h*s+this.ty*i,this},s.prototype.append=function(t){var i=this.a,s=this.b,e=this.c,r=this.d;return this.a=t.a*i+t.b*e,this.b=t.a*s+t.b*r,this.c=t.c*i+t.d*e,this.d=t.c*s+t.d*r,this.tx=t.tx*i+t.ty*e+this.tx,this.ty=t.tx*s+t.ty*r+this.ty,this},s.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},s.identityMatrix=new s;const e=s;var r=2*Math.PI,h=function(){this.position=new i(0,0),this.scale=new i(1,1),this.pivot=new i(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.renderable=!1,this.parent=null,this.worldAlpha=1,this.worldTransform=new e,this._sr=0,this._cr=1,this._cacheAsBitmap=!1};h.prototype.constructor=h,h.prototype.destroy=function(){this.parent&&this.parent.remove(this),this.parent=null,this.worldTransform=null,this.visible=!1,this.renderable=!1,this._destroyCachedSprite()},Object.defineProperty(h.prototype,'worldVisible',{get:function(){var t=this;do{if(!t.visible)return!1;t=t.parent}while(t);return!0}}),Object.defineProperty(h.prototype,'cacheAsBitmap',{get:function(){return this._cacheAsBitmap},set:function(t){this._cacheAsBitmap!==t&&(t?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=t)}}),h.prototype.updateTransform=function(){if(this.parent){var t,i,s,e,h,o,n=this.parent.worldTransform,a=this.worldTransform;this.rotation%r?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),t=this._cr*this.scale.x,i=this._sr*this.scale.x,s=-this._sr*this.scale.y,e=this._cr*this.scale.y,h=this.position.x,o=this.position.y,(this.pivot.x||this.pivot.y)&&(h-=this.pivot.x*t+this.pivot.y*s,o-=this.pivot.x*i+this.pivot.y*e),a.a=t*n.a+i*n.c,a.b=t*n.b+i*n.d,a.c=s*n.a+e*n.c,a.d=s*n.b+e*n.d,a.tx=h*n.a+o*n.c+n.tx,a.ty=h*n.b+o*n.d+n.ty):(t=this.scale.x,e=this.scale.y,h=this.position.x-this.pivot.x*t,o=this.position.y-this.pivot.y*e,a.a=t*n.a,a.b=t*n.b,a.c=e*n.c,a.d=e*n.d,a.tx=h*n.a+o*n.c+n.tx,a.ty=h*n.b+o*n.d+n.ty),this.worldAlpha=this.alpha*this.parent.worldAlpha}},h.prototype.displayObjectUpdateTransform=h.prototype.updateTransform,h.prototype.getBounds=function(t){return Tiny.EmptyRectangle},h.prototype.getLocalBounds=function(){return this.getBounds(e.identityMatrix)},h.prototype.generateTexture=function(t,i){var s=this.getLocalBounds(),e=new Tiny.RenderTexture(0|s.width,0|s.height,i,t);return h._tempMatrix.tx=-s.x,h._tempMatrix.ty=-s.y,e.render(this,h._tempMatrix),e},h.prototype.updateCache=function(){this._generateCachedSprite()},h.prototype.toGlobal=function(t){return this.displayObjectUpdateTransform(),this.worldTransform.apply(t)},h.prototype.toLocal=function(t,i){return i&&(t=i.toGlobal(t)),this.displayObjectUpdateTransform(),this.worldTransform.applyInverse(t)},h.prototype._renderCachedSprite=function(t){this._cachedSprite.worldAlpha=this.worldAlpha,Tiny.Sprite.prototype.render.call(this._cachedSprite,t)},h.prototype._generateCachedSprite=function(){this._cachedSprite=null,this._cacheAsBitmap=!1;var t=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.texture.resize(0|t.width,0|t.height);else{var i=new Tiny.RenderTexture(0|t.width,0|t.height);this._cachedSprite=new Tiny.Sprite(i),this._cachedSprite.worldTransform=this.worldTransform}h._tempMatrix.tx=-t.x,h._tempMatrix.ty=-t.y,this._cachedSprite.texture.render(this,h._tempMatrix,!0),this._cachedSprite.anchor.x=-t.x/t.width,this._cachedSprite.anchor.y=-t.y/t.height,this._cacheAsBitmap=!0},h.prototype._destroyCachedSprite=function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)},h.prototype.render=function(t){},Object.defineProperty(h.prototype,'x',{get:function(){return this.position.x},set:function(t){this.position.x=t}}),Object.defineProperty(h.prototype,'y',{get:function(){return this.position.y},set:function(t){this.position.y=t}}),h._tempMatrix=new e;const o={VERSION:'2.2.2',systems:[],registerSystem:function(t,i){ush({name:t,_class_:i})},Primitives:{POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4,RREC_LJOIN:5},rnd:function(t,i){return t+Math.floor(Math.random()*(i-t+1))},style2hex:function(t){return+t.replace('#','0x')},hex2style:function(t){return'#'+('00000'+(0|t).toString(16)).substr(-6)},hex2rgb:function(t){return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]},rgb2hex:function(t){return(255*t[0]<<16)+(255*t[1]<<8)+255*t[2]}};var n={Point:i,Matrix:e,BaseObject2D:h};Object.assign(n,o),window.Tiny=n}();