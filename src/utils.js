global.crypto = require('crypto'); // For generate cryptographycally secure-random number
var BigNumber = require('bignumber.js');

var Util = function () { }

Util.rand = function (bits) {
  var randomNum = BigNumber.random(Math.floor(bits / 4));
  randomNum = randomNum.toString().replace('0.', '');
  return randomNum;
}

Util.padHex = function (hex) {
  if (!hex) return null;
  if (Buffer.isBuffer(hex)) hex = hex.toString('hex');
  if (typeof hex !== 'string') return null;

  var pattern = /(^0x)/gi;
  if (pattern.test(hex)) {
    return hex;
  } else {
    return '0x' + hex;
  }
}

Util.unpadHex = function (hex) {
  if (!hex) return null;
  if (Buffer.isBuffer(hex)) hex = hex.toString('hex');
  if (typeof hex !== 'string') return null;

  var pattern = /(^0x)/gi;
  if (pattern.test(hex)) {
    return hex.replace('0x', '');
  } else {
    return hex;
  }
}

Util.mergeSig = function (...args) {
  var re = '';
  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'string') throw new Error('Function only excepts hex string.');
    re += Util.unpadHex(args[i]);
  }
  return Util.padHex(re);
}

Util.splitSig = function (sig) {
  if (typeof sig !== 'string') throw new Error('Function only excepts string.');
  sig = Util.unpadHex(sig);
  var r = sig.slice(0, 64);
  var s = sig.slice(64, 128);
  var v = sig.slice(128, 130);
  return { r, s, v };
}

module.exports = Util;