export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function mergeObjects<T>(obj1: T, obj2: Partial<T>): T {
  return { ...obj1, ...obj2 };
}
