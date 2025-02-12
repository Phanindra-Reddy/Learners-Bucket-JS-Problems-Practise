import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const stopWatchRef = useRef(0);
  const intervalRef = useState(null);
  const resumeTimerRef = useState(false);

  const [time, setTime] = useState(0);

  useEffect(() => {
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [time]);

  function handleBlur() {
    console.log("lost the focus");

    resumeTimerRef.current = !!intervalRef.current;
    handlePausetimer();
  }

  function handleFocus() {
    console.log("tab focused!");

    if (resumeTimerRef.current) {
      resumeTimerRef.current = false;

      handleStartTimer();
    }
  }

  function handleStartTimer() {

    if(intervalRef.current) return;

    stopWatchRef.current = new Date().getTime() - time;
    intervalRef.current = setInterval(() => {
      setTime(new Date().getTime() - stopWatchRef.current);
    }, 10);
  }

  function handlePausetimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function handleResettimer() {
    setTime(0);
    stopWatchRef.current = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function formatTime() {
    const hours = Math.floor(time / (1000 * 3600))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-4xl font-semibold text-gray-800">Stop Watch</h1>
        <div className="mt-10 w-full mx-auto flex justify-center">
          <p className="max-w-full w-[150px] inline-block text-3xl">
            {formatTime()}
          </p>
        </div>
      </div>
      <div className="mt-14 flex items-center justify-center gap-10">
        <button
          onClick={handleStartTimer}
          className="p-2 px-8 border-2 rounded-lg border-green-500 bg-green-500 hover:bg-green-600 hover:text-white"
        >
          Start
        </button>
        <button
          onClick={handlePausetimer}
          className="p-2 px-8 border-2 rounded-lg border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:text-white"
        >
          Pause
        </button>
        <button
          onClick={handleResettimer}
          className="p-2 px-8 border-2 rounded-lg border-red-500 hover:bg-red-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
