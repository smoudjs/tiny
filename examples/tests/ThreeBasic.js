
window["test.ThreeBasic"]  = {

	preload: function() {
		this.load.image("base", baseImage);
		this.load.atlas("atlas", atlas, atlas_data);

		// this.cache.image["key"]
		// this.cache.texture["key.1"];
		// this.cache.texture["key.frameName"];


		this.load.gltf("gltfTest", gltf, true, function(gltf) {
			gltf.scene.traverse(function(obj) {
				if (obj.isMesh) obj.geometry.computeVertexNormals();
			});
		});

		this.load.texture3d("base", baseImage);

		// this.cache.gltf["key"];
		// this.cache.texture3d["key"];
		// this.cache.mesh3d["key.meshName"];
		// this.cache.animation3d["key.animationName"];
	},

	create: function() {

		/**
		 * Adding directional light to scene
		 */
		var light = new THREE.DirectionalLight(0xffffff, 0.8);
		light.position.set(15, 59, 53);
    	light.lookAt(0, 0, 0);
		this.scene.add(light);


		/**
		 * Adding ambient light to scene
		 */
		var alight = new THREE.AmbientLight(0xffffff, 0.3);
		this.scene.add(alight);


		/**
		 * Creating test mesh, with texture.map from cache atlas image, 
		 * Playing with texture frame data via offset property
		 */
		var mesh = this.mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
			// color: "#ff4534",
			map: new THREE.Texture(this.cache.image["atlas"])
		}));
		// mesh.scale.set(3,3,3);
		var map = window.texture = mesh.material.map;
		map.repeat.set(0.5, 0.5);
		// map.offset.set(0, 0); // BR
		// map.offset.set(0.5, 0); // MM
		map.offset.set(0, 0.5); // SB
		// map.offset.set(0.5, 0.5); // IH
		map.encoding = THREE.sRGBEncoding;
		map.needsUpdate = true;
		this.scene.add(mesh);


		/**
		 * Adding scene from cache
		 */
		var car = this.car = this.cache.gltf["gltfTest"].scene;
		var material = new THREE.MeshLambertMaterial({
			map: this.cache.texture3d["base"]
		});
		car.traverse(function(obj) {
			if (obj.isMesh) obj.material = material;
		})
		car.position.x = 3;
		car.position.z = 3;
		this.scene.add(car);

		/**
		 * Creating new mesh with geometry from cached mesh
		 */
		var mesh2 = this.mesh2 = new THREE.Mesh(this.cache.mesh3d["gltfTest.cabin"].geometry, mesh.material);
		mesh2.rotation.z = -Math.PI / 2;
		mesh2.position.x = -3;
		mesh2.position.z = -3;
		this.scene.add(mesh2);


		/**
		 * Getting ang clonning mesh from cache
		 */
		this.scene.add(game.cache.mesh3d["gltfTest.cabin"].clone());


		/**
		 * Creating new Tiny.Text3D object which is avaiable on three plugin
		 */
		var text = new Tiny.Text3D("Hello World", {
            font: 'bold 30pt Courier',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 100,
            align: 'center',
            size: 4
        });
        this.scene.add(text);

	},

	update: function(time, delta) {
		this.mesh.rotation.x += delta * 0.001
		this.mesh2.rotation.z += delta * 0.001
		this.car.rotation.y += delta * 0.001
		this.mesh.position.x = Math.sin( time * 0.0001 )
		this.mesh.position.z = 1 + Math.sin( time * 0.0001 )
	}
}
