import { expect, test } from "vitest";
import { compareArrays } from "../src";

const data1 = [{ name: "Alex" }, { name: "Tommy" }];
const data2 = [{ name: "Alex" }, { name: "Tommy" }];
const data3 = [{ name: "Elena" }, { name: "Jesse" }];
const data4 = [{ name: "Jesse" }, { name: "Elena" }];
const data5 = [{ name: "Alex" }, { name: "Elena" }];

test("Simple comparison (1)", () => {
  expect(compareArrays(data1, data2)).toBeTruthy();
});
test("Simple comparison (2)", () => {
  expect(compareArrays(data1, data3)).toBeFalsy();
});
test("Simple comparison (3)", () => {
  expect(compareArrays(data3, data4)).toBeTruthy();
});

test("Getting change counters (1)", () => {
  expect(compareArrays(data2, data3, { withCounter: true })).toMatchObject({
    deleted: 2,
    added: 2,
  });
});
test("Getting change counters (2)", () => {
  expect(compareArrays(data1, data5, { withCounter: true })).toMatchObject({
    deleted: 1,
    added: 1,
  });
});
test("Getting change counters (3)", () => {
  expect(compareArrays(data1, data2, { withCounter: true })).toMatchObject({
    deleted: 0,
    added: 0,
  });
});

test("Explicitly specifying withoutCounter (1)", () => {
  expect(compareArrays(data1, data2, { withCounter: false })).toBeTruthy();
});
test("Explicitly specifying withoutCounter (2)", () => {
  expect(compareArrays(data1, data3, { withCounter: false })).toBeFalsy();
});
test("Explicitly specifying withoutCounter (3)", () => {
  expect(compareArrays(data3, data4, { withCounter: false })).toBeTruthy();
});

test("Explicit indication of changes (1)", () => {
  expect(compareArrays(data2, data3, { withModified: true })).toMatchObject({
    deleted: [{ name: "Alex" }, { name: "Tommy" }],
    added: [{ name: "Elena" }, { name: "Jesse" }],
  });
});
test("Explicit indication of changes (2)", () => {
  expect(compareArrays(data1, data5, { withModified: true })).toMatchObject({
    deleted: [{ name: "Tommy" }],
    added: [{ name: "Elena" }],
  });
});
test("Explicit indication of changes (3)", () => {
  expect(compareArrays(data1, data2, { withModified: true })).toMatchObject({
    deleted: [],
    added: [],
  });
});
