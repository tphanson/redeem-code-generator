var ethUtil = require('ethereumjs-util');
var ethAbi = require('ethereumjs-abi');

// user, value, unlockTimestamp, entropy
const TYPES = ['address', 'uint256', 'uint256', 'uint256'];

var Hasher = function () { }

Hasher.hash = function(...args) {
  var encodedMsg = ethAbi.rawEncode(TYPES, args);
  return ethUtil.keccak256(encodedMsg);
}

module.exports = Hasher;