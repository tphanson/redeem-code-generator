var ethUtil = require('ethereumjs-util');
var kamUtil = require('@kambria/kambria-util');
var hasher = require('./hasher');
var signer = require('./signer');


var Generator = function () { }

Generator.priv2Addr = function (priv) {
  priv = ethUtil.toBuffer(kamUtil.hex.padHex(priv));
  var addr = ethUtil.privateToAddress(priv);
  return kamUtil.hex.padHex(ethUtil.bufferToHex(addr));
}

Generator.genRedeemCode = function (user, value, unlockTimestamp, priv) {
  priv = ethUtil.toBuffer(kamUtil.hex.padHex(priv));
  user = kamUtil.net.formalizeAddress(user);
  if (!user || !value || !unlockTimestamp || !priv) throw new Error('Invalid inputs');
  var entropy = kamUtil.secure.rand(256);
  var hash = hasher.hash(user, value, unlockTimestamp, entropy);
  var signedMsg = signer.sign(hash, priv);
  return {
    user: user,
    value: value,
    unlockTimestamp: unlockTimestamp,
    entropy: entropy,
    signedMsg: signedMsg
  };
}

Generator.returnSigner = function (code) {
  var hash = hasher.hash(code.user, code.value, code.unlockTimestamp, code.entropy);
  var address = signer.verify(hash, code.signedMsg);
  return address;
}

Generator.verifyRedeemCode = function (signerAddr, code) {
  var address = Generator.returnSigner(code);
  return address === signerAddr;
}

module.exports = Generator;