import { useEffect, useRef, useState } from "react";

function useIdle(delay) {
  const timeoutId = useRef();

  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    setup();
    return () => {
      cleanup();
    };
  }, []);

  const startTimer = () => {
    timeoutId.current = setTimeout(goInactive, delay);
  };

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    goActive();
  };

  const goActive = () => {
    setIsIdle(false);

    startTimer();
  };

  const goInactive = () => {
    setIsIdle(true);
  };

  const setup = () => {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("DOMMouseScroll", resetTimer, false);
    document.addEventListener("mousewheel", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
    document.addEventListener("MSPointMove", resetTimer, false);

    window.addEventListener("blur", startTimer, false);
    window.addEventListener("focus", resetTimer, false);
  };

  const cleanup = () => {
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("mousedown", resetTimer);
    document.removeEventListener("keypress", resetTimer);
    document.removeEventListener("DOMMouseScroll", resetTimer);
    document.removeEventListener("mousewheel", resetTimer);
    document.removeEventListener("touchmove", resetTimer);
    document.removeEventListener("MSPointMove", resetTimer);

    window.removeEventListener("blur", startTimer);
    window.removeEventListener("focus", resetTimer);

    clearTimeout(timeoutId.current);
  };

  return isIdle;
}

export default useIdle;
