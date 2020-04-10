const path = require('path');

module.exports = {
    entry: './out/js/client/client.js',
    output: {
        filename: 'client.js',
        path: path.resolve(__dirname, 'out/static/js')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};