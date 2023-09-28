import { describe, expect, test } from "vitest";

const add = (a, b) => {
  return a + b;
};

describe("test add function", () => {
  test("should return the sum of two numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  test("should return zero when adding zero to a number", () => {
    const result = add(10, 0);
    expect(result).toBe(10);
  });

  test("should return a negative number when adding a negative and a positive number", () => {
    const result = add(-5, 8);
    expect(result).toBe(3);
  });
});
