const promise = new Promise((resolve, reject) => {
    console.log("processing promise");
    
  setTimeout(() => {
    resolve("resolved");
  }, 200);
});

console.log(promise);

promise.then((val) => console.log(val)).catch((err) => console.log(err));

console.log(promise);
