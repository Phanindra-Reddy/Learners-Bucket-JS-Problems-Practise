const p1 = Promise.reject("p1 rejected");
const p2 = Promise.resolve("p2 resolved");
const p3 = 12;
const p4 = new Promise((resolve, reject) =>
  setTimeout(resolve("p4 timeout promise", 100))
);

const promises = [p1, p2, p3, p4];

// return first fulfilled promise
Promise.race(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("error ", err));

// Polyfill for Promise.race()

const myPromiseRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then(resolve, reject)
        .catch(reject);
    });
  });
};


myPromiseRace(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("error from custom race", err));
