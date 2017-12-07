
var exec = require('cordova/exec');

var PLUGIN_NAME = 'MiHomePlugin';

var MiHomePlugin = {
  echo: function(phrase, cb) {
    console.log("Within the plugin www/plugin.js Call native: echo function");
    exec(cb, null, PLUGIN_NAME, 'echo', [phrase]);
  },
  getDate: function(cb) {
    console.log("Within the plugin www/plugin.js Call native");
    exec(cb, null, PLUGIN_NAME, 'getDate', []);
  }
};

module.exports = MiHomePlugin;
