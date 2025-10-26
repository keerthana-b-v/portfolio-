// This 'imports' the add function from script1.js
const add = require('./script1.js'); // <-- THIS IS THE CHANGE

// This is the actual test
test('Check if 1 + 2 equals 3', () => {
  expect(add(1, 2)).toBe(3);
});