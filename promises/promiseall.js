const p1 = Promise.resolve("p1 resolved");
const p2 = Promise.reject("p2 reject");
const p3 = 12;
const p4 = new Promise((resolve, reject) =>
  setTimeout(resolve("timeout promise", 100))
);

const promises = [p1, p2, p3, p4];

Promise.all(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("error ", err));

//  Polyfill for Promise.all()

const myPromiseAll = function (promises) {
  let ans = [];
  let completedpromises = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((val) => {
          ans[index] = val;
          completedpromises += 1;

          if (completedpromises === promises.length) {
            resolve(ans);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

myPromiseAll(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("error ", err));

