export const moveItem = (array: any[], indexA: number, indexB: number) => {
  // Check if indices are valid
  if (
    indexA < 0 ||
    indexA >= array.length ||
    indexB < 0 ||
    indexB >= array.length
  ) {
    return array;
  }
  // Remove the item from indexA
  const [item] = array.splice(indexA, 1);
  // Insert the item at indexB
  array.splice(indexB, 0, item);
  return array;
};
export const filterByArray = (arrayA: any[], arrayB: any[], field: string) => {
  if (arrayB.length > 0) {
    const setToFilter = new Set(arrayB.map((row) => row[field]));
    return arrayA.filter((row) => !setToFilter.has(row[field]));
  }
  return arrayA;
};
export const deduplicateArray = (array: any[], field: string) => {
  return array.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t[field] === obj[field]),
  );
};
export const chunkArray = (array: any[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};
export const sortBy = (array: any[], field: string, orderBy: string) => {
  if (
    field !== undefined &&
    field !== '' &&
    orderBy !== undefined &&
    orderBy !== ''
  ) {
    return array.sort((a, b) => {
      if (orderBy.toLowerCase() === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] > b[field] ? -1 : 1;
    });
  }
  return array;
};
export const simpleFilter = (
  array: any,
  field: string,
  searchString: string,
) => {
  if (searchString !== undefined && searchString !== '') {
    return array.filter(
      (row: any) =>
        row[field] !== undefined &&
        row[field].toLowerCase().includes(searchString.toLowerCase()),
    );
  }
  return array;
};
export const unionBy = (arrayA: any[], arrayB: any[], field: string) => {
  const map = new Map();
  // Add items from arrayA to the map
  arrayA.forEach((item) => {
    map.set(item[field], item);
  });
  // Merge items from arrayB, prioritizing them if they exist in both arrays
  arrayB.forEach((item) => {
    map.set(item[field], item); // This will overwrite items from arrayA if they exist
  });
  // Convert the map back to an array
  return Array.from(map.values());
};
const flattenObject = (obj: any, prefix: string = '') => {
  const flattened: any = {};

  for (const key in obj) {
    if (obj[key]) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else {
        flattened[newKey] = obj[key];
      }
    }
  }

  return flattened;
};
