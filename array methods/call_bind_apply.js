


function getName(age, city) {
  console.log(`Hi, this is ${this.name}, and I'm ${age}, form ${city}`);
}

let obj1 = { name: "Phani" };
let obj2 = { name: "Siva" };

getName.call(obj1, 25, "HNK");

// Polyfill for call method

Function.prototype.myCall = function (context, ...args) {
  // solution 1

  // context.myFn = this;
  // context.myFn(...args);

  // solution 2
  let currContext = context;
  let random = Math.random();

  while (currContext[random] !== undefined) {
    random = Math.random();
  }
  currContext[random] = this;
  let result = currContext[random](...args);
  delete currContext[random];
  return result;
};

//getName.myCall(obj1, 25, "HNK");

// -----Polyfill for apply method-----

Function.prototype.myApply = function (context, args) {
  // solution 1

  //   context.myFn = this;
  //   context.myFn(...args);

  // solution 2
  let currContext = context;
  let random = Math.random();

  while (currContext[random] !== undefined) {
    random = Math.random();
  }
  currContext[random] = this;
  let result = currContext[random](...args);
  delete currContext[random];
  return result;
};

//getName.myApply(obj1, [26,"HNK"]);

let bindResult = getName.bind(obj1, 25);
bindResult("HNK");

// Polyfill for bind menthod

Function.prototype.myBind = function (context, ...args) {
  const _this = this;

  const boundFn = function (...extraArgs) {
    const isCalledAsConstructor = this instanceof boundFn;

    const currContext = isCalledAsConstructor ? this : context;

    return _this.apply(currContext, [...args, ...extraArgs]);
  };

  console.log(this.prototype);

  boundFn.prototype = Object.create(this.prototype);

  return boundFn;
};

let myBindResult = getName.myBind(obj1, 25);
myBindResult("HNK");

const BoundPerson = getName.myBind(obj1, "Phani");
const instance = new BoundPerson(25);
console.log(instance);
