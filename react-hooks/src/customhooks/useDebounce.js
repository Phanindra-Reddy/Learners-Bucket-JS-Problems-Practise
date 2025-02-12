import { useRef, useCallback } from "react";
// Basic implementation of debounce function

// function func() {
//   console.log("fetching data...");
// }

// function debounce(fn, delay) {
//   let timer;

//   return function () {
//     clearTimeout(timer);

//     timer = setTimeout(() => {
//       timer = null;
//       fn();
//     }, delay);
//   };
// }

// const debounceFun = debounce(func, 500, false);

function useDebounce(fn, delay) {
  let timerRef = useRef(null);

  let debounce = useCallback(
    function () {
      const context = this;
      const args = arguments;

      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    },
    [fn, delay]
  );

  return debounce;
}

export default useDebounce;
