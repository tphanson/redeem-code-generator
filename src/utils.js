var crypto = require('crypto');
var ethUtil = require('ethereumjs-util');

var Util = function () { }

Util.rand = function (bits) {
  bits = bits ? bits : 256;
  var randomByte = crypto.randomBytes(Math.floor(bits / 8));
  var randomBN = new ethUtil.BN(randomByte);
  var randomNum = randomBN.toString();
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