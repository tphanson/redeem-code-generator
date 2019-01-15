var ethUtil = require('ethereumjs-util');
var utils = require('./utils');
var hasher = require('./hasher');
var signer = require('./signer');


var Generator = function () { }

Generator.priv2Addr = function (priv) {
  priv = ethUtil.toBuffer(utils.padHex(priv));
  var addr = ethUtil.privateToAddress(priv);
  return utils.padHex(ethUtil.bufferToHex(addr));
}

Generator.genRedeemCode = function (user, value, unlockTimestamp, priv) {
  priv = ethUtil.toBuffer(utils.padHex(priv));
  var entropy = utils.rand(256);
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

Generator.verifyRedeemCode = function (signerAddr, code) {
  var hash = hasher.hash(code.user, code.value, code.unlockTimestamp, code.entropy);
  var address = signer.verify(hash, code.signedMsg);
  return address === signerAddr;
}

module.exports = Generator;