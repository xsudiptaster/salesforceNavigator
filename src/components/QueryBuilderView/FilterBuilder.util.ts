import { showNotification } from '../../utils/general.util';

export const getFilterableFields = (treeData: any[]) => {
  return treeData.filter((node) => {
    if (node.children) {
      node.children = getFilterableFields(node.children);
    }
    return node.filterable;
  });
};
const getFormatedValues = (condition: any) => {
  if (
    condition.field.type === 'double' ||
    condition.field.type === 'int' ||
    condition.field.type === 'percentage'
  ) {
    return condition.value !== '' ? condition.value : null;
  }
  if (condition.operator === 'Like') {
    return condition.value !== '' ? `'%${condition.value}%'` : null;
  }
  return condition.value !== '' ? `'${condition.value}'` : null;
};
const getConditionString = (condition: any) => {
  return `${condition.field.value} ${condition.operator} ${getFormatedValues(
    condition,
  )}`;
};
export const generateWhereClause = (conditions: any[], filterlogic: string) => {
  let tempFilterLogic = filterlogic;
  if (conditions.length > 0) {
    for (let i = conditions.length; i > 0; i -= 1) {
      const conditionString = getConditionString(conditions[i - 1]);
      tempFilterLogic = tempFilterLogic.replaceAll(
        i.toString(),
        conditionString,
      );
    }
  }
  return `WHERE ${tempFilterLogic}`;
};
const extractNumbers = (inputString: any) => {
  // Use regex to find all numbers in the string
  const numbers = inputString.match(/\d+/g);
  // Convert the matched strings to numbers
  return numbers ? numbers.map(Number) : [];
};

export const validateConditions = (conditions: any[], filterLogic: any) => {
  let result = true;
  conditions.forEach((condition, index) => {
    if (condition.field === '') {
      showNotification(
        true,
        `Please Select a field on row no ${(index + 1).toString()}`,
      );
      result = false;
    }
  });
  if (filterLogic === '') {
    showNotification(true, 'Please Enter a Filter Logic');
    result = false;
  }
  if (!result) {
    const filterNumbers = extractNumbers(filterLogic).sort();
    if (filterNumbers.length > 0) {
      if (filterNumbers[filterNumbers.length - 1] > conditions.length) {
        showNotification(true, 'Filter Logic contains numbers out of range');
        result = false;
      }
    }
  }
  return result;
};
