## Introduction

This lib can be used for the Token Distribution Portal to generate redeem code.

## Prerequisite

Install node modules

```
npm install --save @kambria/redeem-code-generator
```

## How to test?

Stay at the root folder and run this command:

```
npm test
```

## How to use for production?

### Using in Nodejs:

```
var rcg = require('@kambria/redeem-code-generator');
```


### Using in React:

```
import rcg from '@kambria/redeem-code-generator';
```

### Methods

* priv2Addr(priv): convert private key to address

  ```
  Params:

  * priv: <string> Signer's private key

  Outputs:

  * addr: <string> The relevant address
  ```

* genUnlocktime(sencondsHaveToWaitFor): generate normalized unlocktime from the current moment

  ```
  Params:

  * sencondsHaveToWaitFor: <number> The number of senconds that users have to wait till available time to redeem

  Outputs:

  * unlocktime: <string> The normalized unlocktime
  ```

* genRedeemCode(user, value, unlockTimestamp, priv): generate redeem code

  ```
  Params:

  * user: <string> Investor's address
  * value: <string> Number of token
  * unlockTimestamp: <string> Timestamp of code unlock (in seconds)
  * priv: <string> Signer's private key

  Outputs:

  * code: <object> Redeem code
  ```

* verifyRedeemCode(signerAddr, code): verify redeem code

  ```
  Params:

  * signerAddr: <string> Signer's address
  * code: <object> Redeem code (genRedeemCode returned)

  Outputs:

  * valid: <boolean> true/false
  ```

### Examples

```
var generator = require('@kambria/redeem-code-generator');

// Generate code
const PRIVATE_KEY = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
const USER = '0x627306090abab3a6e1400e9345bc60c78a8bef57';
const VALUE = '5000000000000000000000';
const UNLOCKTIME = '1549694770';

var code = generator.genRedeemCode(USER, VALUE, UNLOCKTIME, PRIVATE_KEY);


// Verify code
const ADDRESS = '0x627306090abab3a6e1400e9345bc60c78a8bef57';
var ok = generator.verifyRedeemCode(ADDRESS, code);
```

## Cheatsheet

| # | Commands | Descriptions |
| :-: | - | - |
| 1 | `npm install` | Install module packages |
| 5 | `npm run build` | Build javascript libraries for contracts |
| 6 | `npm test` | Run mocha unit tests |