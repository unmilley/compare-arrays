type ObjectUnknown = { [key: string]: unknown };

export const serialize = <T extends ObjectUnknown>(obj: T): string => {
  const sortedObj: ObjectUnknown = {};
  for (const key of (Object.keys(obj) as Array<keyof T>).sort()) {
    sortedObj[key as string] = obj[key];
  }

  return JSON.stringify(sortedObj);
};

export const deserialize = <T>(serialized: string): T => {
  const parsed = JSON.parse(serialized);
  const result: ObjectUnknown = {};

  for (const key in parsed) {
    result[key] = parsed[key];
  }

  return result as T;
};
