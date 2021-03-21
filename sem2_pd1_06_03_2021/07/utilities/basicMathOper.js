"use strict";
const funcs = {
  "+": (acc, curVal) => {
    return acc + curVal;
  },
  "-": (acc, curVal) => {
    return acc - curVal;
  },
  "*": (acc, curVal) => {
    return acc * curVal;
  },
  "/": (acc, curVal) => {
    return acc / curVal;
  },
};

/**
 * Array<string> - math operations available in the module
 */
const availableMathOpers = [];

for (let mathOper of Object.keys(funcs)) {
  availableMathOpers.push(mathOper);
}

/**
 * performs one of 4 basic mathematical operations on numbers
 * @param {string} operType - "+"|"-"|"*"|"/"
 * @return {number} result of such operation
 */
function perfMathOper(operType, ...nums) {
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    result = funcs[operType](result, nums[i]);
  }
  return result;
}

module.exports = { perfMathOper, availableMathOpers };
