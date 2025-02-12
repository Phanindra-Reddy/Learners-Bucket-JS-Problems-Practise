// Regular Promise

const pm = new Promise((resolve, reject) => {
  let res = Math.random();

  if (res > 0.5) {
    resolve("Yes " + res);
  } else {
    resolve("No " + res);
  }
});

pm.then((val) => console.log(val))
  .catch((err) => console.log(err))
  .finally(() => {
    console.log("Finally executed");
  });

// Implementing Custom Promise

const pmStates = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
  SETTLED: 3,
};

class MyPromise {
  constructor(callback) {
    (this.state = pmStates.PENDING), (this.handlers = []);
  }
}

const promise = new MyPromise((_resolve, _reject) => {
  let res = Math.random();

  if (res > 0.5) {
    _resolve("Custom Yes " + res);
  } else {
    _reject("Custom No " + res);
  }
});

promise
  .then((val) => console.log(val))
  .catch((err) => console.log(err))
  .finally(() => {
    console.log("Custom Promise Finally executed");
  });

