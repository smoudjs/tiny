const argvOptions = {
	'port': false,
	'--test': false
};

let scene = null;

for (let i = 2; i < process.argv.length; i++) {
	let key = process.argv[i];
	let value = true;

	const splitted = key.split('=');

	if (splitted.length > 1) {
		key = splitted[0];
		value = splitted[1];
	}

	if (argvOptions[key] !== undefined) {
		argvOptions[key] = value;
	} else if (!scene) scene = key;
}

console.log(argvOptions);

argvOptions.scene = scene;

module.exports = argvOptions;
