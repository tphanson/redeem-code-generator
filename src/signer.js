var ethUtil = require('ethereumjs-util');
var kamUtil = require('@kambria/kambria-util');
var util = require('./utils');

var Signer = function () { }

Signer.sign = function (hash, priv) {
  var signedMsg = ethUtil.ecsign(hash, priv, 0);
  var r = ethUtil.bufferToHex(signedMsg.r)
  var s = ethUtil.bufferToHex(signedMsg.s)
  var v = signedMsg.v.toString(16);
  return kamUtil.hex.mergeHex(r, s, v);
}

Signer.verify = function (hash, sig) {
  var { r, s, v } = util.splitSig(sig);
  hash = ethUtil.toBuffer(kamUtil.hex.padHex(hash));
  r = ethUtil.toBuffer(r);
  s = ethUtil.toBuffer(s);
  v = ethUtil.bufferToInt(ethUtil.toBuffer(v));
  var pub = ethUtil.ecrecover(hash, v, r, s, 0);
  var addr = ethUtil.pubToAddress(pub)
  return kamUtil.hex.padHex(ethUtil.bufferToHex(addr));
}

module.exports = Signer;