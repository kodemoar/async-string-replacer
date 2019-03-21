'use strict';

const loaderUtils = require('loader-utils');

function asyncReplacer(content) {
  const done = this.async();
  const option = loaderUtils.getOptions(this);

  const rules = require(option.configFile);
  let result = content;

  if (rules.length) {
    for (let { pattern, replacement } of rules) {
      if (pattern.test(result)) {
        result = result.replace(pattern, replacement);
      }
    }
  }

  done(null, result);
}

module.exports = asyncReplacer;
