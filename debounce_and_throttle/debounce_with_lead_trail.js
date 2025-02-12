// Basic implementation of throttle

function func() {
  console.log("fetching data...");
}

function debounce(fn, delay) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      fn();
    }, delay);
  };
}

// debounce with leading and trailing

function debounceWithLeadingAndTrailing(
  fn,
  delay,
  options = { leading: true, trailing: true }
) {
  let timer = null;
  let isLeadingInvoked = false;

  return function () {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    if (options.leading && !timer) {
      fn.call(context);
      isLeadingInvoked = true;
    } else {
      isLeadingInvoked = false;
    }

    timer = setTimeout(() => {
      if (options.trailing && !isLeadingInvoked) {
        fn.call(context);
        timer = null;
      }
    }, delay);
  };
}

const debounceFun = debounce(func, 500, false);

const options = {
  leading: true,
  trailing: false,
};

const debounceFnWithLeadAndTrail = debounceWithLeadingAndTrailing(
  func,
  500,
  options
);
