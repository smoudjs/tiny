Tiny.Cache.texture3d={},Tiny.Loader.prototype.texture3d=function(e,t,r){this.list.push({key:e,src:t,type:"texture3d",cb:r})},Tiny.Loader.texture3d=function(e,t){Tiny.Loader.image(e,(function(e,r){var i=new Tiny.WebGlTexture(game.renderer.gl,{image:r.source,flipY:!1});Tiny.Cache.texture3d[e.key]=i,t()}))};