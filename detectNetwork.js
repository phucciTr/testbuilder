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
    // (length(16) = visa = master = discover = maestro = union = switch),
    // (length(19, 13) = visa = discover = maestro = union = switch),
  } else if (cardNumber.length === 16 || cardNumber.length === 19 || cardNumber.length === 13) {

    // visa / switch
    if (firstDigit === 4) {
      return checkPrefix(cardNumber);

    // master
    } else if (firstDigit === 5 && (secondDigit >= 1 && secondDigit <= 5)) {
      return 'MasterCard';

    // discover / maestro
    } else {
      return checkPrefix(cardNumber);
    }

  // maestro / union / switch
  } else if (cardNumber.length >= 12 && cardNumber.length <= 19) {
    return checkPrefix(cardNumber);
  }
};


// Helper function
var checkPrefix = function(cardNumber) {

  let firstDigit = cardNumber[0];
  let secondDigit = cardNumber[1];
  let thirdDigit = cardNumber[2];
  let fourthDigit = cardNumber[3];

  let prefixes = [];

  if (firstDigit === '6' && secondDigit === '5') {
    return 'Discover';
  }

  prefixes.push(firstDigit, secondDigit, thirdDigit, fourthDigit);
  return checkFirstFourDigits(cardNumber, prefixes);
};

var checkFirstFourDigits = function(cardNumber, prefixes) {

  let prefix = prefixes.join('');

  if (prefix === '6011') {
    return 'Discover';

  } else if (prefix === '5018' || prefix === '5020' ||
             prefix === '5038' || prefix === '6304') {
    return 'Maestro';

  } else if (prefix === '6333' || prefix === '6759') {
    return 'Switch';

  } else if (prefix === '4903' || prefix === '4905' ||
             prefix === '4911' || prefix === '4936') {
    return 'Switch';

  } else if (prefix[0] === '4') {
    return 'Visa';

  } else if (Number(prefix) >= 6282 && Number(prefix) <= 6288) {
    return 'China UnionPay';

  } else {
    prefixes.pop();
    return checkFirstThreeDigits(cardNumber, prefixes);
  }
};

var checkFirstThreeDigits = function(cardNumber, prefixes) {

  let prefix = Number(prefixes.join(''));

  if (prefix >= 644 && prefix <= 649) {
    return 'Discover';

  } else if (prefix >= 624 && prefix <= 626) {
    return 'China UnionPay';

  } else {
    return checkFirstSixDigits(cardNumber, prefixes);
  }
};

var checkFirstSixDigits = function(cardNumber, prefixes) {
  let fifthDigit = cardNumber[4];
  let sixthDigit = cardNumber[5];
  let fourthDigit = cardNumber[3];

  prefixes.push(fourthDigit, fifthDigit, sixthDigit);
  let prefix = Number(prefixes.join(''));

  if (prefix >= 622126 && prefix <= 622925) {
    return 'China UnionPay';

  } else if (prefix === 633110 || prefix === 564182) {
    return 'Switch';
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

// Test Case
var actual = detectNetwork('4911288764029345');
var expected = 'Switch';
assertEqual(actual, expected, 'prefix = 4911, length = 16');

// 6333, or 6759
var actual = detectNetwork('6333288764029345');
var expected = 'Switch';
assertEqual(actual, expected, 'prefix = 6333, length = 16');

// 6282-6288
var actual = detectNetwork('6284268764029345');
var expected = 'China UnionPay';
assertEqual(actual, expected, 'prefix = 6284, length = 16');

// 624-626
var actual = detectNetwork('6261268764029345');
var expected = 'China UnionPay';
assertEqual(actual, expected, 'prefix = 626, length = 16');

// 622126-622925
var actual = detectNetwork('6221288764029345');
var expected = 'China UnionPay';
assertEqual(actual, expected, 'prefix = 622128, length = 16');

// 564182, 633110
var actual = detectNetwork('6331108764029345');
var expected = 'Switch';
assertEqual(actual, expected, 'prefix = 633110, length = 16');
