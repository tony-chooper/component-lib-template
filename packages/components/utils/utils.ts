
// 实现 isNil
export const isNil = (value: any) => value === null || value === undefined;

// 实现 debounce
export const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};




