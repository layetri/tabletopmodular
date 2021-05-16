const mix = require('laravel-mix');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.webpackConfig({
//   devtool: 'cheap-source-map',
//   plugins: [
//     // new BugsnagSourceMapUploaderPlugin({
//     //   apiKey: '37f22e8498f30d988f9afaec82e94ba9',
//     //   overwrite: true
//     // })
//   ]
// });

mix.js('resources/js/app.js', 'public/js').vue().version();
mix.postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
    ]);
