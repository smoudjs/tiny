!function(){var t={462:function(){Date.now||(Date.now=function(){return(new Date).getTime()}),'undefined'==typeof Float32Array&&(window.Float32Array=Array,window.Uint16Array=Array),void 0===Object.assign&&(Object.assign=function(t){'use strict';if(null==t)throw new TypeError('Cannot convert undefined or null to object');for(var i=Object(t),s=1;s<arguments.length;s++){var h=arguments[s];if(null!=h)for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&(i[n]=h[n])}return i})}},i={};function s(h){var n=i[h];if(void 0!==n)return n.exports;var r=i[h]={exports:{}};return t[h](r,r.exports,s),r.exports}!function(){"use strict";s(462);var t=function(t,i,s){this.width=t,this.height=i,this.canvas=document.createElement('canvas'),this.context=this.canvas.getContext('2d',s),this.canvas.width=t,this.canvas.height=i};function i(){this.a=[],this.n=0}t.prototype.constructor=t,t.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height)},t.prototype.resize=function(t,i){this.width=this.canvas.width=t,this.height=this.canvas.height=i};var h={call:function(t){t&&(t=t.prototype||t,h.mixin(t))},mixin:function(t){var s={};function h(t,h,n,r){var e=s[t];e||(e=s[t]=new i),e.a.push(h,n||null,r||!1),e.n+=3}t.once=function(t,i,s){h(t,i,s,!0)},t.on=h,t.off=function(t,i,h){if(s[t]){var n=s[t].a;if(i)if(h)for(r=0;r<n.length;r+=3)n[r]==i&&n[r+1]==h&&(n.splice(r,3),r-=3);else for(var r=0;r<n.length;r+=3)n[r]==i&&(n.splice(r,3),r-=3);else n.length=0;0==n.length&&delete s[t]}},t.emit=function(t,i,h,n){var r=s[t];if(r){var e=r.a;r.n=0;for(var o,a,c=arguments.length,u=0;u<e.length-r.n;u+=3)o=e[u],a=e[u+1],e[u+2]&&(e.splice(u,3),u-=3),c<=1?o.call(a):2==c?o.call(a,i):3==c?o.call(a,i,h):o.call(a,i,h,n);0==e.length&&delete s[t]}}}};var n=Math.PI/180,r=180/Math.PI,e={distance:function(t,i,s,h){var n=t-s,r=i-h;return Math.sqrt(n*n+r*r)},clamp:function(t,i,s){return Math.max(i,Math.min(s,t))},degToRad:function(t){return t*n},radToDeg:function(t){return t*r},isPow2:function(t){return!(t&t-1||!t)},getNextPow2:function(t){if(t>0&&0==(t&t-1))return t;for(var i=1;i<t;)i<<=1;return i}};function o(t,i,s){return this.r=1,this.g=1,this.b=1,this.a=1,this.int=16777215,void 0===i&&void 0===s?this.set(t):this.setRGB(t,i,s)}Object.assign(o.prototype,{set:function(t){return t&&'number'==typeof t.int?this.copy(t):'number'==typeof t?this.setHex(t):'string'==typeof t&&this.setStyle(t),this},refresh:function(){return this.int=(255*this.r<<16)+(255*this.g<<8)+(255*this.b|0),this},setHex:function(t){return t|=0,this.int=t,this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,this},setRGB:function(t,i,s){return this.r=t,this.g=i,this.b=s,this.refresh()},setStyle:function(t){var i=t.length;if(4===i){var s=t.charAt(1),h=t.charAt(2),n=t.charAt(3);return this.setHex(+('0x'+s+s+h+h+n+n))}return 7===i?this.setHex(+t.replace('#','0x')):this},copy:function(t){return this.r=t.r,this.g=t.g,this.b=t.b,this.a=t.a,this.refresh()},toStyle:function(){return'#'+('00000'+this.int.toString(16)).slice(-6)},multiply:function(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this.refresh()},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}});var a=function(t,i){this.x=t||0,this.y=i||0};a.prototype={set:function(t,i){return this.x=t||0,this.y=i||(0!==i?this.x:0),this},subVectors:function(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this},multiplyScalar:function(t){return this.x*=t,this.y*=t,this},copy:function(t){return this.x=t.x,this.y=t.y,this},multiply:function(t){return this.x*=t.x,this.y*=t.y,this}};var c=function(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0};c.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},c.prototype.toArray=function(t){this.array||(this.array=new Float32Array(9));var i=this.array;return t?(i[0]=this.a,i[1]=this.b,i[2]=0,i[3]=this.c,i[4]=this.d,i[5]=0,i[6]=this.tx,i[7]=this.ty,i[8]=1):(i[0]=this.a,i[1]=this.c,i[2]=this.tx,i[3]=this.b,i[4]=this.d,i[5]=this.ty,i[6]=0,i[7]=0,i[8]=1),i},c.prototype.apply=function(t,i){i=i||new a;var s=t.x,h=t.y;return i.x=this.a*s+this.c*h+this.tx,i.y=this.b*s+this.d*h+this.ty,i},c.prototype.applyInverse=function(t,i){i=i||new a;var s=1/(this.a*this.d+this.c*-this.b),h=t.x,n=t.y;return i.x=this.d*s*h+-this.c*s*n+(this.ty*this.c-this.tx*this.d)*s,i.y=this.a*s*n+-this.b*s*h+(-this.ty*this.a+this.tx*this.b)*s,i},c.prototype.translate=function(t,i){return this.tx+=t,this.ty+=i,this},c.prototype.scale=function(t,i){return this.a*=t,this.d*=i,this.c*=t,this.b*=i,this.tx*=t,this.ty*=i,this},c.prototype.rotate=function(t){var i=Math.cos(t),s=Math.sin(t),h=this.a,n=this.c,r=this.tx;return this.a=h*i-this.b*s,this.b=h*s+this.b*i,this.c=n*i-this.d*s,this.d=n*s+this.d*i,this.tx=r*i-this.ty*s,this.ty=r*s+this.ty*i,this},c.prototype.append=function(t){var i=this.a,s=this.b,h=this.c,n=this.d;return this.a=t.a*i+t.b*h,this.b=t.a*s+t.b*n,this.c=t.c*i+t.d*h,this.d=t.c*s+t.d*n,this.tx=t.tx*i+t.ty*h+this.tx,this.ty=t.tx*s+t.ty*n+this.ty,this},c.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this};new c;var u={VERSION:'3.0.3',CanvasBuffer:t,EventEmitter:h,Math:e,Mat3:c,Vec2:a,Color:o};Object.assign(u,{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},{LINEAR:0,NEAREST:1},{POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4}),window.Tiny=u}()}();