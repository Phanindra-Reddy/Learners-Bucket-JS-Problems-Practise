import { useEffect, useState } from "react";

const DigitalClock = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((p) => p + 1);
    }, 1000);
  }, []);

  function getTime() {
    let result = "";

    const date = new Date();

    let hrs = date.getHours();
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = date.getSeconds();

    const ampm = hrs > 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12;

    result = `${hrs}:${min}:${sec} ${ampm}`

    return result;
  }

  return (
    <div>
      <p>{getTime()}</p>
    </div>
  );
};

export default DigitalClock;
