# TODO:
- Graphics mask
- Particle system
- Webgl-2d
- Tiling sprite
- Skeleton / skinning
- Gltf-loader
- Shadows
- Canvas renderer
- Masks 2d
- Render target / rendere texture
- Anim system
- Anim keyframes
- Anim spritesheet
- Input with camera controls
- More geometrices shapes
- More graphics shapes
- Sprite3D (Text, TilingSprite)
- Sprite3D in world space
- Canvas3D
- Create-spritesheet
- CatmullRomCurve3
- Font-loader
- Geometry utils
- Raycaster
- misc.RenderLayer
- misc.Button
- misc.Opaque
- misc.extends
- Progress Bar
- Sound
- ThreeJS plugin
- tween extends
- Points 3D




▪️ Timer - зробити схожим, щоб працював по принципу Tween.

▪️ EventTrigger / InputSystem - fix, when 
object.on('click', () => {game.input.remove(object)})

▪️ Add rounded rect - 2nd version, with arc


Systems/App
	Input
	Sound
	Timer
	Tween
	Loader

Math
	2D
	3D
	common

Textures
	Texture
	RenderTexture
	DataTexture
	UVs

Objects
	Lights
	Camera
	Mesh
	Sprite
		enabledToWorldSpace
	Text
		enabledToWorldSpace
	Scene
	    - isScene
		- is3D
		- is2D
	Screen - для 3D
		enabledToWorldSpace
		toWorldSpace
		geometry
		material
	Canvas - для 3D
		enabledToWorldSpace

		- most probvbale canvas will work based on Sprite 3D objetc - with texture and simple, plane geometry. Material - with RenderTarget texture. Canvas can be created with Screen component in base - so to have 2D logic - as main logic. autoUpdate - shouls be presented, and should have false - as default value.


Materials
	Material

geometries


this.world = new World();
this.ui = new UI();

this.scene.add(this.world, this.ui)

this.renderer.render(this.scene, this.camera);

this.renderer.render(this.scene);


Renderers
	canvas
	webgl1