// Problem Statement (Execute Async Functions in Series)

// Implement a function that takes a list of async functions as input
// and execute them in a series that is one at a time. The next task is
// executed only when the prevoius task is completed.

const asyncTask = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Async Task with time ${time}`);
    }, time * 100);
  });
};

const promises = [asyncTask(3), asyncTask(1), asyncTask(2)];

// We have 3 different approaches to solve this problem

// async/await
// recurrsion
// array.reduce()

// Approach 1 - Using async/await

async function ExecuteFnsInSeriesAsyncAwait(promises) {
  for (let promise of promises) {
    try {
      const res = await promise;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

//ExecuteFnsInSeriesAsyncAwait(promises);

// Approach 2 - Using Recurssion

async function ExecuteFnsInSeriesRecurssion(promises) {
  let promise = promises.shift();

  promise.then((res) => {
    console.log(res);

    if (promises.length > 0) {
      ExecuteFnsInSeriesRecurssion(promises);
    }
  });
}

//ExecuteFnsInSeriesRecurssion(promises);

// Approach 2 - using array.reduce()

async function ExecuteFnsInSeriesArrayReduce(promises) {
  promises.reduce((prevPm, currPm) => {
    return prevPm.then((data) => {   
      return currPm.then((res) => console.log(res));
    });
  }, Promise.resolve(42));
}

ExecuteFnsInSeriesArrayReduce(promises);
