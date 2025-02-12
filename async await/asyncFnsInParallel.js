// Problem Statement (Execute Async Functions in Parallel)

// Implement a function that takes a list of async functions as input
// and execute tthe input tasks in parallel i.e all at once and invokes
// the callback after every task is finished

const asyncTask = function () {
  const time = Math.floor(Math.random() * 10);  
  return function (callback) {
    setTimeout(() => {
      callback(`Async Task with time ${time}`);
    }, time * 100);
  };
};

const promises = [asyncTask(), asyncTask(), asyncTask()];

function asyncParallel(promises, callback) {
  const result = [];

  let completedTasks = 0;

  promises.forEach((asyncTask) => {
    asyncTask((res) => {
      result.push(res);

      completedTasks++;

      if (completedTasks >= promises.length) callback(result);
    });
  });
}

asyncParallel(promises, (result) => {
  console.log("result is ",result);
});
