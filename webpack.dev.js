const config = {
    mode: "development",

    devtool: "inline-source-map",

    context: `${__dirname}`,

    entry: {
        "tiny": "./src/index.js",
        "tiny.mini": "./src/mini.js",
        "plugins/extra": "./plugins/extra",
        "plugins/particles": "./plugins/particles",
        "plugins/three": "./plugins/three"
        // 'particles_pack': './particles_pack.js',
    },

    output: {
        path: `${__dirname}/examples/libs/tiny`,
        filename: `[name].js`
    },

    plugins: [],

    stats: {
        colors: true
    }
};

module.exports = config;
