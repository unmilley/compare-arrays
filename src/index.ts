type ObjectUnknown = { [key: string]: unknown };

type ComparisonOptions = Partial<{
  /**
   * Will be returned as much as added and deleted
   *
   * @default false
   */
  withCounter: boolean;
}>;

type CompareArraysReturn = boolean | { added: number; deleted: number };

function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
): boolean;
function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
  options: ComparisonOptions,
): { added: number; deleted: number };

function compareArrays<T extends ObjectUnknown>(
  oldArray: T[],
  newArray: T[],
  options: ComparisonOptions = {},
): CompareArraysReturn {
  const { withCounter = false } = options;

  const serialize = (obj: T): string => {
    const sortedObj: ObjectUnknown = {};
    for (const key of (Object.keys(obj) as Array<keyof T>).sort()) {
      sortedObj[key as string] = obj[key];
    }

    return JSON.stringify(sortedObj);
  };

  const oldSet = new Set(oldArray.map(serialize));
  const newSet = new Set(newArray.map(serialize));

  const added = [...newSet].filter((x) => !oldSet.has(x)).length;
  const deleted = [...oldSet].filter((x) => !newSet.has(x)).length;

  if (withCounter) {
    return { added, deleted };
  }

  return added === 0 && deleted === 0;
}

export { compareArrays };
