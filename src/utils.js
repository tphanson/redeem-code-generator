var kamUtil = require('@kambria/kambria-util');

var Util = function () { }

Util.splitSig = function (sig) {
  if (typeof sig !== 'string') throw new Error('Function only excepts string.');
  sig = kamUtil.hex.unpadHex(sig);
  var r = kamUtil.hex.padHex(sig.slice(0, 64));
  var s = kamUtil.hex.padHex(sig.slice(64, 128));
  var v = kamUtil.hex.padHex(sig.slice(128, 130));
  return { r, s, v };
}

module.exports = Util;