const { forEach } = require("../index");
const assert = require("assert");

let numbers;

beforeEach(() => {
  numbers = [1, 2, 3];
});

it("should sum an array", () => {
  const number = [1, 2, 3];

  let total = 0;

  forEach(number, (value) => {
    total += value;
  });

  assert.strictEqual(total, 6);

  numbers.push(99);
  numbers.push(99);
  numbers.push(99);
});

it("beforeEach is ran each time", () => {
  assert.strictEqual(numbers.length, 3);
});
