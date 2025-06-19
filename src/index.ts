import { deserialize, serialize } from "./serialize";

type ObjectUnknown = { [key: string]: unknown };
type ArrayUnknown<T> = (T extends object ? ObjectUnknown : unknown)[];

type OptionWithCounter = Partial<{
  /**
   * Will be returned as much as added and deleted
   *
   * @default false
   */
  withCounter: boolean;
  withModified: undefined;
}>;
type OptionWithModified = Partial<{
  /**
   * An array will be returned, with additions and deletions
   *
   * @default false
   */
  withModified: boolean;
  withCounter: undefined;
}>;

type ComparisonOptions = OptionWithCounter | OptionWithModified;

type CompareArraysReturn<T = any> =
  | boolean
  | { added: number; deleted: number }
  | { added: T[]; deleted: T[] };

function isObjectArray(array: any[]): array is ObjectUnknown[] {
  return typeof array[0] === "object";
}

function compareArrays<T>(
  oldArray: ArrayUnknown<T>,
  newArray: ArrayUnknown<T>,
): boolean;
function compareArrays<T>(
  oldArray: ArrayUnknown<T>,
  newArray: ArrayUnknown<T>,
  options: OptionWithCounter,
): { added: number; deleted: number };
function compareArrays<T>(
  oldArray: ArrayUnknown<T>,
  newArray: ArrayUnknown<T>,
  options: OptionWithModified,
): { added: T[]; deleted: T[] };

function compareArrays<T>(
  oldArray: ArrayUnknown<T>,
  newArray: ArrayUnknown<T>,
  options: ComparisonOptions = {},
): CompareArraysReturn<T> {
  const withCounter = "withCounter" in options ? options.withCounter : false;
  const withModified = "withModified" in options ? options.withModified : false;

  const isOldObjectArray = isObjectArray(oldArray);
  const isNewObjectArray = isObjectArray(newArray);
  let added: unknown[];

  let deleted: unknown[];

  let addedLength = 0;
  let deletedLength = 0;

  if (isOldObjectArray && isNewObjectArray) {
    const oldSet = new Set(oldArray.map(serialize));
    const newSet = new Set(newArray.map(serialize));

    added = [...newSet].filter((x) => !oldSet.has(x));
    deleted = [...oldSet].filter((x) => !newSet.has(x));
  } else {
    const oldSet = new Set(oldArray) as Set<unknown>;
    const newSet = new Set(newArray) as Set<unknown>;

    added = [...newSet].filter((x) => !oldSet.has(x));
    deleted = [...oldSet].filter((x) => !newSet.has(x));
  }

  if (withModified) {
    const _added = isNewObjectArray
      ? added.map((v) => deserialize(v as string))
      : added;
    const _deleted = isOldObjectArray
      ? deleted.map((v) => deserialize(v as string))
      : deleted;
    return { added: _added as T[], deleted: _deleted as T[] };
  }
  addedLength = added.length;
  deletedLength = deleted.length;

  if (withCounter) {
    return { added: addedLength, deleted: deletedLength };
  }

  return addedLength === 0 && deletedLength === 0;
}

export { compareArrays };
