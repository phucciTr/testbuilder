// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.

  let firstDigit = Number(cardNumber[0]);
  let secondDigit = Number(cardNumber[1]);

  // diner's / maestro
  if (cardNumber.length === 14) {
    if (firstDigit === 3 && secondDigit === 8 || secondDigit === 9) {
      return 'Diner\'s Club';

    // maestro
    } else {
      return checkPrefix(cardNumber);
    }

  // american / maestro
  } else if (cardNumber.length === 15) {
    if (firstDigit === 3 && secondDigit === 4 || secondDigit === 7) {
      return 'American Express';

    // maestro
    } else {
      return checkPrefix(cardNumber);
    }

  // visa / master / discover/ maestro
    // (length(16) = visa = master = discover = maestro),
    // (length(19, 13) = visa = discover = maestro),
  } else if (cardNumber.length === 16 || cardNumber.length === 19 || cardNumber.length === 13) {

    // visa
    if (firstDigit === 4) {
      return 'Visa';

    // master
    } else if (firstDigit === 5 && (secondDigit >= 1 && secondDigit <= 5)) {
      return 'MasterCard';

    // discover / maestro
    } else {
      return checkPrefix(cardNumber);
    }

  // maestro
  } else if (cardNumber.length >= 12 && cardNumber.length <= 19) {
    return checkPrefix(cardNumber);
  }
};


// Helper function
var checkPrefix = function(cardNumber) {

  let firstDigit = Number(cardNumber[0]);
  let secondDigit = Number(cardNumber[1]);
  let thirdDigit = Number(cardNumber[2]);
  let fourthDigit = cardNumber[3];

  let prefixes = [];
  let prefix = '';

  // 6 & 5
  if (firstDigit === 6 && secondDigit === 5) {
    return 'Discover';

  // first 4 digits
  } else {
    prefixes.push(firstDigit, secondDigit, thirdDigit, fourthDigit);
    prefix = prefixes.join('');

    if (prefix === '6011') {
      return 'Discover';

    } else if (prefix === '5018' || prefix === '5020' ||
               prefix === '5038' || prefix === '6304') {
      return 'Maestro';

    // first 3 digits
    } else {
      prefixes.pop();
      prefix = Number(prefixes.join(''));

      if (prefix >= 644 && prefix <= 649) {
        return 'Discover';
      }
    }
  }

};

// Assertion
var assertEqual = function(actual, expected, testName) {
  if (actual === expected) {
    console.log('passed');
  } else {
    console.log('failed [' + testName + '] expected "' + expected + '" but got "' + actual + '"');
  }
};