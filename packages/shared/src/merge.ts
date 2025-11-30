type Primitive = string | number | boolean | null | undefined | symbol | bigint;

type DeepMergeTwo<T, U> = T extends Primitive | unknown[]
  ? U
  : U extends Primitive | unknown[]
    ? U
    : T extends Record<string, unknown>
      ? U extends Record<string, unknown>
        ? {
            [K in keyof T | keyof U]: K extends keyof U
              ? K extends keyof T
                ? DeepMergeTwo<T[K], U[K]>
                : U[K]
              : K extends keyof T
                ? T[K]
                : never;
          }
        : U
      : U;

type DeepMergeAll<T extends unknown[]> = T extends [
  infer First,
  infer Second,
  ...infer Rest,
]
  ? DeepMergeAll<[DeepMergeTwo<First, Second>, ...Rest]>
  : T extends [infer Only]
    ? Only
    : Record<string, unknown>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeTwo<T, U>(target: T, source: U): DeepMergeTwo<T, U> {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return source as DeepMergeTwo<T, U>;
  }

  const result = { ...target } as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = mergeTwo(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result as DeepMergeTwo<T, U>;
}

export function merge<T extends unknown[]>(...objects: T): DeepMergeAll<T> {
  return objects.reduce(
    (acc, obj) => mergeTwo(acc, obj),
    {},
  ) as DeepMergeAll<T>;
}
