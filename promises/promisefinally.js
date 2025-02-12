// The finally() method of a Promise schedules a function, the callbakc function,
// to be called when the promise is settled.
// Like .then(), .catch(), it immediately returns an equivalent Promise object,
// allowing you to chain calls to another promise method,
// an operation called composition.

//Example
function checkEmail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Mail has arrived");
    } else {
      reject(new Error("Failed to arrive"));
    }
  });
}

checkEmail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => console.log("Experiment completed."));

// Polyfill for Promise.finally()

Promise.prototype.myFinally = function (cb) {
  if (typeof cb !== "function") {
    return this.then(cb, cb);
  }

  const P = this.constructor || Promise;

  return this.then(
    (val) => P.resolve(cb).then(() => val),
    (err) =>
      P.resolve(cb).then(() => {
        throw err;
      })
  );
};

checkEmail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.log(err);
  })
  .myFinally(() => {
    console.log("My Finally Experiment completed.");
  });
