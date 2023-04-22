(function () {
	var script = document.createElement('script');

	script.onload = function () {
		var stats = new Stats();
		document.body.appendChild(stats.dom);
		requestAnimationFrame(function loop() {
			stats.update();
			requestAnimationFrame(loop);
		});
	};

	script.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
	document.head.appendChild(script);
})();

document.addEventListener('scroll', function () {
	window.game && window.game.input.updateBounds();
});

window.addEventListener('resize', function () {
	window.game && window.game.input.updateBounds();
});

window.config = {
	width: 640,
	height: 400
};

window.GLTFLoader = THREE.GLTFLoader;

window.initTest = function (states, is3D) {
	destroyGame();

	const container = document.getElementById('game-container');
	container.innerHTML = '';

	// var game;

	// if (!is3D) {
	// 	game = window.game = new Tiny.App2D(config.width, config.height, 'test-container', states);
	// } else {
	// 	game = window.game = new Tiny.App3D(config.width, config.height, 'test-container', states);
	// }

	var game = (window.game = new MyGame(config.width, config.height));

	game.once('postrender', () => {
		resizeCanvas(config.width, config.height);
	});
};

window.destroyGame = function () {
	if (window.game) {
		window.game.destroy();
		window.game = null;
	}
	const container = document.getElementById('game-container');
	container.style.minWidth = '640px';
	container.style.minHeight = '400px';
};

window.resizeCanvas = function (width, height) {
	if (window.game) {
		const container = document.getElementById('game-container');
		config.width = width || Math.floor(Math.random() * 400) + 400;
		config.height = height || Math.floor(Math.random() * 300) + 300;

		container.style.minWidth = '';
		container.style.minHeight = '';

		window.game.resize(config.width, config.height);
	}
};

window.addEventListener('load', function (argument) {
	ace.require('ace/ext/language_tools');

	var editor = ace.edit('editor');

	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true,
		copyWithEmptySelection: true
	});

	editor.setHighlightActiveLine(true);

	editor.session.on('changeMode', function (e, session) {
		if ('ace/mode/javascript' === session.getMode().$id) {
			if (!!session.$worker) {
				session.$worker.send('setOptions', [
					{
						esversion: 9,
						esnext: true
					}
				]);
			}
		}
	});

	editor.setTheme('ace/theme/monokai');
	editor.session.setMode('ace/mode/javascript');

	window.editor = editor;

	var is3D;

	window.initCode = function (name, _is3D) {
		is3D = _is3D;

		var codeEl = document.getElementById('code-el');
		var urlEl = document.getElementById('url-el');

		var url = 'https://github.com/peter-hutsul/h5tiny/blob/master/examples/tests/' + name + '.js';

		urlEl.innerHTML = url;
		urlEl.href = url;

		fetch('tests/' + name + '.js')
			.then((res) => {
				res.text().then((e) => {
					// var js = ace.createEditSession(e);
					// var css = ace.createEditSession(["some", "css", "code here"]);
					// // and then to load document into editor, just call
					// editor.setSession(js);
					editor.session.setValue(e);
					runCode();
					// editor.setValue(e);

					// editor.session.replace(editor.selection.getRange(), e);
				});
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	window.runCode = function () {
		var code = editor.getValue();

		code = '(function () {' + code + ';window.MyGame = MyGame;})()';

		var script = document.createElement('script');
		script.text = code;
		document.body.appendChild(script);

		initTest();
	};

	window.saveCode = function () {

		var link = document.createElement('a');
		var file = new Blob([editor.getValue()], { type: 'application/javascript' });
		link.href = URL.createObjectURL(file);
		link.download = 'MyGame.js';
		link.click();
		URL.revokeObjectURL(link.href);
	};

	document.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.key === 's') {
			// Prevent the Save dialog to open
			e.preventDefault();
			// Place your code here
			runCode();
		}
	});

	document.getElementById('resources-list').innerHTML = Object.keys(resources).join(", ");
});
