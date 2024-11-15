import { hasString } from '../../utils/general.util';

const setIfFilter = (options: any[], value: string) => {
  return !options.some((option: any): boolean => {
    if (option.children) {
      return setIfFilter(option.children, value);
    }
    return option.value === value;
  });
};
export const setFilterOptions = (options: any[], searchString: string) => {
  if (setIfFilter(options, searchString)) {
    return options.filter((option) => {
      if (option.children) {
        option.children = setFilterOptions(option.children, searchString);
        if (option.children.length > 0) {
          return true;
        }
      } else if (
        hasString(option.label, searchString) ||
        hasString(option.value, searchString)
      ) {
        return true;
      }
      return false;
    });
  }
  return options;
};
export const sendSelectedValue = (options: any[], value: string) => {
  console.log(value);
  let selectedOption = {};
  options.forEach((option) => {
    if (option.value === value) {
      selectedOption = option;
    }
    if (option.children) {
      const response: any = sendSelectedValue(option.children, value);
      if (response?.value === value) {
        selectedOption = response;
      }
    }
  });
  return selectedOption;
};
