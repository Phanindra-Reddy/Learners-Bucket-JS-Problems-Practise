const options = {
  leading: true,
  trailing: true,
};

document.addEventListener("mousemove", throttleFnType1(mousemoveFn, 1000));
document.addEventListener(
  "mousemove",
  throttleWithLeadAndTrail(mousemoveFnWithLeadTrail, 1000, options)
);

function mousemoveFn() {
  console.log("mouse moving with throttle...");
}

function mousemoveFnWithLeadTrail() {
  console.log("mouse moving with throttle lead & trail...");
}

function throttleFnType1(fn, limit) {
  let time = 0;

  return function () {
    const context = this;
    let now = Date.now();

    if (now - time >= limit) {
      time = now;
      fn.call(context);
    }
  };
}

function throttleFnType2(fn, limit) {
  let timer;
  let lastRan;

  return function () {
    const context = this;
    const now = Date.now();

    if (!lastRan) {
      fn.call(context);
      lastRan = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (now - lastRan >= delay) {
          fn.call(context);
          lastRan = now;
        }
      }, limit - (now - lastRan));
    }
  };
}

function throttleWithLeadAndTrail(fn, limit, options) {
  
}
