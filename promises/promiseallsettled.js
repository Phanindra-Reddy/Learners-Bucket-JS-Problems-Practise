const p1 = Promise.resolve("p1 resolved");
const p2 = Promise.reject("p2 reject");
const p3 = 12;
const p4 = new Promise((resolve, reject) =>
  setTimeout(reject("timeout promise", 100))
);

const promises = [p1, p2, p3, p4];

Promise.allSettled(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("error ", err));

//  Pollyfill for Promise.allSettled()

const myPromiseAllSettled = function (promises) {
  let res=[];
  let count = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          res[index] = {
            status: "fulfilled",
            value,
          };
          count+=1;

          if(count===promises.length) resolve(res)
        })
        .catch((error) => {
          res[index] = {
            status: "rejected",
            reason: error,
          };

          count += 1;

          if (count === promises.length) reject(res);
        });
    });
  });
};

myPromiseAllSettled(promises)
  .then((val) => console.log(val))
  .catch((err) => console.log("myPromiseAllSettled ", err));
