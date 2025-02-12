import { useRef, useState } from "react";

const Config = {
  hh: {
    value: undefined,
    factor: 60 * 60 * 1000,
    placeholder: "HH",
  },
  mm: {
    value: undefined,
    factor: 60 * 1000,
    placeholder: "MM",
  },
  ss: {
    value: undefined,
    factor: 1000,
    placeholder: "SS",
  },
};

const OrderOfTime = ["hh", "mm", "ss"];

const Timer = () => {
  const [config, setConfig] = useState(Config);
  const [time, setTime] = useState(0);

  const intervalRef = useRef(null);
  const timeSpentRef = useRef(0);

  function handleChange({ key, index }) {
    return (event) => {
      const newConfig = structuredClone(config);

      newConfig[key].value = event.target.value;

      setConfig(newConfig);
    };
  }

  function handleStartTimer() {}

  function handlePauseTimer() {}

  function handleResetTimer() {}

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-4xl font-semibold text-gray-800">Stop Watch</h1>
        <div className="mt-10 w-full mx-auto flex justify-center gap-2">
          {OrderOfTime.map((orderKey, index) => {
            const data = config[orderKey];

            return (
              <div key={index}>
                <input
                  type="text"
                  value={data.value}
                  onChange={handleChange({ key: orderKey, index })}
                  placeholder={data.placeholder}
                  maxLength={2}
                  className="w-24 h-12 border border-gray-400 rounded-md text-center"
                />
              </div>
            );
          })}
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
          onClick={handlePauseTimer}
          className="p-2 px-8 border-2 rounded-lg border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:text-white"
        >
          Pause
        </button>
        <button
          onClick={handleResetTimer}
          className="p-2 px-8 border-2 rounded-lg border-red-500 hover:bg-red-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
