var assert = require('assert');
var generator = require('../dist');

const ADDRESS = '0x627306090abab3a6e1400e9345bc60c78a8bef57';
const PRIVATE_KEY = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
const USER = '0x627306090abab3a6e1400e9345bc60c78a8bef5a';
const VALUE = '1000000000000000000'; // 1 KAT
const NOW = Math.ceil(Number(new Date()) / 1000);
const DURATION = 15; // in seconds
const UNLOCKTIME = (NOW + DURATION).toString();

var _CODE = null;

describe('Redeem code', function () {

  describe('priv2Addr()', function () {
    it('generate address from privatekey', function () {
      let addr = generator.priv2Addr(PRIVATE_KEY);
      assert.strictEqual(addr, ADDRESS);
    });
  });

  describe('genRedeemCode()', function () {
    it('should return an object', function () {
      let code = generator.genRedeemCode(USER, VALUE, UNLOCKTIME, PRIVATE_KEY);
      _CODE = code; // For testing next steps
      assert.strictEqual(code.user, USER);
      assert.strictEqual(code.value, VALUE);
      assert.strictEqual(code.unlockTimestamp, UNLOCKTIME);
      assert.notstrictEqual(code.entropy, null);
      assert.notstrictEqual(code.signedMsg, null);
    });
  });

  describe('verifyRedeemCode()', function () {
    it('should return true', function () {
      let ok = generator.verifyRedeemCode(ADDRESS, _CODE);
      assert.strictEqual(ok, true);
    });
  });
});

