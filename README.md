# RegExp string-replacer for Webpack

[![Package version][package-ver-image]](/) 
[![NPM unpublished][npm-image]](/)

Quoting the doc on [Asynchronous Loaders](https://webpack.js.org/api/loaders/#asynchronous-loaders):
> Loaders were originally designed to work in synchronous loader pipelines, like Node.js (using [`enhanced-require`](https://github.com/webpack/enhanced-require)), and asynchronous pipelines, like in Webpack. However, since expensive synchronous computations are a bad idea in a single-threaded environment like Node.js, we advise making your loader asynchronous if possible. Synchronous loaders are ok if the amount of computation is trivial.

## Install
```bash
$ npm i -D yst493/async-string-replacer
```

## Usage
In `webpack.config.js` add it up right before the last loader in the chain (e.g. `babel-loader`):

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        'babel-loader',
        {
          loader: 'async-string-replacer',
          options: {
            configFile: path.resolve(__dirname, './src/your.config.js')
          }
        }
      ]
    },
    //...
  ]
}
```

Where `your.config.js` is your dedicated config file containing all the RegExp rules for the string replacements. For example the following pattern allows you to [`md5`][npm-md5] hash all [Vue.js Custom Event][vue_ce] names (for whatever reason that is):

```js
module.exports = [
  {
    pattern: /(?<=\$(emit|on|once|off)\(')\S+(?=')/ig,
    replacement: require('md5')
  },
  
  // More rules here
]
```

| Raw | Hashed |
|-----|--------|
| `vm.$emit('routes:changed');` | `vm.$emit('fe288a6cad4b10b92fdff65256df6713');` |

Once configured and run, all files ending in `.js` (including `.vue` files, since they ultimately compile down to `.js`) will be processed by the loader, seaching up for these custom event names to hash.  

⚠ This is not meant for JS obfuscation of some sort, in which case you should instead use [Javascript obfuscator][npm-js-obfuscator] or [UglifyJS Webpack Plugin][npm-uglifyjs].

## License
[MIT](http://en.wikipedia.org/wiki/MIT_License)

[vue_ce]: https://vuejs.org/v2/guide/components-custom-events
[npm-image]: https://img.shields.io/badge/npm-unpublished-orange.svg
[package-ver-image]: https://img.shields.io/badge/version-1.0.0-blue.svg

[npm-uglifyjs]: https://www.npmjs.com/package/uglifyjs-webpack-plugin
[npm-js-obfuscator]: https://www.npmjs.com/package/javascript-obfuscator
[npm-md5]: https://www.npmjs.com/package/md5 "Message Digest 5 (one-way hash)"
