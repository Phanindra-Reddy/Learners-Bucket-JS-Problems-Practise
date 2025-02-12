const p1 = Promise.reject("p1 resolved");
const p2 = Promise.reject("p2 reject");
const p3 = 12;
const p4 = new Promise((resolve, reject) =>
  setTimeout(reject("timeout promise", 100))
);

const promises = [p1, p2, p4];

// return first fulfilled promise
Promise.any(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("error ", err));

// if all promises are rejected
// Promise.any throws Aggregate Error

const promise1 = Promise.reject("hi");
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

const promises2 = [promise1, promise2, promise3];

Promise.any(promises2).then((value) => console.log(value));

// Expected output: "quick"

// Polyfill for Promise.any()

const myPromiseAny = function (promises) {
  let errors = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
          return;
        })
        .catch((err) => {
          errors[index] = err;

          if (errors.length === promises.length) {
            reject(
              "AggregatorError: All Promises were rejected" + `[${errors}]`
            );
          }
        });
    });
  });
};

myPromiseAny(promises)
  .then((val) => console.log("my promise.any ", val))
  .catch((err) => console.log("my custom promise.any error ", err));
