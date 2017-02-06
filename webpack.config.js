/**
 * Created by Administrator on 2017/1/8.
 */
var webpack = require('webpack');
module.exports = {

    entry: [
        'webpack/hot/only-dev-server',
        "./public/js/main.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
/* --content-base './views/'webpack ÅäÖÃ¸ùÂ·¾¶ */
