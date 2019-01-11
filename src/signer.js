var ethUtil = require('ethereumjs-util');
var util = require('./utils');

var Signer = function () { }

Signer.sign = function (hash, priv) {
  var signedMsg = ethUtil.ecsign(hash, priv, 0);
  var r = ethUtil.bufferToHex(signedMsg.r)
  var s = ethUtil.bufferToHex(signedMsg.s)
  var v = signedMsg.v.toString(16);
  return util.mergeSig(r, s, v);
}

Signer.verify = function (hash, sig) {
  var { r, s, v } = util.splitSig(sig);
  hash = ethUtil.toBuffer(util.padHex(hash));
  r = ethUtil.toBuffer(util.padHex(r));
  s = ethUtil.toBuffer(util.padHex(s));
  v = ethUtil.bufferToInt(ethUtil.toBuffer(util.padHex(v)));
  var pub = ethUtil.ecrecover(hash, v, r, s, 0);
  var addr = ethUtil.pubToAddress(pub)
  return util.padHex(ethUtil.bufferToHex(addr));
}

module.exports = Signer;