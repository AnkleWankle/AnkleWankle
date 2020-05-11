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
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                  // Disables attributes processing
                  attributes: true,
                },
            },
        ],
    },
};