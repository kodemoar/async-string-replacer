# RegExp string-replacer for Webpack

Quoting [the doc on Asynchronous Loaders](https://webpack.js.org/api/loaders/#asynchronous-loaders):
> Loaders were originally designed to work in synchronous loader pipelines, like Node.js (using [`enhanced-require`](https://github.com/webpack/enhanced-require)), and asynchronous pipelines, like in Webpack. However, since expensive synchronous computations are a bad idea in a single-threaded environment like Node.js, we advise making your loader asynchronous if possible. Synchronous loaders are ok if the amount of computation is trivial.

## Install
```bash
$ npm i -D async-string-replacer
```

## Usage
In `webpack.config.js` add the loader right before the final processor like `babel-loader`.

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        'babel-loader',
        {
          loader: 'async-string-replacer',
          options: {
            configFile: path.resolve(__dirname, './src/your.config.js')
          }
        }
      ],
      include: [
        path.resolve(__dirname, 'src/') // Leave out node_modules
      ]
    },
    //...
  ]
}
```

Where `your.config.js` contains the RegExp rules for the string replacements. For example the following pattern allows you to MD5 hash all [Vue.js custom event][vue_ce] names (for whatever reason that is):

```js
const md5 = require('md5');

module.exports = [
  {
    pattern: /(?<=\$(emit|on|once|off)\(')\S+(?=')/ig,
    replacement: md5
  },
  
  // More rules here
]
```

|Before|After|
|------|-----|
| `vm.$emit('routes:changed');` | `vm.$emit('fe288a6cad4b10b92fdff65256df6713');` |


[vue_ce]: https://vuejs.org/v2/guide/components-custom-events
