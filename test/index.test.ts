import { describe, expect, expectTypeOf, it, test } from "vitest";
import { compareArrays } from "../src";

const data1 = [{ name: "Alex" }, { name: "Tommy" }];
const data2 = [{ name: "Alex" }, { name: "Tommy" }];
const data3 = [{ name: "Elena" }, { name: "Jesse" }];
const data4 = [{ name: "Jesse" }, { name: "Elena" }];
const data5 = [{ name: "Alex" }, { name: "Elena" }];
const data6 = [1, 2, 3];
const data7 = [1, 2, 3];
const data8 = [1, 2, 3, 4];

describe.each([
  { a: data1, b: data2, expected: true },
  { a: data1, b: data3, expected: false },
  { a: data6, b: data7, expected: true },
])(`describe usual compare`, ({ a, b, expected }) => {
  test(`a: ${typeof a[0]}[] && b: ${typeof b[0]}[] => ${expected} `, () => {
    const res = compareArrays(a, b);
    expect(res).toBe(expected);
    expectTypeOf(res).toEqualTypeOf<boolean>();
  });
});

describe.each([
  {
    a: data2,
    b: data3,
    expected: { deleted: 2, added: 2 },
  },
  {
    a: data1,
    b: data5,
    expected: { deleted: 1, added: 1 },
  },
  {
    a: data6,
    b: data7,
    expected: { deleted: 0, added: 0 },
  },
  {
    a: data6,
    b: data8,
    expected: { deleted: 0, added: 1 },
  },
])(`describe withCounter compare`, ({ a, b, expected }) => {
  test(`a: ${typeof a[0]}[] && b: ${typeof b[0]}[] => ${JSON.stringify(expected)} `, () => {
    const res = compareArrays(a, b, { withCounter: true });
    expect(res).toEqual(expected);
    expectTypeOf(res).toEqualTypeOf<{ added: number; deleted: number }>();
  });
});

describe.concurrent(`describe withModified compare`, () => {
  it("compare object[]", () => {
    const expected = {
      deleted: [],
      added: [],
    };
    expect(compareArrays(data1, data2, { withModified: true })).toEqual(
      expected,
    );
  });
  it("compare object[]", () => {
    const expected = {
      deleted: [{ name: "Alex" }, { name: "Tommy" }],
      added: [{ name: "Elena" }, { name: "Jesse" }],
    };
    expect(compareArrays(data2, data3, { withModified: true })).toEqual(
      expected,
    );
  });
  it("compare number[]", () => {
    const expected = { deleted: [], added: [4] };
    expect(compareArrays(data7, data8, { withModified: true })).toEqual(
      expected,
    );
  });
});
