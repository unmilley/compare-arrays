type ObjectUnknown = { [key: string]: unknown };

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

function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
): boolean;
function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
  options: OptionWithCounter,
): { added: number; deleted: number };
function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
  options: OptionWithModified,
): { added: T[]; deleted: T[] };

function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
  options: ComparisonOptions = {},
): CompareArraysReturn<T> {
  const withCounter = "withCounter" in options ? options.withCounter : false;
  const withModified = "withModified" in options ? options.withModified : false;

  const serialize = (obj: T): string => {
    const sortedObj: ObjectUnknown = {};
    for (const key of (Object.keys(obj) as Array<keyof T>).sort()) {
      sortedObj[key as string] = obj[key];
    }

    return JSON.stringify(sortedObj);
  };

  const oldSet = new Set(oldArray.map(serialize));
  const newSet = new Set(newArray.map(serialize));

  const added = [...newSet].filter((x) => !oldSet.has(x));
  const deleted = [...oldSet].filter((x) => !newSet.has(x));

  const addedLength = added.length;
  const deletedLength = deleted.length;

  if (withModified) {
    const deserialize = <T>(serialized: string): T => {
      const parsed = JSON.parse(serialized);
      const result: ObjectUnknown = {};

      for (const key in parsed) {
        result[key] = parsed[key];
      }

      return result as T;
    };
    return {
      added: added.map(deserialize) as T[],
      deleted: deleted.map(deserialize) as T[],
    };
  }

  if (withCounter) {
    return { added: addedLength, deleted: deletedLength };
  }

  return addedLength === 0 && deletedLength === 0;
}

export { compareArrays };
