// Anatomy of reduce

let arr = [];
const initialvalue = 0;

const callbackFn = () => {};

arr.reduce(callbackFn, initialvalue);

// callback function
arr.reduce((prevValue, currValue, currentIndex, arr) => {
  const nextValue = prevValue + currValue;
  return nextValue;
}, initialvalue);

// arr.reduce used for operations aggregation(combining into a single unit), segregation, running things in sequence/series etc

// callback func accepts four parameters

// 1. previous value - the value returned from the last callof the same function or the initial value at the beginning
// 2. current value - current value of the array
// 3. current index position of the iteration
// 4. array - the array itself

// OPERATIONS

// 1. Aggregation (combining into a single unit or single value)

let nums = [1, 2, 3, 4];

const sum = nums.reduce((prev, curr) => {
  return prev + curr;
});

console.log(sum);

// 2. Segregation (group certain set of values depending on our requirements)

const nums2 = [1.1, 1.2, 1.3, 2.2, 2.3, 2.4];

const segregate = nums2.reduce((prev, curr) => {
  const floored = Math.floor(curr);

  if (!prev[floored]) {
    prev[floored] = [];
  }

  prev[floored].push(curr);

  return prev;
}, {});

console.log(segregate);

// 3. Run in sequence/series (example for pipe - executes left to right and compose - executes right to left fns)

function uppercase(str) {
  return str.toUpperCase();
}

const reverse = (str) => {
  return str.split("").reverse().join("");
};

const append = (str) => {
  return "Hello " + str;
};

const fns = [uppercase, reverse, append];

const iniValue = "ardninahp";

const seq = fns.reduceRight((prevVal, currFn) => {
  const newValue = currFn(prevVal);
  return newValue;
}, iniValue);

console.log(seq);

// run a promise in a sequence

const asyncTask = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completing ${time}`);
    }, 100 * time);
  });
};

const promises = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(7),
  asyncTask(2),
  asyncTask(5),
];

const asyncSeriesExecutor = function (promises) {
  promises.reduce((acc, curr) => {
    return acc.then(() => {
      return curr.then((val) => console.log(val));
    });
  }, Promise.resolve());
};

asyncSeriesExecutor(promises);
